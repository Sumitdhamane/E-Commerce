package service

import (
	"context"
	"encoding/json"
	"errors"

	"ecommerce-api/config"
	"ecommerce-api/internal/logger"
	"ecommerce-api/internal/models"
	"ecommerce-api/internal/repository"

	"github.com/segmentio/kafka-go"
)

func CheckoutService(
	userID int,
) error {

	// Fetch Cart Items
	cartItems, err := repository.GetCartItems(
		userID,
	)

	if err != nil {

		return err
	}

	if len(cartItems) == 0 {

		return errors.New("cart is empty")
	}

	tx, err := config.DB.Begin()

	if err != nil {

		return err
	}

	for _, item := range cartItems {

		product, err := repository.GetProductByID(
			string(rune(item.ProductID)),
		)

		if err != nil {

			tx.Rollback()

			return err
		}

		// Stock Check
		if product.Stock < item.Quantity {

			tx.Rollback()

			return errors.New(
				"insufficient stock for " +
					product.Name,
			)
		}

		// Reduce Stock
		err = repository.UpdateProductStock(
			tx,
			item.ProductID,
			item.Quantity,
		)

		if err != nil {

			tx.Rollback()

			return err
		}

		order := models.Order{
			UserID:     userID,
			ProductID:  item.ProductID,
			Quantity:   item.Quantity,
			TotalPrice: item.Subtotal,
			Status:     "pending",
		}

		// Create Order
		err = repository.CreateOrderWithTx(
			tx,
			order,
		)

		if err != nil {

			tx.Rollback()

			return err
		}

		// Kafka Event
		orderJSON, _ := json.Marshal(order)

		config.KafkaWriter.WriteMessages(
			context.Background(),
			kafka.Message{
				Value: orderJSON,
			},
		)
	}

	err = tx.Commit()

	if err != nil {

		return err
	}

	// Clear Cart
	err = repository.ClearCart(userID)

	if err != nil {

		logger.WarnLogger.Println(
			"Failed to clear cart",
		)
	}

	logger.InfoLogger.Println(
		"Checkout completed successfully",
	)

	return nil
}

package service

import (
	"context"
	"encoding/json"
	"errors"
	"strconv"

	"ecommerce-api/config"
	"ecommerce-api/internal/logger"
	"ecommerce-api/internal/models"
	"ecommerce-api/internal/repository"

	"github.com/segmentio/kafka-go"
)

func CreateOrderService(
	order models.Order,
) error {

	// Fetch Product
	product, err := repository.GetProductByID(
		strconv.Itoa(order.ProductID),
	)

	if err != nil {

		logger.WarnLogger.Println(
			"Product not found",
		)

		return errors.New("product not found")
	}

	// Check Stock
	if product.Stock < order.Quantity {

		logger.WarnLogger.Println(
			"Insufficient stock",
		)

		return errors.New("insufficient stock")
	}

	// Calculate Total Price
	order.TotalPrice =
		product.Price * float64(order.Quantity)

	// Begin Transaction
	tx, err := config.DB.Begin()

	if err != nil {

		logger.ErrorLogger.Println(
			"Failed to start transaction:",
			err,
		)

		return errors.New("transaction failed")
	}

	// Update Product Stock
	err = repository.UpdateProductStock(
		tx,
		order.ProductID,
		order.Quantity,
	)

	if err != nil {

		tx.Rollback()

		logger.ErrorLogger.Println(
			"Failed to update stock:",
			err,
		)

		return errors.New("failed to update stock")
	}

	// Create Order
	err = repository.CreateOrderWithTx(
		tx,
		order,
	)

	if err != nil {

		tx.Rollback()

		logger.ErrorLogger.Println(
			"Failed to create order:",
			err,
		)

		return errors.New("failed to create order")
	}
	order.Status = "pending"

	// Commit Transaction
	err = tx.Commit()

	if err != nil {

		logger.ErrorLogger.Println(
			"Transaction commit failed:",
			err,
		)

		return errors.New("transaction failed")
	}

	// Kafka Event
	orderJSON, _ := json.Marshal(order)

	err = config.KafkaWriter.WriteMessages(
		context.Background(),
		kafka.Message{
			Value: orderJSON,
		},
	)

	if err != nil {

		logger.ErrorLogger.Println(
			"Failed to publish Kafka event:",
			err,
		)

	} else {

		logger.InfoLogger.Println(
			"Order event published to Kafka",
		)
	}

	logger.InfoLogger.Println(
		"Order created successfully",
	)

	return nil
}

func GetMyOrdersService(
	userID int,
) ([]models.Order, error) {

	orders, err := repository.GetOrdersByUserID(
		userID,
	)

	if err != nil {

		logger.ErrorLogger.Println(
			"Failed to fetch orders:",
			err,
		)

		return nil, err
	}

	return orders, nil
}

func GetMyOrderByIDService(
	orderID string,
	userID int,
) (models.Order, error) {

	order, err := repository.GetOrderByID(
		orderID,
	)

	if err != nil {

		logger.WarnLogger.Println(
			"Order not found",
		)

		return order, errors.New("order not found")
	}

	// Ownership Validation
	if order.UserID != userID {

		logger.WarnLogger.Println(
			"Unauthorized order access attempt",
		)

		return order, errors.New("access denied")
	}

	return order, nil
}

func GetAllOrdersService() (
	[]models.Order,
	error,
) {

	orders, err := repository.GetAllOrders()

	if err != nil {

		logger.ErrorLogger.Println(
			"Failed to fetch all orders:",
			err,
		)

		return nil, err
	}

	return orders, nil
}

func UpdateOrderStatusService(
	id string,
	status string,
) error {

	validStatuses := map[string]bool{
		"pending":    true,
		"processing": true,
		"shipped":    true,
		"delivered":  true,
		"cancelled":  true,
	}

	if !validStatuses[status] {

		return errors.New(
			"invalid order status",
		)
	}

	err := repository.UpdateOrderStatus(
		id,
		status,
	)

	if err != nil {

		logger.ErrorLogger.Println(
			"Failed to update order status:",
			err,
		)

		return err
	}

	return nil
}

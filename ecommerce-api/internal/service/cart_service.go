package service

import (
	"database/sql"

	"ecommerce-api/internal/logger"
	"ecommerce-api/internal/models"
	"ecommerce-api/internal/repository"
)

func AddToCartService(
	item models.CartItem,
) error {

	existingItem, err := repository.GetCartItemByUserAndProduct(
		item.UserID,
		item.ProductID,
	)

	if err == nil {

		newQuantity :=
			existingItem.Quantity + item.Quantity

		return repository.UpdateCartQuantity(
			existingItem.ID,
			newQuantity,
		)
	}

	if err != sql.ErrNoRows {

		logger.ErrorLogger.Println(
			"Failed checking cart item:",
			err,
		)

		return err
	}

	return repository.AddCartItem(item)
}

func GetCartService(
	userID int,
) ([]models.CartItem, float64, error) {

	items, err := repository.GetCartItems(
		userID,
	)

	if err != nil {

		logger.ErrorLogger.Println(
			"Failed to fetch cart:",
			err,
		)

		return nil, 0, err
	}

	var total float64

	for _, item := range items {

		total += item.Subtotal
	}

	return items, total, nil
}

func RemoveCartItemService(
	id string,
) error {

	return repository.DeleteCartItem(id)
}

func ClearCartService(
	userID int,
) error {

	return repository.ClearCart(userID)
}

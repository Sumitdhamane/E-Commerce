package repository

import (
	"ecommerce-api/config"
	"ecommerce-api/internal/models"
)

func GetCartItemByUserAndProduct(
	userID int,
	productID int,
) (models.CartItem, error) {

	var item models.CartItem

	query := `
	SELECT id, user_id, product_id, quantity
	FROM cart_items
	WHERE user_id = ? AND product_id = ?
	`

	err := config.DB.QueryRow(
		query,
		userID,
		productID,
	).Scan(
		&item.ID,
		&item.UserID,
		&item.ProductID,
		&item.Quantity,
	)

	return item, err
}

func AddCartItem(
	item models.CartItem,
) error {

	query := `
	INSERT INTO cart_items(
		user_id,
		product_id,
		quantity
	)
	VALUES(?,?,?)
	`

	_, err := config.DB.Exec(
		query,
		item.UserID,
		item.ProductID,
		item.Quantity,
	)

	return err
}

func UpdateCartQuantity(
	id int,
	quantity int,
) error {

	query := `
	UPDATE cart_items
	SET quantity = ?
	WHERE id = ?
	`

	_, err := config.DB.Exec(
		query,
		quantity,
		id,
	)

	return err
}

func GetCartItems(
	userID int,
) ([]models.CartItem, error) {

	var items []models.CartItem

	query := `
	SELECT
		c.id,
		c.user_id,
		c.product_id,
		p.name,
		p.price,
		c.quantity
	FROM cart_items c
	JOIN products p
	ON c.product_id = p.id
	WHERE c.user_id = ?
	`

	rows, err := config.DB.Query(
		query,
		userID,
	)

	if err != nil {
		return items, err
	}

	defer rows.Close()

	for rows.Next() {

		var item models.CartItem

		rows.Scan(
			&item.ID,
			&item.UserID,
			&item.ProductID,
			&item.ProductName,
			&item.Price,
			&item.Quantity,
		)

		item.Subtotal =
			item.Price * float64(item.Quantity)

		items = append(items, item)
	}

	return items, nil
}

func DeleteCartItem(
	id string,
) error {

	query := `
	DELETE FROM cart_items
	WHERE id = ?
	`

	_, err := config.DB.Exec(
		query,
		id,
	)

	return err
}

func ClearCart(
	userID int,
) error {

	query := `
	DELETE FROM cart_items
	WHERE user_id = ?
	`

	_, err := config.DB.Exec(
		query,
		userID,
	)

	return err
}

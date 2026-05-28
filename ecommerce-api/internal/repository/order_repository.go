package repository

import (
	"database/sql"

	"ecommerce-api/config"
	"ecommerce-api/internal/models"
)

func CreateOrderWithTx(
	tx *sql.Tx,
	order models.Order,
) error {

	query := `
	INSERT INTO orders(
		user_id,
		product_id,
		quantity,
		total_price,
		status
	)
	VALUES(?,?,?,?,?)
	`

	_, err := tx.Exec(
		query,
		order.UserID,
		order.ProductID,
		order.Quantity,
		order.TotalPrice,
		order.Status,
	)

	return err
}

func GetOrdersByUserID(
	userID int,
) ([]models.Order, error) {

	var orders []models.Order

	query := `
	SELECT
		id,
		user_id,
		product_id,
		quantity,
		total_price,
		status
	FROM orders
	WHERE user_id = ?
	`

	rows, err := config.DB.Query(
		query,
		userID,
	)

	if err != nil {
		return orders, err
	}

	defer rows.Close()

	for rows.Next() {

		var order models.Order

		err := rows.Scan(
			&order.ID,
			&order.UserID,
			&order.ProductID,
			&order.Quantity,
			&order.TotalPrice,
			&order.Status,
		)

		if err != nil {
			return orders, err
		}

		orders = append(orders, order)
	}

	return orders, nil
}

func GetOrderByID(
	orderID string,
) (models.Order, error) {

	var order models.Order

	query := `
	SELECT
		id,
		user_id,
		product_id,
		quantity,
		total_price,
		status
	FROM orders
	WHERE id = ?
	`

	err := config.DB.QueryRow(
		query,
		orderID,
	).Scan(
		&order.ID,
		&order.UserID,
		&order.ProductID,
		&order.Quantity,
		&order.TotalPrice,
		&order.Status,
	)

	return order, err
}

func GetAllOrders() (
	[]models.Order,
	error,
) {

	var orders []models.Order

	query := `
	SELECT
		id,
		user_id,
		product_id,
		quantity,
		total_price,
		status
	FROM orders
	`

	rows, err := config.DB.Query(query)

	if err != nil {
		return orders, err
	}

	defer rows.Close()

	for rows.Next() {

		var order models.Order

		rows.Scan(
			&order.ID,
			&order.UserID,
			&order.ProductID,
			&order.Quantity,
			&order.TotalPrice,
			&order.Status,
		)

		orders = append(
			orders,
			order,
		)
	}

	return orders, nil
}

func UpdateOrderStatus(
	id string,
	status string,
) error {

	query := `
	UPDATE orders
	SET status = ?
	WHERE id = ?
	`

	_, err := config.DB.Exec(
		query,
		status,
		id,
	)

	return err
}

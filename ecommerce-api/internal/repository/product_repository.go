package repository

import (
	"database/sql"
	"ecommerce-api/config"
	"ecommerce-api/internal/models"
)

func CreateProduct(product models.Product) error {

	query := `
	INSERT INTO products(name,description,price,stock)
	VALUES(?,?,?,?)
	`

	_, err := config.DB.Exec(
		query,
		product.Name,
		product.Description,
		product.Price,
		product.Stock,
	)

	return err
}

func GetAllProducts() ([]models.Product, error) {

	var products []models.Product

	query := `
	SELECT id,name,description,price,stock
	FROM products
	`

	rows, err := config.DB.Query(query)

	if err != nil {
		return products, err
	}

	defer rows.Close()

	for rows.Next() {

		var product models.Product

		rows.Scan(
			&product.ID,
			&product.Name,
			&product.Description,
			&product.Price,
			&product.Stock,
		)

		products = append(products, product)
	}

	return products, nil
}

func DeleteProduct(id string) error {

	query := `
	DELETE FROM products
	WHERE id=?
	`

	_, err := config.DB.Exec(query, id)

	return err
}

func UpdateProduct(id string, product models.Product) error {

	query := `
	UPDATE products
	SET name=?, description=?, price=?, stock=?
	WHERE id=?
	`

	_, err := config.DB.Exec(
		query,
		product.Name,
		product.Description,
		product.Price,
		product.Stock,
		id,
	)

	return err
}

func GetProductByID(id string) (models.Product, error) {

	var product models.Product

	query := `
	SELECT id,name,description,price,stock
	FROM products
	WHERE id=?
	`

	err := config.DB.QueryRow(query, id).Scan(
		&product.ID,
		&product.Name,
		&product.Description,
		&product.Price,
		&product.Stock,
	)

	return product, err
}

func UpdateProductStock(
	tx *sql.Tx,
	productID int,
	quantity int,
) error {

	query := `
	UPDATE products
	SET stock = stock - ?
	WHERE id = ?
	`

	_, err := tx.Exec(
		query,
		quantity,
		productID,
	)

	return err
}

package service

import (
	"encoding/json"
	"errors"
	"time"

	"ecommerce-api/config"
	"ecommerce-api/internal/logger"
	"ecommerce-api/internal/models"
	"ecommerce-api/internal/repository"
)

func CreateProductService(
	product models.Product,
) error {

	err := repository.CreateProduct(product)

	if err != nil {

		logger.ErrorLogger.Println(
			"Failed to create product:",
			err,
		)

		return err
	}

	config.RedisClient.Del(
		config.Ctx,
		"products",
	)

	logger.InfoLogger.Println(
		"Product created successfully:",
		product.Name,
	)

	return nil
}

func GetProductsService() (
	[]models.Product,
	string,
	error,
) {

	cachedData, err := config.RedisClient.Get(
		config.Ctx,
		"products",
	).Result()

	if err == nil {

		logger.InfoLogger.Println(
			"Products fetched from Redis cache",
		)

		var cachedProducts []models.Product

		json.Unmarshal(
			[]byte(cachedData),
			&cachedProducts,
		)

		return cachedProducts, "redis cache", nil
	}

	logger.WarnLogger.Println(
		"Redis cache miss for products",
	)

	products, err := repository.GetAllProducts()

	if err != nil {

		logger.ErrorLogger.Println(
			"Failed to fetch products:",
			err,
		)

		return nil, "", err
	}

	jsonData, _ := json.Marshal(products)

	config.RedisClient.Set(
		config.Ctx,
		"products",
		jsonData,
		5*time.Minute,
	)

	logger.InfoLogger.Println(
		"Products cached in Redis",
	)

	return products, "mysql", nil
}

func GetProductByIDService(
	id string,
) (models.Product, error) {

	product, err := repository.GetProductByID(id)

	if err != nil {

		logger.WarnLogger.Println(
			"Product not found with ID:",
			id,
		)

		return product, errors.New("product not found")
	}

	logger.InfoLogger.Println(
		"Product fetched successfully:",
		id,
	)

	return product, nil
}

func UpdateProductService(
	id string,
	product models.Product,
) error {

	err := repository.UpdateProduct(
		id,
		product,
	)

	if err != nil {

		logger.ErrorLogger.Println(
			"Failed to update product:",
			err,
		)

		return err
	}

	config.RedisClient.Del(
		config.Ctx,
		"products",
	)

	logger.InfoLogger.Println(
		"Product updated successfully:",
		id,
	)

	return nil
}

func DeleteProductService(
	id string,
) error {

	err := repository.DeleteProduct(id)

	if err != nil {

		logger.ErrorLogger.Println(
			"Failed to delete product:",
			err,
		)

		return err
	}

	config.RedisClient.Del(
		config.Ctx,
		"products",
	)

	logger.InfoLogger.Println(
		"Product deleted successfully:",
		id,
	)

	return nil
}

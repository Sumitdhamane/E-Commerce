package handlers

import (
	"net/http"

	"ecommerce-api/internal/logger"
	"ecommerce-api/internal/models"
	"ecommerce-api/internal/service"

	"github.com/gin-gonic/gin"
)

// CreateProduct godoc
// @Summary Create Product
// @Description Create a new product
// @Tags Products
// @Accept json
// @Produce json
// @Security BearerAuth
// @Param product body models.Product true "Product Data"
// @Success 201 {object} map[string]interface{}
// @Router /api/v1/admin/products [post]
func CreateProduct(c *gin.Context) {

	logger.InfoLogger.Println(
		"Create Product API called",
	)

	var product models.Product

	if err := c.ShouldBindJSON(&product); err != nil {

		logger.WarnLogger.Println(
			"Invalid product payload",
		)

		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})

		return
	}

	err := service.CreateProductService(
		product,
	)

	if err != nil {

		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})

		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "Product created successfully",
	})
}

// GetProducts godoc
// @Summary Get All Products
// @Description Fetch all available products
// @Tags Products
// @Produce json
// @Success 200 {object} map[string]interface{}
// @Router /api/v1/products [get]
func GetProducts(c *gin.Context) {

	logger.InfoLogger.Println(
		"Get Products API called",
	)

	products, source, err := service.GetProductsService()

	if err != nil {

		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})

		return
	}

	c.JSON(http.StatusOK, gin.H{
		"source": source,
		"data":   products,
	})
}

// GetProductByID godoc
// @Summary Get Product By ID
// @Description Fetch product details using product ID
// @Tags Products
// @Produce json
// @Param id path int true "Product ID"
// @Success 200 {object} map[string]interface{}
// @Router /api/v1/products/{id} [get]
func GetProductByID(c *gin.Context) {

	logger.InfoLogger.Println(
		"Get Product By ID API called",
	)

	id := c.Param("id")

	product, err := service.GetProductByIDService(
		id,
	)

	if err != nil {

		c.JSON(http.StatusNotFound, gin.H{
			"error": err.Error(),
		})

		return
	}

	c.JSON(http.StatusOK, gin.H{
		"data": product,
	})
}

// UpdateProduct godoc
// @Summary Update Product
// @Description Update existing product
// @Tags Products
// @Security BearerAuth
// @Accept json
// @Produce json
// @Param id path int true "Product ID"
// @Param product body models.Product true "Updated Product Data"
// @Success 200 {object} map[string]interface{}
// @Router /api/v1/admin/products/{id} [put]
func UpdateProduct(c *gin.Context) {

	logger.InfoLogger.Println(
		"Update Product API called",
	)

	id := c.Param("id")

	var product models.Product

	if err := c.ShouldBindJSON(&product); err != nil {

		logger.WarnLogger.Println(
			"Invalid update payload",
		)

		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})

		return
	}

	err := service.UpdateProductService(
		id,
		product,
	)

	if err != nil {

		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})

		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Product updated",
	})
}

// DeleteProduct godoc
// @Summary Delete Product
// @Description Delete product using ID
// @Tags Products
// @Security BearerAuth
// @Produce json
// @Param id path int true "Product ID"
// @Success 200 {object} map[string]interface{}
// @Router /api/v1/admin/products/{id} [delete]
func DeleteProduct(c *gin.Context) {

	logger.InfoLogger.Println(
		"Delete Product API called",
	)

	id := c.Param("id")

	err := service.DeleteProductService(id)

	if err != nil {

		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})

		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Product deleted",
	})
}
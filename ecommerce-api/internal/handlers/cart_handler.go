package handlers

import (
	"net/http"

	"ecommerce-api/internal/models"
	"ecommerce-api/internal/service"

	"github.com/gin-gonic/gin"
)

// AddToCart godoc
// @Summary Add To Cart
// @Tags Cart
// @Accept json
// @Produce json
// @Security BearerAuth
// @Param item body models.CartItem true "Cart Item"
// @Success 201 {object} map[string]interface{}
// @Router /api/v1/cart [post]
func AddToCart(c *gin.Context) {

	var item models.CartItem

	if err := c.ShouldBindJSON(&item); err != nil {

		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})

		return
	}

	userID := c.MustGet("userID").(float64)

	item.UserID = int(userID)

	err := service.AddToCartService(item)

	if err != nil {

		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})

		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "Item added to cart",
	})
}

// GetCart godoc
// @Summary Get Cart
// @Tags Cart
// @Produce json
// @Security BearerAuth
// @Success 200 {object} map[string]interface{}
// @Router /api/v1/cart [get]
func GetCart(c *gin.Context) {

	userID := c.MustGet("userID").(float64)

	items, total, err := service.GetCartService(
		int(userID),
	)

	if err != nil {

		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})

		return
	}

	c.JSON(http.StatusOK, gin.H{
		"items": items,
		"total": total,
	})
}

// RemoveCartItem godoc
// @Summary Remove Cart Item
// @Tags Cart
// @Produce json
// @Security BearerAuth
// @Param id path int true "Cart Item ID"
// @Success 200 {object} map[string]interface{}
// @Router /api/v1/cart/{id} [delete]
func RemoveCartItem(c *gin.Context) {

	id := c.Param("id")

	err := service.RemoveCartItemService(id)

	if err != nil {

		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})

		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Cart item removed",
	})
}

// ClearCart godoc
// @Summary Clear Cart
// @Tags Cart
// @Produce json
// @Security BearerAuth
// @Success 200 {object} map[string]interface{}
// @Router /api/v1/cart [delete]
func ClearCart(c *gin.Context) {

	userID := c.MustGet("userID").(float64)

	err := service.ClearCartService(
		int(userID),
	)

	if err != nil {

		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})

		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Cart cleared",
	})
}
package handlers

import (
	"net/http"

	"ecommerce-api/internal/service"

	"github.com/gin-gonic/gin"
)

// Checkout godoc
// @Summary Checkout Cart
// @Description Convert cart items into orders
// @Tags Checkout
// @Produce json
// @Security BearerAuth
// @Success 200 {object} map[string]interface{}
// @Router /api/v1/checkout [post]
func Checkout(c *gin.Context) {

	userID := c.MustGet("userID").(float64)

	err := service.CheckoutService(
		int(userID),
	)

	if err != nil {

		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})

		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Checkout successful",
	})
}

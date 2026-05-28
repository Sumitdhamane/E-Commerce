package handlers

import (
	"net/http"

	"ecommerce-api/internal/logger"
	"ecommerce-api/internal/models"
	"ecommerce-api/internal/service"

	"github.com/gin-gonic/gin"
)

// CreateOrder godoc
// @Summary Create Order
// @Description Place a new order
// @Tags Orders
// @Accept json
// @Produce json
// @Security BearerAuth
// @Param order body models.Order true "Order Data"
// @Success 201 {object} map[string]interface{}
// @Router /api/v1/user/orders [post]
func CreateOrder(c *gin.Context) {

	logger.InfoLogger.Println(
		"Create Order API called",
	)

	var order models.Order

	if err := c.ShouldBindJSON(&order); err != nil {

		logger.WarnLogger.Println(
			"Invalid order payload",
		)

		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})

		return
	}

	userID := c.MustGet("userID").(float64)

	order.UserID = int(userID)

	order.Status = "pending"

	err := service.CreateOrderService(order)

	if err != nil {

		logger.ErrorLogger.Println(
			"Order service failed:",
			err,
		)

		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})

		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "Order created successfully",
	})
}

// GetMyOrders godoc
// @Summary Get My Orders
// @Description Fetch logged-in user's orders
// @Tags Orders
// @Produce json
// @Security BearerAuth
// @Success 200 {object} map[string]interface{}
// @Router /api/v1/user/orders [get]
func GetMyOrders(c *gin.Context) {

	logger.InfoLogger.Println(
		"Get My Orders API called",
	)

	userID := c.MustGet("userID").(float64)

	orders, err := service.GetMyOrdersService(
		int(userID),
	)

	if err != nil {

		logger.ErrorLogger.Println(
			"Failed to fetch orders:",
			err,
		)

		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})

		return
	}

	c.JSON(http.StatusOK, gin.H{
		"data": orders,
	})
}

// GetMyOrderByID godoc
// @Summary Get My Order By ID
// @Description Fetch single order of logged-in user
// @Tags Orders
// @Produce json
// @Security BearerAuth
// @Param id path int true "Order ID"
// @Success 200 {object} map[string]interface{}
// @Router /api/v1/user/orders/{id} [get]
func GetMyOrderByID(c *gin.Context) {

	logger.InfoLogger.Println(
		"Get My Order By ID API called",
	)

	orderID := c.Param("id")

	userID := c.MustGet("userID").(float64)

	order, err := service.GetMyOrderByIDService(
		orderID,
		int(userID),
	)

	if err != nil {

		logger.WarnLogger.Println(
			"Access denied or order not found",
		)

		c.JSON(http.StatusForbidden, gin.H{
			"error": err.Error(),
		})

		return
	}

	c.JSON(http.StatusOK, gin.H{
		"data": order,
	})
}

// GetAllOrders godoc
// @Summary Get All Orders
// @Description Fetch all orders (Admin)
// @Tags Admin Orders
// @Produce json
// @Security BearerAuth
// @Success 200 {object} map[string]interface{}
// @Router /api/v1/admin/orders [get]
func GetAllOrders(c *gin.Context) {

	logger.InfoLogger.Println(
		"Get All Orders API called",
	)

	orders, err := service.GetAllOrdersService()

	if err != nil {

		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})

		return
	}

	c.JSON(http.StatusOK, gin.H{
		"data": orders,
	})
}

// UpdateOrderStatus godoc
// @Summary Update Order Status
// @Description Update order status (Admin)
// @Tags Admin Orders
// @Accept json
// @Produce json
// @Security BearerAuth
// @Param id path int true "Order ID"
// @Param status body map[string]string true "Status"
// @Success 200 {object} map[string]interface{}
// @Router /api/v1/admin/orders/{id}/status [put]
func UpdateOrderStatus(c *gin.Context) {

	logger.InfoLogger.Println(
		"Update Order Status API called",
	)

	id := c.Param("id")

	var body struct {
		Status string `json:"status"`
	}

	if err := c.ShouldBindJSON(&body); err != nil {

		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})

		return
	}

	err := service.UpdateOrderStatusService(
		id,
		body.Status,
	)

	if err != nil {

		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})

		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Order status updated",
	})
}

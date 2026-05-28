package handlers

import (
	"net/http"

	"ecommerce-api/internal/logger"
	"ecommerce-api/internal/service"

	"github.com/gin-gonic/gin"
)

// GetDashboardStats godoc
// @Summary Get Dashboard Stats
// @Description Fetch admin dashboard statistics
// @Tags Dashboard
// @Produce json
// @Security BearerAuth
// @Success 200 {object} map[string]interface{}
// @Router /api/v1/admin/dashboard [get]
func GetDashboardStats(c *gin.Context) {

	logger.InfoLogger.Println(
		"Dashboard API called",
	)

	stats, err := service.GetDashboardStatsService()

	if err != nil {

		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})

		return
	}

	c.JSON(http.StatusOK, gin.H{
		"data": stats,
	})
}

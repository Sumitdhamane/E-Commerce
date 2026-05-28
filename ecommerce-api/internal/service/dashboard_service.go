package service

import (
	"ecommerce-api/internal/logger"
	"ecommerce-api/internal/models"
	"ecommerce-api/internal/repository"
)

func GetDashboardStatsService() (
	models.DashboardStats,
	error,
) {

	stats, err := repository.GetDashboardStats()

	if err != nil {

		logger.ErrorLogger.Println(
			"Failed to fetch dashboard stats:",
			err,
		)

		return stats, err
	}

	logger.InfoLogger.Println(
		"Dashboard stats fetched successfully",
	)

	return stats, nil
}
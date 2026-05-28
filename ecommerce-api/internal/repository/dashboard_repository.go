package repository

import (
	"ecommerce-api/config"
	"ecommerce-api/internal/models"
)

func GetDashboardStats() (
	models.DashboardStats,
	error,
) {

	var stats models.DashboardStats

	// Total Users
	config.DB.QueryRow(
		"SELECT COUNT(*) FROM users",
	).Scan(&stats.TotalUsers)

	// Total Products
	config.DB.QueryRow(
		"SELECT COUNT(*) FROM products",
	).Scan(&stats.TotalProducts)

	// Total Orders
	config.DB.QueryRow(
		"SELECT COUNT(*) FROM orders",
	).Scan(&stats.TotalOrders)

	// Total Revenue
	config.DB.QueryRow(
		"SELECT IFNULL(SUM(total_price),0) FROM orders",
	).Scan(&stats.TotalRevenue)

	return stats, nil
}

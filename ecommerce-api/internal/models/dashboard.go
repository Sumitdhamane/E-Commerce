package models

type DashboardStats struct {
	TotalUsers    int     `json:"total_users"`
	TotalProducts int     `json:"total_products"`
	TotalOrders   int     `json:"total_orders"`
	TotalRevenue  float64 `json:"total_revenue"`
}

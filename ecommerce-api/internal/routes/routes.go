package routes

import (
	"ecommerce-api/internal/handlers"
	"ecommerce-api/internal/middleware"

	"github.com/gin-gonic/gin"
)

func SetupRoutes(router *gin.Engine) {

	// API Versioning
	api := router.Group("/api/v1")

	// =========================
	// Public Auth Routes
	// =========================

	auth := api.Group("/auth")

	{
		auth.POST("/signup", handlers.Signup)
		auth.POST("/login", handlers.Login)
	}

	// =========================
	// Protected Auth Routes
	// =========================

	protectedAuth := api.Group("/auth")

	protectedAuth.Use(middleware.JWTAuth())

	{
		protectedAuth.POST(
			"/logout",
			handlers.Logout,
		)
	}

	// =========================
	// Public Product Routes
	// =========================

	products := api.Group("/products")

	{
		products.GET(
			"",
			handlers.GetProducts,
		)

		products.GET(
			"/:id",
			handlers.GetProductByID,
		)
	}

	// =========================
	// Admin Routes
	// =========================

	admin := api.Group("/admin")

	admin.Use(middleware.JWTAuth())
	admin.Use(middleware.AdminOnly())

	{
		admin.GET(
			"/products",
			handlers.GetProducts,
		)

		admin.POST(
			"/products",
			handlers.CreateProduct,
		)

		admin.PUT(
			"/products/:id",
			handlers.UpdateProduct,
		)

		admin.DELETE(
			"/products/:id",
			handlers.DeleteProduct,
		)

		admin.GET(
			"/dashboard",
			handlers.GetDashboardStats,
		)

		admin.GET(
			"/orders",
			handlers.GetAllOrders,
		)

		admin.PUT(
			"/orders/:id/status",
			handlers.UpdateOrderStatus,
		)
	}

	// =========================
	// User Routes
	// =========================

	user := api.Group("/user")

	user.Use(middleware.JWTAuth())

	{
		user.POST(
			"/orders",
			handlers.CreateOrder,
		)

		user.GET(
			"/orders",
			handlers.GetMyOrders,
		)

		user.GET(
			"/orders/:id",
			handlers.GetMyOrderByID,
		)

		user.POST(
			"/cart",
			handlers.AddToCart,
		)

		user.GET(
			"/cart",
			handlers.GetCart,
		)

		user.DELETE(
			"/cart/:id",
			handlers.RemoveCartItem,
		)

		user.DELETE(
			"/cart",
			handlers.ClearCart,
		)

		user.POST(
			"/checkout",
			handlers.Checkout,
		)
	}
}

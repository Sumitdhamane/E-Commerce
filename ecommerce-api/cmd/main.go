package main

import (
	"os"

	_ "ecommerce-api/docs"

	"ecommerce-api/config"
	"ecommerce-api/internal/kafka"
	"ecommerce-api/internal/logger"
	"ecommerce-api/internal/routes"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"

	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

// @title E-Commerce API
// @version 1.0
// @description E-Commerce Backend API
// @host localhost:8080
// @BasePath /
//
// @securityDefinitions.apikey BearerAuth
// @in header
// @name Authorization

func main() {

	config.LoadEnv()

	logger.InitLogger()

	config.ConnectDB()

	config.ConnectRedis()

	config.InitKafka()

	router := gin.Default()

	// CORS Configuration
	router.Use(cors.New(cors.Config{
		AllowOrigins: []string{
			"http://localhost:5173",
		},

		AllowMethods: []string{
			"GET",
			"POST",
			"PUT",
			"DELETE",
			"OPTIONS",
		},

		AllowHeaders: []string{
			"Origin",
			"Content-Type",
			"Authorization",
		},

		AllowCredentials: true,
	}))

	routes.SetupRoutes(router)

	router.GET(
		"/swagger/*any",
		ginSwagger.WrapHandler(swaggerFiles.Handler),
	)

	port := os.Getenv("PORT")

	logger.InfoLogger.Println(
		"Server started at port",
		port,
	)

	go kafka.StartConsumer()

	router.Run(":" + port)
}

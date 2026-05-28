package config

import (
	"database/sql"
	"fmt"
	"os"

	"ecommerce-api/internal/logger"

	_ "github.com/go-sql-driver/mysql"
)

var DB *sql.DB

func ConnectDB() {

	var err error

	dsn := fmt.Sprintf(
		"%s:%s@tcp(%s:%s)/%s",
		os.Getenv("DB_USER"),
		os.Getenv("DB_PASSWORD"),
		os.Getenv("DB_HOST"),
		os.Getenv("DB_PORT"),
		os.Getenv("DB_NAME"),
	)

	DB, err = sql.Open("mysql", dsn)

	if err != nil {
		logger.ErrorLogger.Fatal(err)
	}

	err = DB.Ping()

	if err != nil {
		logger.ErrorLogger.Fatal(err)
	}

	logger.InfoLogger.Println("MySQL Connected")
}

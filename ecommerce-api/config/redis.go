package config

import (
	"context"
	"os"

	"ecommerce-api/internal/logger"

	"github.com/redis/go-redis/v9"
)

var RedisClient *redis.Client
var Ctx = context.Background()

func ConnectRedis() {

	RedisClient = redis.NewClient(&redis.Options{
		Addr: os.Getenv("REDIS_ADDR"),
	})

	_, err := RedisClient.Ping(Ctx).Result()

	if err != nil {
		logger.ErrorLogger.Fatal(err)
	}

	logger.InfoLogger.Println("Redis Connected")
}

package config

import (
	"os"

	"ecommerce-api/internal/logger"

	"github.com/segmentio/kafka-go"
)

var KafkaWriter *kafka.Writer

func InitKafka() {
	
	KafkaWriter = &kafka.Writer{
		Addr:     kafka.TCP(os.Getenv("KAFKA_BROKER")),
		Topic:    "order-created",
		Balancer: &kafka.LeastBytes{},
	}

	logger.InfoLogger.Println("Kafka Initialized")
}

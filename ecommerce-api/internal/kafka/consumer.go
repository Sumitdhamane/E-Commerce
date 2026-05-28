package kafka

import (
	"context"
	"ecommerce-api/internal/logger"
	"log"
	"os"

	"github.com/segmentio/kafka-go"
)

func StartConsumer() {

	reader := kafka.NewReader(kafka.ReaderConfig{
		Brokers: []string{os.Getenv("KAFKA_BROKER")},
		Topic:   "order-created",
		GroupID: "order-group",
	})

	logger.InfoLogger.Println("Kafka Consumer Started")

	for {

		message, err := reader.ReadMessage(
			context.Background(),
		)

		if err != nil {

			log.Println("Kafka consumer error:", err)

			continue
		}

		log.Println(
			"Order Event Received:",
			string(message.Value),
		)
	}
}

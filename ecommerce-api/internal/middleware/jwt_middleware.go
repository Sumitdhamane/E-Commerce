package middleware

import (
	"net/http"
	"os"
	"strings"

	"ecommerce-api/config"
	"ecommerce-api/internal/logger"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
)

func JWTAuth() gin.HandlerFunc {

	return func(c *gin.Context) {

		authHeader := c.GetHeader("Authorization")

		if authHeader == "" {

			logger.WarnLogger.Println(
				"Authorization token missing",
			)

			c.JSON(http.StatusUnauthorized, gin.H{
				"error": "Authorization token required",
			})

			c.Abort()

			return
		}

		headerParts := strings.Split(authHeader, " ")

		if len(headerParts) != 2 {

			logger.WarnLogger.Println(
				"Invalid authorization header format",
			)

			c.JSON(http.StatusUnauthorized, gin.H{
				"error": "Invalid token format",
			})

			c.Abort()

			return
		}

		tokenString := headerParts[1]

		_, err := config.RedisClient.Get(
			config.Ctx,
			tokenString,
		).Result()

		if err == nil {

			logger.WarnLogger.Println(
				"Blacklisted token used",
			)

			c.JSON(http.StatusUnauthorized, gin.H{
				"error": "Token expired. Please login again",
			})

			c.Abort()

			return
		}

		token, err := jwt.Parse(
			tokenString,
			func(token *jwt.Token) (interface{}, error) {

				return []byte(
					os.Getenv("JWT_SECRET"),
				), nil
			},
		)

		if err != nil || !token.Valid {

			logger.WarnLogger.Println(
				"Invalid JWT token",
			)

			c.JSON(http.StatusUnauthorized, gin.H{
				"error": "Invalid token",
			})

			c.Abort()

			return
		}

		claims := token.Claims.(jwt.MapClaims)

		c.Set("role", claims["role"])
		c.Set("userID", claims["id"])

		logger.InfoLogger.Println(
			"JWT token verified",
		)

		c.Next()
	}
}

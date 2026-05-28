package middleware

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func AdminOnly() gin.HandlerFunc {

	return func(c *gin.Context) {

		role := c.MustGet("role").(string)

		if role != "admin" {

			c.JSON(http.StatusForbidden, gin.H{
				"error": "Admin only",
			})

			c.Abort()
			return
		}

		c.Next()
	}
}

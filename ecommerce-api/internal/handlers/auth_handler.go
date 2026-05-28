package handlers

import (
	"net/http"

	"ecommerce-api/internal/logger"
	"ecommerce-api/internal/models"
	"ecommerce-api/internal/service"

	"github.com/gin-gonic/gin"
)

// Signup godoc
// @Summary Signup User
// @Description Register a new user
// @Tags Auth
// @Accept json
// @Produce json
// @Param user body models.User true "User Data"
// @Success 201 {object} map[string]interface{}
// @Router /api/v1/auth/signup [post]
func Signup(c *gin.Context) {

	logger.InfoLogger.Println(
		"Signup API called",
	)

	var user models.User

	if err := c.ShouldBindJSON(&user); err != nil {

		logger.WarnLogger.Println(
			"Invalid signup payload",
		)

		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})

		return
	}

	err := service.SignupService(user)

	if err != nil {

		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})

		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "Signup successful",
	})
}

// Login godoc
// @Summary Login User
// @Description Login using email and password
// @Tags Auth
// @Accept json
// @Produce json
// @Param user body models.User true "Login Data"
// @Success 200 {object} map[string]interface{}
// @Router /api/v1/auth/login [post]
func Login(c *gin.Context) {

	logger.InfoLogger.Println(
		"Login API called",
	)

	var input models.User

	if err := c.ShouldBindJSON(&input); err != nil {

		logger.WarnLogger.Println(
			"Invalid login payload",
		)

		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})

		return
	}

	token, user, err := service.LoginService(input)

	if err != nil {

		c.JSON(http.StatusUnauthorized, gin.H{
			"error": err.Error(),
		})

		return
	}

	c.JSON(http.StatusOK, gin.H{
		"token": token,
		"user": gin.H{
			"id":    user.ID,
			"email": user.Email,
			"role":  user.Role,
		},
	})
}

// Logout godoc
// @Summary Logout User
// @Description Logout current user
// @Tags Auth
// @Produce json
// @Security BearerAuth
// @Success 200 {object} map[string]interface{}
// @Router /api/v1/auth/logout [post]
func Logout(c *gin.Context) {

	logger.InfoLogger.Println(
		"Logout API called",
	)

	authHeader := c.GetHeader(
		"Authorization",
	)

	err := service.LogoutService(
		authHeader,
	)

	if err != nil {

		c.JSON(http.StatusUnauthorized, gin.H{
			"error": err.Error(),
		})

		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Logout successful",
	})
}

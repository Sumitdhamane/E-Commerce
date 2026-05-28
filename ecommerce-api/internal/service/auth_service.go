package service

import (
	"errors"
	"strings"
	"time"

	"ecommerce-api/config"
	"ecommerce-api/internal/logger"
	"ecommerce-api/internal/models"
	"ecommerce-api/internal/repository"
	"ecommerce-api/internal/utils"

	"golang.org/x/crypto/bcrypt"
)

func SignupService(
	user models.User,
) error {

	hashedPassword, err := bcrypt.GenerateFromPassword(
		[]byte(user.Password),
		bcrypt.DefaultCost,
	)

	if err != nil {

		logger.ErrorLogger.Println(
			"Password hashing failed:",
			err,
		)

		return errors.New("failed to hash password")
	}

	user.Password = string(hashedPassword)

	user.Role = "user"

	err = repository.CreateUser(user)

	if err != nil {

		logger.ErrorLogger.Println(
			"User signup failed:",
			err,
		)

		return err
	}

	logger.InfoLogger.Println(
		"User signup successful:",
		user.Email,
	)

	return nil
}

func LoginService(
	input models.User,
) (string, models.User, error) {

	user, err := repository.GetUserByEmail(
		input.Email,
	)

	if err != nil {

		logger.WarnLogger.Println(
			"Invalid email attempt:",
			input.Email,
		)

		return "", models.User{}, errors.New(
			"invalid email",
		)
	}

	err = bcrypt.CompareHashAndPassword(
		[]byte(user.Password),
		[]byte(input.Password),
	)

	if err != nil {

		logger.WarnLogger.Println(
			"Invalid password attempt:",
			input.Email,
		)

		return "", models.User{}, errors.New(
			"invalid password",
		)
	}

	token, err := utils.GenerateToken(
		user.ID,
		user.Role,
	)

	if err != nil {

		logger.ErrorLogger.Println(
			"JWT token generation failed:",
			err,
		)

		return "", models.User{}, errors.New(
			"failed to generate token",
		)
	}

	logger.InfoLogger.Println(
		"Login successful:",
		user.Email,
	)

	return token, user, nil
}

func LogoutService(
	authHeader string,
) error {

	if authHeader == "" {

		return errors.New(
			"authorization header missing",
		)
	}

	tokenString := strings.Split(
		authHeader,
		" ",
	)[1]

	err := config.RedisClient.Set(
		config.Ctx,
		tokenString,
		"blacklisted",
		24*time.Hour,
	).Err()

	if err != nil {

		logger.ErrorLogger.Println(
			"Failed to blacklist token:",
			err,
		)

		return errors.New("logout failed")
	}

	logger.InfoLogger.Println(
		"User logged out",
	)

	return nil
}

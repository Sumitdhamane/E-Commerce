package repository

import (
	"ecommerce-api/config"
	"ecommerce-api/internal/models"
)

func CreateUser(user models.User) error {

	query := `
	INSERT INTO users(name,email,password,role)
	VALUES(?,?,?,?)
	`

	_, err := config.DB.Exec(
		query,
		user.Name,
		user.Email,
		user.Password,
		user.Role,
	)

	return err
}

func GetUserByEmail(email string) (models.User, error) {

	var user models.User

	query := `
	SELECT id,name,email,password,role
	FROM users
	WHERE email=?
	`

	err := config.DB.QueryRow(
		query,
		email,
	).Scan(
		&user.ID,
		&user.Name,
		&user.Email,
		&user.Password,
		&user.Role,
	)

	return user, err
}

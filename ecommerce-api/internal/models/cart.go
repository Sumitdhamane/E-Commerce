package models

type CartItem struct {
	ID          int     `json:"id"`
	UserID      int     `json:"user_id"`
	ProductID   int     `json:"product_id"`
	ProductName string  `json:"product_name,omitempty"`
	Price       float64 `json:"price,omitempty"`
	Quantity    int     `json:"quantity"`
	Subtotal    float64 `json:"subtotal,omitempty"`
}
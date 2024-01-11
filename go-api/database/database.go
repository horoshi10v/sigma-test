package database

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"go-api/models"
	"strconv"
)

// Users in-memory database
var Users []models.User

// UserExists checks if the user with this ID exists in the in-memory database
func UserExists(userID int) bool {
	return userID >= 0 && userID < len(Users)
}

// GetUserID extracts and converts the user ID from the request parameters
func GetUserID(c *gin.Context) (int, error) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return -1, fmt.Errorf("invalid user ID: %v", err)
	}

	// Check if the requested user ID is valid
	if !UserExists(id) {
		return -1, fmt.Errorf("user not found")
	}

	return id, nil
}

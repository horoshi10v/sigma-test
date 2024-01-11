package controllers

import (
	"github.com/gin-gonic/gin"
	"go-api/database"
	"go-api/models"
	"net/http"
)

// CreateUser handles the creation of new user
func CreateUser(c *gin.Context) {
	var user models.User
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Add new user to database
	user.ID = len(database.Users)
	database.Users = append(database.Users, user)

	c.JSON(http.StatusCreated, user)
}

// GetUsers return list of all users
func GetUsers(c *gin.Context) {
	c.JSON(http.StatusOK, database.Users)
}

// GetUser return a user based on provided user ID
func GetUser(c *gin.Context) {
	userID, err := database.GetUserID(c)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, database.Users[userID])
}

// DeleteUser removes user by id from database
func DeleteUser(c *gin.Context) {
	userID, err := database.GetUserID(c)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Delete user from database
	database.Users = append(database.Users[:userID], database.Users[userID+1:]...)

	c.JSON(http.StatusNoContent, gin.H{"message": "User deleted successfully"})
}

// UpdateUser updates a user based on the provided user ID
func UpdateUser(c *gin.Context) {
	userID, err := database.GetUserID(c)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var updatedUser models.User
	if err := c.ShouldBindJSON(&updatedUser); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Update the user in the in-memory database
	updatedUser.ID = userID
	database.Users[userID] = updatedUser

	c.JSON(http.StatusOK, updatedUser)
}

package routes

import (
	"github.com/gin-gonic/gin"
	"go-api/controllers"
)

func SetupRoutes(r *gin.Engine) {
	// Setup CRUD routes
	r.POST("/users", controllers.CreateUser)
	r.GET("/users", controllers.GetUsers)
	r.GET("/users/:id", controllers.GetUser)
	r.DELETE("/users/:id", controllers.DeleteUser)
	r.PUT("/users/:id", controllers.UpdateUser)
}

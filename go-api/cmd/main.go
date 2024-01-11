package main

import (
	"github.com/gin-gonic/gin"
	"go-api/routes"
)

func main() {
	r := gin.Default()

	// Register CRUD routes
	routes.SetupRoutes(r)

	// Listen and serve on 0.0.0.0:8080
	r.Run()
}

package main

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"go-api/routes"
)

func main() {
	r := gin.Default()

	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"http://localhost:3000"} // Adjust the origin based on your React app's URL
	r.Use(cors.New(config))

	// Register CRUD routes
	routes.SetupRoutes(r)

	// Listen and serve on 0.0.0.0:8080
	r.Run()
}

package api

import (
	"fmt"

	"github.com/gin-contrib/cache"
	"github.com/gin-contrib/cache/persistence"

	"net/http"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

// Server server
type Server struct {
	Env        string
	Port       string
	RedisHost  string
	HttpClient http.Client
}

// NewServer newServer
func NewServer(conf *Server) *Server {
	return &Server{
		Env:        conf.Env,
		Port:       conf.Port,
		RedisHost:  conf.RedisHost,
		HttpClient: conf.HttpClient,
	}
}

func gitURL() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Next()

		// after request
		fmt.Println("request body", c.Request.Body)
		// access the status we are sending
	}
}

// Run run
func (s *Server) Run() {
	r := gin.Default()
	RedisHost := s.RedisHost
	r.Use(gitURL())
	r.Use(cors.Default())
	store := persistence.NewRedisCache(RedisHost, "", time.Minute*10)
	r.GET("/commits/:user/:name", cache.CachePage(store, time.Minute*10, s.commits))
	r.GET("/repository/:user", cache.CachePage(store, time.Minute*10, s.listRepositories))
	r.NoRoute(func(c *gin.Context) {
		c.JSON(404,
			gin.H{"error": gin.H{
				"key":         "page not found",
				"description": "page not found",
			}})
	})

	r.Run("0.0.0.0:" + s.Port) // listen and serve on 0.0.0.0:8080 (for windows "localhost:8080")
}

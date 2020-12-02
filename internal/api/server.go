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

// MyCustomHTTPClient MyCustomHTTPClient
type MyCustomHTTPClient interface {
	Get(url string) (resp *http.Response, err error)
}

// Server server
type Server struct {
	Env        string
	Port       string
	RedisHost  string
	HTTPClient MyCustomHTTPClient
}

// NewServer newServer
func NewServer(conf *Server) *Server {
	return &Server{
		Env:        conf.Env,
		Port:       conf.Port,
		RedisHost:  conf.RedisHost,
		HTTPClient: conf.HTTPClient,
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
func (s *Server) SetupRouter() *gin.Engine {
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

	return r

}

// Run run
func (s *Server) Run() {
	r := s.SetupRouter()
	r.Run("0.0.0.0:" + s.Port) // listen and serve on 0.0.0.0:8080 (for windows "localhost:8080")
}

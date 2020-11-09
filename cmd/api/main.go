package main

import (
	"os"

	"github.com/Royalsspirit/meisterwerk/internal/api"
	"net/http"
)

func main() {
	conf := api.Server{
		RedisHost:  os.Getenv("REDIS_HOST"),
		Port:       "8000",
		Env:        "dev",
		HttpClient: http.Client{},
	}
	server := api.NewServer(&conf)
	server.Run()
}

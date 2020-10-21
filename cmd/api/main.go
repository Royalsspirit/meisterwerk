package main

import (
	"os"

	"github.com/Royalsspirit/meisterwerk/internal/api"
)

func main() {
	conf := api.Server{
		RedisHost: os.Getenv("REDIS_HOST"),
		Port:      "8000",
		Env:       "dev",
	}
	server := api.NewServer(&conf)
	server.Run()
}

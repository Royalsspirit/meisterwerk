package main

import (
	"fmt"
	"os"

	"net/http"

	"github.com/Royalsspirit/meisterwerk/internal/api"
	"github.com/joho/godotenv"
)

// AddHeaderTransport AddHeaderTransport
type AddHeaderTransport struct{}

//RoundTrip RoundTrip
func (adt *AddHeaderTransport) RoundTrip(req *http.Request) (*http.Response, error) {
	if os.Getenv("GITHUB_TOKEN") != "" {
		req.Header.Add("Authorization", "token "+os.Getenv("GITHUB_TOKEN"))
	}
	fmt.Println("header", req.Header)
	return http.DefaultTransport.RoundTrip(req)
}

func main() {
	godotenv.Load()

	conf := api.Server{
		RedisHost: os.Getenv("REDIS_HOST"),
		Port:      "8000",
		Env:       "dev",
		HttpClient: http.Client{
			Transport: &AddHeaderTransport{},
		},
	}
	server := api.NewServer(&conf)
	server.Run()
}

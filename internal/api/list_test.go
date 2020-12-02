package api

import (
	"bytes"
	"fmt"
	"io/ioutil"
	"net/http"
	"net/http/httptest"

	"github.com/stretchr/testify/assert"

	"testing"

	"github.com/gin-gonic/gin"
)

type CustomHTTPClient struct{}

func (c *CustomHTTPClient) Get(url string) (resp *http.Response, err error) {
	return &http.Response{Body: ioutil.NopCloser(bytes.NewBufferString("[{\"id\": 0,\"commits_url\":\"toto\",\"name\":\"toto\",\"nextUrl\":\"toto\"}]"))}, nil
}
func TestListRepositories(t *testing.T) {
	h := CustomHTTPClient{}
	c := Server{
		Port:       "4242",
		HTTPClient: &h,
	}
	s := NewServer(&c)
	w := httptest.NewRecorder()
	g, _ := gin.CreateTestContext(w)
	g.Params = []gin.Param{{Key: "user", Value: "facebook"}}
	s.listRepositories(g)
	fmt.Println("result", g)
	// assert equality
	assert.Equal(t, 200, w.Code)

}

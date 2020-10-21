package api

import (
	"encoding/json"
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/gin/binding"
	"io/ioutil"
	"net/http"
	"strconv"
	"strings"
)

type repository struct {
	Id        int    `json:"id"`
	CommitUrl string `json:"commits_url"`
	Name      string `json:"name"`
	NextUrl   string `json:"nextUrl"`
}

type listParameters struct {
	TypeRepo  string `form:"type" binding:"omitempty,oneof=call public private forks sources member internal"`
	Sort      string `form:"sort" binding:"omitempty,oneof=created updated pushed full_name"`
	Direction string `form:"direction" binding:"omitempty,oneof=asc desc"`
	Per_page  int    `form:"per_page" validate:"omitempty,numeric"`
	Page      int    `form:"page" binding:"omitempty,numeric"`
}

func (s *Server) listRepositories(c *gin.Context) {
	user := c.Param("user")
	var b listParameters
	fmt.Println("b", binding.Query)
	if err := c.ShouldBindWith(&b, binding.Query); err == nil {
		fmt.Println("bb", b)
		var url string = "https://api.github.com/users/" + user + "/repos"
		var parameters []string
		if b.TypeRepo != "" {
			parameters = append(parameters, "type"+b.TypeRepo)
		}
		if b.Sort != "" {
			parameters = append(parameters, "sort="+b.Sort)
		}
		if b.Direction != "" {
			parameters = append(parameters, "direction="+b.Direction)
		}
		if b.Per_page != 0 {
			parameters = append(parameters, "per_page="+strconv.Itoa(b.Per_page))
		}
		if b.Page != 0 {
			parameters = append(parameters, "page="+strconv.Itoa(b.Page))

		}
		if len(parameters) > 0 {
			url = url + "?" + strings.Join(parameters, "&")
		}
		fmt.Println("final url" + url)
		res, err := http.Get(url)
		if err != nil {
			panic(err)
		}
		bData, _ := ioutil.ReadAll(res.Body)
		var currentRepo []repository
		json.Unmarshal(bData, &currentRepo)

		for i := 0; i < len(currentRepo); i++ {
			currentRepo[i].NextUrl = "/commits/" + user + "/" + currentRepo[i].Name
		}

		c.JSON(200, currentRepo)

	} else {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	}

}

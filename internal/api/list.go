package api

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"strconv"
	"strings"

	"github.com/gin-gonic/gin"
)

type repository struct {
	ID        int    `json:"id"`
	CommitURL string `json:"commits_url"`
	Name      string `json:"name"`
	NextURL   string `json:"nextUrl"`
}

type repositoryError struct {
	Message string `json:"message"`
}
type listParameters struct {
	TypeRepo  string `form:"type" binding:"omitempty,oneof=call public private forks sources member internal"`
	Sort      string `form:"sort" binding:"omitempty,oneof=created updated pushed full_name"`
	Direction string `form:"direction" binding:"omitempty,oneof=asc desc"`
	Per_page  int    `form:"per_page" validate:"omitempty,numeric"`
	Page      int    `form:"page" binding:"omitempty,numeric"`
}
type queryBindinCustom struct {
}

func (q *queryBindinCustom) Name() string {
	return "query"
}
func (q *queryBindinCustom) Bind(req *http.Request, obj interface{}) error {
	return nil
}
func (s *Server) listRepositories(c *gin.Context) {
	user := c.Param("user")
	fmt.Println("user", user)
	var b listParameters
	fmt.Println("b", b)
	var qb queryBindinCustom
	if err := c.ShouldBindWith(&b, &qb); err != nil {
		fmt.Println("error", err)
	}
	if err := c.ShouldBindWith(&b, &qb); err == nil {
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
		fmt.Println("final url " + url)
		res, err := s.HTTPClient.Get(url)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		bData, _ := ioutil.ReadAll(res.Body)

		var currentRepo []repository
		err = json.Unmarshal(bData, &currentRepo)
		if err != nil {
			var repoError repositoryError
			json.Unmarshal(bData, &repoError)
			fmt.Println("error", err)
			c.JSON(http.StatusBadRequest, gin.H{"error": repoError.Message})
			return
		}

		for i := 0; i < len(currentRepo); i++ {
			currentRepo[i].NextURL = "/commits/" + user + "/" + currentRepo[i].Name
		}

		c.JSON(200, currentRepo)

	} else {
		fmt.Println("ici")
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	}

}

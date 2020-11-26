package api

import (
	"encoding/json"
	"github.com/gin-gonic/gin"
	//	"github.com/gin-gonic/gin/binding"
	"io/ioutil"
)

/**
  "login": "Mxiim",
  "id": 8554206,
  "node_id": "MDQ6VXNlcjg1NTQyMDY=",
  "avatar_url": "https://avatars2.githubusercontent.com/u/8554206?v=4",
  "gravatar_id": "",
  "url": "https://api.github.com/users/Mxiim",
  "html_url": "https://github.com/Mxiim",
  "followers_url": "https://api.github.com/users/Mxiim/followers",
  "following_url": "https://api.github.com/users/Mxiim/following{/other_user}",
  "gists_url": "https://api.github.com/users/Mxiim/gists{/gist_id}",
  "starred_url": "https://api.github.com/users/Mxiim/starred{/owner}{/repo}",
  "subscriptions_url": "https://api.github.com/users/Mxiim/subscriptions",
  "organizations_url": "https://api.github.com/users/Mxiim/orgs",
  "repos_url": "https://api.github.com/users/Mxiim/repos",
  "events_url": "https://api.github.com/users/Mxiim/events{/privacy}",
  "received_events_url": "https://api.github.com/users/Mxiim/received_events",
  "type": "User",
  "site_admin": false
*/
type User struct {
	Login      string `json:"login"`
	Avatar_url string `json:"avatar_url"`
	Url        string `json:"url"`
}
type CommitUser struct {
	Name  string `json:"name"`
	Email string `json:"email"`
	Date  string `json:"date"`
}

type Commit struct {
	Author    CommitUser `json:"author"`
	Committer CommitUser `json:"committer"`
	Url       string     `json:"url"`
	Message   string     `json:"message"`
}
type commitDetails struct {
	Commit    Commit
	Author    User
	Committer User
}

func (s *Server) commits(c *gin.Context) {
	name := c.Param("name")
	user := c.Param("user")
	var url string = "https://api.github.com/repos/" + user + "/" + name + "/commits?per_page=20&page=1"

	res, err := s.HttpClient.Get(url)

	if err != nil {
		panic(err)
	}

	bData, _ := ioutil.ReadAll(res.Body)
	var currentRepo []commitDetails
	json.Unmarshal(bData, &currentRepo)

	c.JSON(200, currentRepo)

}

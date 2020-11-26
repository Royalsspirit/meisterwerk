# meisterwerk

Displaying owner repositories and its commits.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

This project currently run on Ubuntu 18.04.4 LTS x86_64 with stable version of node and go:1.14.

To avoid Os dependencies, i suggest to use Docker

For installation instructions, see 
```
https://docs.docker.com/engine/install/
```

Also to manage all app together, need to install docker-compose

```
https://docs.docker.com/compose/install/
```

### Repository layout

Inspired by this [project-layout](https://github.com/golang-standards/project-layout).
#### `/internal`

  This is actual api code go. See [doc](https://github.com/Royalsspirit/meisterwerk/tree/main/internal/api)
  
#### `/website`

  This is the place to put your project's website data. Here is a reactjs project. See [doc](https://github.com/Royalsspirit/meisterwerk/tree/main/website)
  
#### `/cmd`

  This is where a main package can be found

#### `/build`

  Packaging and Continuous Integration.

### Installing

A step by step series of examples that tell you how to get a development env running.

If you want to use the api as standalone app without docker, you need to define a environment variable in order to not be restricted by the api github limit.
To do that, create a .env file in current directory with this content:
```
GITHUB_TOKEN=MY_TOKEN_GITHUB
```
then type:
```
go run cmd/api/main.go
```
Otherwise, in case you prefer run all together move this .env file into `build` directory in order to be interpreted by docker-compose
then type from the current directory:
```
make up
```
Front application will be reachable on port 3001

To clean all docker environment
```
make clean
```
## Built With
### Front
* [react](https://github.com/facebook/react) - React is a JavaScript library for building user interfaces.
* [redux](https://github.com/reduxjs/redux) - Redux is a predictable state container for JavaScript apps.
* [react-redux](https://github.com/reduxjs/react-redux) - Official React bindings for Redux
### Back
* [gin-go](https://github.com/gin-gonic/gin) - Gin is a web framework written in Go.

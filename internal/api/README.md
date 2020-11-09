A simple api go built with gin go and its dependencies to cache with redis
The purpose of the API is to be a kind of proxy of api.github.com, 
so all parameters found in api.github need to be present in mine.

# Usage

## `/repository/:owner`

This endpoints allow to pull repositories from a specific owner

The document of target endpoint is here [here](https://docs.github.com/en/free-pro-team@latest/rest/reference/repos#list-repositories-for-a-user)

As we see *type*, *direction*, *sort*, *per_page*, *page* are optionnal parameters.
They are also available in this prject.

## `commits/:owner/:name`

This endpoints allow to pull commits from project and specific owner

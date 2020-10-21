FROM golang:1.14

WORKDIR /app

COPY ./go.sum ./go.mod ./

# Get dependencies (cached)
RUN go mod download

# Copy the source code
COPY . .

CMD ["go","run","cmd/api/main.go"]
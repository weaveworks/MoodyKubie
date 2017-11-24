
IMAGE_NAME="cubieface/web-service"

image: Dockerfile web-service
	docker build --tag ${IMAGE_NAME} .

web-service: main.go
	CGO_ENABLED=0 GOOS=linux go build -a -ldflags '-extldflags "-static"' -o web-service main.go

clean:
	rm web-service


.PHONY: clean

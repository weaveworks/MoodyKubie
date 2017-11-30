
IMAGE_NAME="briceweave/cubieface-web-service"
TAG="latest"

image: Dockerfile web-service
	sudo docker build --tag ${IMAGE_NAME}:${TAG} .

web-service: main.go
	CGO_ENABLED=0 GOOS=linux go build -a -ldflags '-extldflags "-static"' -o web-service main.go

clean:
	rm web-service

push: image
	sudo docker push ${IMAGE_NAME}:${TAG}

.PHONY: clean image

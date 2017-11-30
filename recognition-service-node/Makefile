TAG="briceweave/recognition-service-node"
VERSION="latest"

image: Dockerfile
	sudo docker build -t ${TAG}:${VERSION} .

push: image
	sudo docker push ${TAG}:${VERSION}

.PHONY: image

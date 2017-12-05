.PHONY: default all clean image push

default: image
all: image push

REPO := weaveworks
NAME := moodykubie-service
IMAGE := $(REPO)/$(NAME)
CURRENT_DIR := $(dir $(realpath $(firstword $(MAKEFILE_LIST))))

clean:
	-docker rmi -f \
		$(IMAGE):$(VERSION) \
		$(IMAGE):latest

image:
	docker build \
		-t $(IMAGE):latest \
		$(CURRENT_DIR)

push: image
	docker push $(IMAGE):latest

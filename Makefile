.PHONY: default all clean build push

default: build
all: build push

REPO := marccarre
NAME := cubieface
IMAGE := $(REPO)/$(NAME)
VERSION := $(shell ./version)
CURRENT_DIR := $(dir $(realpath $(firstword $(MAKEFILE_LIST))))

clean:
	-docker rmi -f \
		$(IMAGE):$(VERSION) \
		$(IMAGE):latest

build:
	docker build \
		-t $(IMAGE):$(VERSION) \
		-t $(IMAGE):latest \
		--build-arg=version=$(VERSION) \
		$(CURRENT_DIR)

push:
	docker push $(IMAGE):$(VERSION)
	docker push $(IMAGE):latest

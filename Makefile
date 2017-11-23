.PHONY: default all clean build push

default: build
all: build push

REPO := marccarre
NAME := cubieface
IMAGE := $(REPO)/$(NAME)
VERSION := $(shell ./version)
ARCH := $(shell uname -m)
CURRENT_DIR := $(dir $(realpath $(firstword $(MAKEFILE_LIST))))

clean:
	-docker rmi -f \
		$(IMAGE):$(VERSION)-$(ARCH) \
		$(IMAGE):$(ARCH)

build:
	docker build \
		-t $(IMAGE):$(VERSION)-$(ARCH) \
		-t $(IMAGE):$(ARCH) \
		--build-arg=version=$(VERSION) \
		$(CURRENT_DIR)

push:
	docker push $(IMAGE):$(VERSION)-$(ARCH)
	docker push $(IMAGE):$(ARCH)

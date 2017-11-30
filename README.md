# Cubieface

Cubieface is a kubernetes-native face recognition service built to run on top of an ARM clusters of Cubieboard 2.0 like the [Cubienetes](https://github.com/tomwilkie/cubienetes).

It was built as a demo for [KubeCon 2017](http://events.linuxfoundation.org/events/kubecon-and-cloudnativecon-north-america) by a team at [Weaveworks](https://github.com/weaveworks).

## Images

The recogniser image can be found on [Docker Hub](https://hub.docker.com/r/briceweave/recognition-service-node/) as `briceweave/recognition-service-node` and will expose the recognition service on port `8989`.

The frontend image can be found on [Docker Hub](https://hub.docker.com/r/briceweave/cubieface-web-service/) as `briceweave/cubieface-web-service` and will expose the frontend on port `9000`.

## Developing

You don't need to build the Docker images to work on the cubieface.

You'll need [Node](https://nodejs.org) and [Go](https://golang.org) installed. Then, in one terminal run the backend recognition service using the following commands:

```
# Navigate to the backend service app
➤ cd recognition-service-node/app/

# Download and install dependencies
➤ npm install
...

# Run the application
➤ node index.js
Emotion detection service live on port 8989
```

In another terminal, run the front end service:

```
# Navigate to the frontend service
➤ cd web-service

# Run the app
➤ go run main.go
```

The frontend client files can be found in `web-service/static`


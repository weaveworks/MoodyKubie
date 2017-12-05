# MoodyKubie

MoodyKubie is a kubernetes-native face recognition service built to run on top of an ARM clusters of Cubieboard 2.0 like the [Cubienetes](https://github.com/tomwilkie/cubienetes).

It was built as a demo for [KubeCon Austin 2017](http://events.linuxfoundation.org/events/kubecon-and-cloudnativecon-north-america) by a team at [Weaveworks](https://github.com/weaveworks).

## Images

The recognition service image can be found on [Docker Hub](https://hub.docker.com/r/weaveworks/moodykubie-service/) as `weaveworks/moodykubie-service` and will expose the recognition service on port `8989`.

The UI image can be found on [Docker Hub](https://hub.docker.com/r/weaveworks/moodykubie-ui/) as `weaveworks/moodykubie-ui` and will expose the UI on port `9000`.

## Developing

You don't need to build the Docker images to work on the MoodyKubie.

You'll need [Node](https://nodejs.org) and [Go](https://golang.org) installed. Then, in one terminal run the recognition service using the following commands:

```
# Navigate to the backend service app
➤ cd moodykubie-service/app/

# Download and install dependencies
➤ npm install
...

# Run the application
➤ node index.js
Emotion detection service live on port 8989
```

In another terminal, run the UI:

```
# Navigate to the UI
➤ cd moodykubie-ui

# Run the app
➤ go run main.go
2017/11/30 19:21:51 Starting HTTP server on port 9000
```

The UI will be served on port 9000. navigate to http://localhost:9000 to view it. The UI client files can be found in `moodykubie-ui/static`

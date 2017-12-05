FROM scratch
ARG version
LABEL version ${version}
COPY config.json /
COPY static/ /static/
COPY moodykubie-ui /
EXPOSE 9000
ENTRYPOINT ["/moodykubie-ui"]


FROM arm32v7/ubuntu:latest

# install build essentials for node plugins
RUN apt-get install -y 



RUN apt-get update && apt-get install -y \
    build-essential \
    curl

RUN curl -sL https://deb.nodesource.com/setup_8.x | bash -
RUN apt-get update && apt-get install -y \
    nodejs \

WORKDIR app/

RUN npm install

CMD ["node", "index.js"]

# try https://github.com/auduno/clmtrackr on node.
# Look at
# https://github.com/romilly/rpi-docker-tensorflow
# https://github.com/oarriaga/face_classification
# http://www.gorillatoolkit.org/pkg/websocket
# https://medium.com/@nate510/don-t-use-go-s-default-http-client-4804cb19f779
# https://docs.opencv.org/2.4/doc/tutorials/introduction/crosscompilation/arm_crosscompile_with_cmake.html
# https://www.linkedin.com/pulse/opencv-python-installation-arm-embedded-linux-machine-ali-shahnewaz
# https://salmanarif.bitbucket.io/visual/downloads.html
# https://github.com/sjwhitworth/golearn
# https://dave.cheney.net/2015/08/22/cross-compilation-with-go-1-5
# https://github.com/tensorflow/tensorflow
# https://petewarden.com/2017/08/20/cross-compiling-tensorflow-for-the-raspberry-pi/
# http://processors.wiki.ti.com/index.php/Building_OpenCV_for_ARM_Cortex-A8
# https://hub.docker.com/r/arm32v7/ubuntu/
# https://matchboxdorry.gitbooks.io/matchboxblog/content/blogs/build_and_run_arm_images.html
# https://github.com/lhelontra/tensorflow-on-arm



FROM ubuntu:16.04

# Install Python3 and OpenCV:
RUN apt update && apt install -y \
        build-essential \
        cmake \
        curl \
        pkg-config \
        libjpeg-dev \
        libtiff5-dev \
        libjasper-dev \
        libpng12-dev \
        libavcodec-dev \
        libavformat-dev \
        libswscale-dev \
        libv4l-dev \
        libxvidcore-dev \
        libx264-dev \
        libgtk-3-dev \
        libatlas-base-dev \
        gfortran \
        python3-dev \
        python3-pip \
        python3-numpy && \
    mkdir opencv && \
    cd opencv && \
    curl -fsSLO https://github.com/opencv/opencv/archive/3.3.1.tar.gz && \
    echo "5dca3bb0d661af311e25a72b04a7e4c22c47c1aa86eb73e70063cd378a2aa6ee  3.3.1.tar.gz" | sha256sum -c && \
    tar xzf 3.3.1.tar.gz && \
    cd opencv-3.3.1 && \
    mkdir build && \
    cd build && \
    cmake -D CMAKE_BUILD_TYPE=RELEASE \
        -D CMAKE_INSTALL_PREFIX=/usr/local \
        -D INSTALL_PYTHON_EXAMPLES=OFF \
        -D INSTALL_C_EXAMPLES=OFF \
        -D PYTHON_EXECUTABLE=/usr/bin/python3 \
        -D BUILD_EXAMPLES=OFF .. && \
    make && \
    make install && \
    ldconfig && \
    python3 -c "import cv2 ; print(cv2.__version__)" && \
    cd / && \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* /opencv

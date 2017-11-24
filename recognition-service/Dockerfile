FROM ubuntu:16.04
ARG version
LABEL version ${version}

# Install Python3 and pip:
RUN apt-get update && apt-get install -y \
        python3-dev \
        python3-pip \
        python3-numpy \
        python3-scipy \
        python3-tk \
        python3-wheel && \
    pip3 install --no-cache-dir --upgrade pip && \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Install TensorFlow:
RUN apt-get update && apt-get install -y \
        build-essential \
        curl \
        openjdk-8-jdk \
        python \
        zip && \
    mkdir bazel && cd bazel && \
    curl -fsSLO https://github.com/bazelbuild/bazel/releases/download/0.7.0/bazel-0.7.0-dist.zip && \
    echo "a084a9c5d843e2343bf3f319154a48abe3d35d52feb0ad45dec427a1c4ffc416  bazel-0.7.0-dist.zip" | sha256sum -c && \
    unzip bazel-0.7.0-dist.zip && \
    ./compile.sh && \
    mv output/bazel /usr/local/bin && \
    cd / && \
    mkdir tensorflow && cd tensorflow && \
    curl -fsSLO https://github.com/tensorflow/tensorflow/archive/v1.4.0.tar.gz && \
    echo "8a0ad8d61f8f6c0282c548661994a5ab83ac531bac496c3041dedc1ab021107b  v1.4.0.tar.gz" | sha256sum -c && \
    tar zxf v1.4.0.tar.gz && \
    cd tensorflow-1.4.0 && \
    PYTHON_BIN_PATH=/usr/bin/python3 \
        PYTHON_LIB_PATH=/usr/lib/python3/dist-packages \
        TF_NEED_JEMALLOC=1 \
        TF_NEED_GCP=0 \
        TF_NEED_HDFS=0 \
        TF_NEED_S3=0 \
        TF_ENABLE_XLA=0 \
        TF_NEED_GDR=0 \
        TF_NEED_VERBS=0 \
        TF_NEED_OPENCL=0 \
        TF_NEED_CUDA=0 \
        TF_NEED_MPI=0 \
        CC_OPT_FLAGS="-march=native" \
        ./configure && \
    bazel build --config=opt //tensorflow/tools/pip_package:build_pip_package && \
    bazel-bin/tensorflow/tools/pip_package/build_pip_package /tmp/tensorflow_pkg && \
    pip3 install --no-cache-dir /tmp/tensorflow_pkg/tensorflow-1.4.0-*.whl && \
    cd / && \
    apt-get remove --purge -y \
        build-essential \
        curl \
        openjdk-8-jdk \
        python \
        zip && \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* /bazel /tensorflow /usr/local/bin/bazel && \
    python3 -c "import tensorflow as tf; print(tf.Session().run(tf.constant('Hello, TensorFlow')))"

# Install OpenCV:
RUN apt-get update && apt-get install -y \
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
        gfortran && \
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

# Install project's dependencies:
RUN pip3 install --no-cache-dir \
        h5py \
        keras \
        matplotlib \
        pandas \
        Pillow

# Install oarriaga/face_classification:
RUN apt-get update && apt-get install -y \
        git && \
    git clone https://github.com/oarriaga/face_classification.git && \
    apt-get remove --purge -y \
        git && \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*
WORKDIR face_classification/src
CMD python3 video_emotion_color_demo.py

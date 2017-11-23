# cubieface

Face detection and emotion classification, in Docker containers, on CubieBoard (ARM).

## Usage

```bash
$ docker run -it \
    -e DISPLAY \
    --net=host \
    --privileged \
    -v /dev/video0:/dev/video0 \
    marccarre/cubieface:latest
```

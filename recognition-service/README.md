# MoodyKubie

Face detection and emotion classification, in Docker containers, on CubieBoard (ARM).

## Usage

### x86_64

```bash
$ docker run -it \
    -e DISPLAY \
    --net=host \
    --privileged \
    -v /dev/video0:/dev/video0 \
    marccarre/cubieface:x86_64
```

### ARM

```bash
$ docker run -it \
    -e DISPLAY \
    --net=host \
    --privileged \
    -v /dev/video0:/dev/video0 \
    marccarre/cubieface:armv7l
```

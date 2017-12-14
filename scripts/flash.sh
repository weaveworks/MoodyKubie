COLOR=green

function turn_on {
  echo 255 > /sys/class/leds/cubieboard2\:${1}\:usr/brightness
}

function turn_off {
  echo 0 > /sys/class/leds/cubieboard2\:${1}\:usr/brightness
}

trap 'echo exit; turn_off; exit' 15

while true; do
  turn_on green
  sleep 0.3
  turn_off green
  turn_on blue
  sleep 0.3
  turn_off blue
done

# Notes on getting Kubernetes up and running on Armbian

## Changing kubelet startup command
The default kubelet invoke script in armbian breaks with newer versions of kubelet. We need to remove the kubelet argument `--reconcile-cidr`, `cloud provider`, `--cgroup-root` and `--non-masquerade-cidr` from `/etc/systemd/system/kubelet.service.d/10-kubelet.conf`

## Disabling swap
The swap partition needs to be disabled for kubernetes.

```
apt-get install dphys-swapfile
sudo dphys-swapfile swapoff
sudo dphys-swapfile uninstall
sudo update-rc.d dphys-swapfile remove
```

## Finding out who uses  a given port

```
netstat -lnp | grep 1025
```

## Setting up kubeadm

```
curl -s https://packages.cloud.google.com/apt/doc/apt-key.gpg \
  | sudo apt-key add - && echo "deb http://apt.kubernetes.io/ kubernetes-xenial main" \
  | sudo tee /etc/apt/sources.list.d/kubernetes.list 
sudo apt-get update -q
sudo apt-get install -qy kubeadm kubelet kubectl
```

## Getting all the ports on mac 

```
networksetup -listallhardwareports
```


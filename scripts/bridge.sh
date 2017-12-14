#! /bin/sh
# ######################################
#  coded by Nat!
#  2013 Mulle kybernetiK
#  GPL

command=${1:-start}
shift
proxyarp=${1:-no}
shift

IFACE1=utun1
IFACE2=en7

start()
{
        sysctl -w net.inet.ip.forwarding=1
        #sysctl -w net.inet.ip.fw.enable=1
        if [ "$proxyarp" != "no" ]
        then
                sysctl -w net.link.ether.inet.proxyall=1
        fi

        ifconfig bridge9 create
        ifconfig bridge9 addm ${IFACE1}
        ifconfig bridge9 addm ${IFACE2}
        ifconfig bridge9 up
        if [ $? -eq 0 ]
        then
                syslog -s "Ethernet Bridge is up"
        else
                syslog -s "Ethernet Bridge failure"
        fi
}


stop()
{
        ifconfig bridge9 destroy

        sysctl -w net.inet.ip.forwarding=0
        #sysctl -w net.inet.ip.fw.enable=0
        sysctl -w net.link.ether.inet.proxyall=0

        syslog -s "Ethernet Bridge is down"
}



case "$command" in
        start*) start
                ;;
        
        stop*)  stop
                ;;
esac

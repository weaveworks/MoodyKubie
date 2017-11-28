package main

import (
	"bytes"
	"io/ioutil"
	"log"
	"net"
	"net/http"
	"os"
	"time"
)

var netTransport = &http.Transport{
	Dial: (&net.Dialer{
		Timeout: 5 * time.Second,
	}).Dial,
	TLSHandshakeTimeout: 5 * time.Second,
}

var netClient = &http.Client{
	Timeout:   time.Second * 10,
	Transport: netTransport,
}

func home(w http.ResponseWriter, r *http.Request) {
	log.Println("Serving home page.")
	http.ServeFile(w, r, "./static/")
}

func imageUpload(w http.ResponseWriter, r *http.Request) {
	// Acts as proxy to other service - we could instead use something like Nginx proxy?
	log.Println("Reading image from client.")
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		log.Printf("Error reading body: %v", err)
		http.Error(w, "can't read body", http.StatusBadRequest)
		return
	}
	ioutil.WriteFile("./test.jpg", body, os.FileMode(int(0666)))

	response, err := netClient.Post("http://localhost:8989/classify-emotions", "application/octet-stream", bytes.NewReader(body))
	if err != nil {
		log.Printf("Error requesting emotions from classifier: %v", err)
		http.Error(w, "Could not get emotions from classifier", http.StatusBadGateway)
		return
	}
	defer response.Body.Close()

	bodyBytes, err := ioutil.ReadAll(response.Body)
	if err != nil {
		log.Printf("Error reading classifier response: %v", err)
		http.Error(w, "Could not read response from classifier", http.StatusInternalServerError)
		return

	}

	log.Println("Writing classifier response to client.")
	_, err = w.Write(bodyBytes)
	if err != nil {
		log.Printf("Error writing response to: %v", err)
		http.Error(w, "Failed to write response to client", http.StatusInternalServerError)
		return
	}

}

func main() {
	http.HandleFunc("/classify_emotions", imageUpload)
	http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("./static"))))
	http.HandleFunc("/", home)
	log.Printf("Starting HTTP server on port 9000")
	http.ListenAndServe(":9000", nil)
}

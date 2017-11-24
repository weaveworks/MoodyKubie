package main

import (
	"io/ioutil"
	"log"
	"net/http"
	"os"
)

func home(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, "./static/")
}

func imageUpload(w http.ResponseWriter, r *http.Request) {
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		log.Printf("Error reading body: %v", err)
		http.Error(w, "can't read body", http.StatusBadRequest)
		return
	}
	ioutil.WriteFile("./test.jpg", body, os.FileMode(int(0666)))
}

func main() {
	http.HandleFunc("/image", imageUpload)
	http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("./static"))))
	http.HandleFunc("/", home)
	log.Printf("Starting HTTP server on port 9000")
	http.ListenAndServe(":9000", nil)
}

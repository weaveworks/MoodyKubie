package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
)

func handler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Hi there, %s!", r.URL.Path[1:])
}

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
	http.ListenAndServe(":9000", nil)
}

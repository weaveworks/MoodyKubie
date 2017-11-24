package main

import (
	"fmt"
	"net/http"
)

func handler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Hi there, %s!", r.URL.Path[1:])
}

func handleHome(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, "./static/")
}

func main() {
	http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("./static"))))
	http.HandleFunc("/", handleHome)
	http.ListenAndServe(":9000", nil)
}

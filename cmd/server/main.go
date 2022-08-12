package main

import (
	"log"
	"net/http"
)

func HomeEndPoint(w http.ResponseWriter, r *http.Request)

func main() {
	http.HandleFunc("/", HomeEndPoint)
	if err := http.ListenAndServe(":443", nil); err != nil {
		log.Fatal(err)
	}
}

package main

import (
	"log"
	"net/http"
	"os"
)

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
		log.Printf("Defaulting to port %s", port)
	}

	//for loading static assets
	fs := http.FileServer(http.Dir("./docs"))
	http.Handle("/", fs)

	//http.HandleFunc("/", HomeEndPoint)
	if err := http.ListenAndServe(":"+port, nil); err != nil {
		log.Fatal(err)
	}
}

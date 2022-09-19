package main

import (
	"log"
	"net/http"
)

func HomeEndPoint(w http.ResponseWriter, r *http.Request) {

}

func main() {
	//port := os.Getenv("PORT")
	//for loading static assets
	fs := http.FileServer(http.Dir("./web"))
	http.Handle("/", fs)

	//http.HandleFunc("/", HomeEndPoint)
	if err := http.ListenAndServe(":8080" /*+port*/, nil); err != nil {
		log.Fatal(err)
	}
}

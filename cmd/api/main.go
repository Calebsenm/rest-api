package main

import (
	"flag"
	"fmt"
	"log"
	"net/http"
)

func main() {

	addr := flag.String("addr", ":4000", "HTTP network address");
	fmt.Println("Server is running in localhost 3080")

	srv := &http.Server{
		Addr: *addr,
	}

	err1 := srv.ListenAndServe();

	if err1 != nil {
		panic(err1)
	}
}

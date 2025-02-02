package main

import (
	"net/http"
)

func (app *application) routes() http.Handler {

	mux := http.NewServeMux()

	fileServer := http.FileServer(http.Dir("./web/src"))
	mux.Handle("GET /web/", http.StripPrefix("/web", fileServer))

	mux.HandleFunc("GET /", app.home)
    mux.HandleFunc("GET /api/data", app.getData)
	mux.HandleFunc("GET /api/data/{id}", app.getDataById)
	mux.HandleFunc("POST /api/data", app.postData)
	mux.HandleFunc("PUT /api/data/{id}", app.putData)
	mux.HandleFunc("DELETE /api/data/{id}", app.deleteData)

	return app.logRequest(mux)
}

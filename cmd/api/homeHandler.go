package main

import (
	"net/http"
	"text/template"
)


func (app *application) home(w http.ResponseWriter, r *http.Request){

	tmpl, err := template.ParseFiles("./ui/html/main.html")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	
	data := struct{ Title string }{ Title: "Página de inicio"}
	err = tmpl.Execute(w, data)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}

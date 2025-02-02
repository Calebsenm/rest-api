package main

import (
	"net/http"
	"simple-res-api/internal/store"
	"strconv"
)


func (app *application) getData(w http.ResponseWriter, r *http.Request) {
	users, err := app.store.Users.Get(r.Context())
	if err != nil {
		return
	}

	if err := app.jsonResponse(w, http.StatusOK, users); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
    
}

func (app *application) getDataById(w http.ResponseWriter, r *http.Request) {
	userId := r.PathValue("id")
	id, err := strconv.ParseInt(userId, 10, 64)
	if err != nil {
		return
	}

	user, err := app.store.Users.GetByID(r.Context(), id)
	if err != nil {
		return
	}

	if err := app.jsonResponse(w, http.StatusOK, user); err != nil {
		http.Error(w, "Error generating JSON response", http.StatusInternalServerError)
	}
}

func (app *application) postData(w http.ResponseWriter, r *http.Request) {

	var user store.User
	if err := readJSON(w, r, &user); err != nil {
		http.Error(w, "Error Reading JSON", http.StatusBadRequest)
		return
	}
	if err := app.store.Users.Create(r.Context(), &user); err != nil {
		return
	}

	if err := app.jsonResponse(w, http.StatusNoContent, user); err != nil {
		writeJSONError(w, http.StatusInternalServerError, "the server encountered a problem")
	}
}


func (app *application) putData(w http.ResponseWriter, r *http.Request) {
	userId := r.PathValue("id")
	id, err := strconv.ParseInt(userId, 10, 64)
	
    if err != nil {
		return
	}

	var user store.User
	if err := readJSON(w, r, &user); err != nil {
		http.Error(w, "Error Reading JSON", http.StatusBadRequest)
		return
	}
	if err := app.store.Users.Update(r.Context(), id , &user ); err != nil {
		writeJSONError(w, http.StatusInternalServerError,"Error at update user")
        return
	}

	if err := app.jsonResponse(w, http.StatusNoContent, user); err != nil {
		writeJSONError(w, http.StatusInternalServerError, "the server encountered a problem")
	}


}


func (app *application) deleteData(w http.ResponseWriter, r *http.Request) {
	userId := r.PathValue("id")
	id, err := strconv.ParseInt(userId, 10, 64)
	if err != nil {
		return
	}

	err = app.store.Users.Delete(r.Context(), id)
	if err != nil {
		writeJSONError(w, http.StatusInternalServerError, "Error")
        return
	}

	if err := app.jsonResponse(w, http.StatusOK, ""); err != nil {
		http.Error(w, "Error generating JSON response", http.StatusInternalServerError)
	}
}


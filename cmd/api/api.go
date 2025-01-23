package main 

import(
    "net/http"
)


type aplication struct{
        
}

type dbConfig struct {
	addr         string
	maxOpenConns int
	maxIdleConns int
	maxIdleTime  string
}

type config struct {
	addr        string
	db          dbConfig
	env         string
	apiURL      string
	frontendURL string
}

func (app *aplication) run( mux http.Handler) error  {
   
    return nil 
}

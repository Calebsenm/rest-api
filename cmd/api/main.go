package main

import (
	"flag"
	"fmt"
	"log"
	"os"
	"simple-res-api/internal/db"
	"simple-res-api/internal/store"
)

func main() {

	addr := flag.String("addr", ":4000", "HTTP network address")
	dns := flag.String("db-dsn", "postgres://root:admin@localhost/persona?sslmode=disable", "PostgreSQL DSN")
	maxOpenConns := flag.Int("db-max-open-conns", 25, "Máximo de conexiones abiertas")
	maxIdleConns := flag.Int("db-max-idle-conns", 25, "Máximo de conexiones inactivas")
	maxIdleTime := flag.String("db-max-idle-time", "15m", "Tiempo máximo de conexión inactiva")

	infoLog := log.New(os.Stdout, "INFO\t", log.Ldate|log.Ltime)

	conf := &config{
		addr: *addr,
		db: dbConfig{
			addr:         *dns,
			maxOpenConns: *maxOpenConns,
			maxIdleConns: *maxIdleConns,
			maxIdleTime:  *maxIdleTime,
		},
	}

	db, err := db.New(
		conf.db.addr,
		conf.db.maxOpenConns,
		conf.db.maxIdleConns,
		conf.db.maxIdleTime,
	)

	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	fmt.Println("Database connection pool established")
	fmt.Println("Server is running in http://localhost:4000/")

	store := store.NewStorage(db)

	app := &application{
		config:  *conf,
		store:   store,
		infoLog: infoLog,
	}

	mux := app.routes()

	err = app.run(mux)

	if err != nil {
		fmt.Errorf(err.Error())
	}

}

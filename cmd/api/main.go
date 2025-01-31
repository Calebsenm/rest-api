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
	dns := flag.String("db-dsn", "postgres://root:admin@localhost/rest_api?sslmode=disable", "PostgreSQL DSN")

    infoLog := log.New(os.Stdout , "INFO\t" , log.Ldate | log.Ltime ); 

	conf := &config{
		addr: *addr,
		db: dbConfig{
			addr: *dns,
		},
	}

	db, err := db.New(
		conf.db.addr,
		conf.db.maxOpenConns,
		conf.db.maxIdleConns,
		conf.db.maxIdleTime,
	)

	if err != nil {
		fmt.Errorf(err.Error())
	}
	defer db.Close()

	store := store.NewStorage(db)

	app := &application{
		config: *conf,
		store:  store,
        infoLog: infoLog,
	}

	mux := app.routes()

	err = app.run(mux)

	if err != nil {
		fmt.Errorf(err.Error())
	}

	fmt.Println("Server is running in localhost 3080")
}

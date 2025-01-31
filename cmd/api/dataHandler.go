package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"strconv"
	"strings"
)

func (app *application) getData(w http.ResponseWriter, r *http.Request) {

	users, err := app.store.Users.Get()
	if err != nil {
		return
	}

	err = json.NewEncoder(w).Encode(users)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

}

// the function going to get the data for the id and return  the data
func (app *application) getDataById(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "Método no permitido", http.StatusMethodNotAllowed)
		return
	}

	// parsea la direccion  /api/datos/1
	url := strings.Split(r.URL.Path, "/")
	//fmt.Println("ID: ", url[3])
	// hace un get a la api para luego convertirla en una estrucctura
	resp, err := http.Get("http://localhost:3080/api/datos")

	if err != nil {
		fmt.Println("Error al obtener la respuesta de la API:", err)
		return
	}
	defer resp.Body.Close()

	// le la entrega  y la pasa los datos a una estrucctura
	body, err := ioutil.ReadAll(resp.Body)
	var Usuarios []entrega
	err = json.Unmarshal(body, &Usuarios)

	if err != nil {
		fmt.Println("Error al analizar el JSON:", err)
		return
	}

	id := url[3]
	num, _ := strconv.Atoi(id)

	for _, dato := range Usuarios {
		if dato.Id == num {
			fmt.Println(dato)
			json.NewEncoder(w).Encode(dato)
		}
	}
}

// Modificar los datos en la tabla
func (app *application) postData(w http.ResponseWriter, r *http.Request) {

	if r.Method != http.MethodPost {
		http.Error(w, "Metodo no permitido", http.StatusMethodNotAllowed)
		return
	}

	var nuevaEntrega entrega
	err := json.NewDecoder(r.Body).Decode(&nuevaEntrega)

	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	fmt.Println("Datos recibidos Con exito!!! ")
	fmt.Println(nuevaEntrega)

	// Coneccion a la base De datos

	//llamado a la base de datos
	dataBase, _ := db.ConnectPostgres()
	defer dataBase.Close()

	//comprueba si los datos fueron enviados a  la base de datos
	query := "SELECT id FROM persona WHERE id ='" + nuevaEntrega.Gmail + "'"

	var id int
	err = dataBase.QueryRow(query).Scan(&id)

	if err != nil {

		insertQuery := "INSERT INTO persona(name, age, gmail) VALUES($1, $2, $3)"
		_, err = dataBase.Exec(insertQuery, nuevaEntrega.Name, nuevaEntrega.Age, nuevaEntrega.Gmail)

		if err != nil {
			fmt.Println("Error ", err)
		} else {
			fmt.Println("la entrega Guardada con exito")
			fmt.Println(nuevaEntrega)
		}
	}
}

// para el metodo put y modificar los datos
func (app *application) putData(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPut {
		http.Error(w, "Metoodo no permitido", http.StatusMethodNotAllowed)
	}

	var nuevaEntrega entrega
	err := json.NewDecoder(r.Body).Decode(&nuevaEntrega)
	if err != nil {
		fmt.Println(err)
		return
	}

	// to see the data
	//--------------------------------------------------------------------------------
	fmt.Println("Datos Modificados!")
	fmt.Println(nuevaEntrega)

	// open the database and modifi the itemps
	dataBase, err := db.ConnectPostgres()
	if err != nil {
		fmt.Println("Error1", err)
	}

	defer dataBase.Close()

	// update the users to the database
	sentenciaPreparada, err := dataBase.Prepare("UPDATE persona SET name = $1, age = $2, gmail = $3 WHERE id = $4")

	if err != nil {
		fmt.Println("eror4", err)
	}
	var id1 int = nuevaEntrega.Id
	var name string = nuevaEntrega.Name
	var age int = nuevaEntrega.Age
	var gmail string = nuevaEntrega.Gmail

	_, err = sentenciaPreparada.Exec(name, age, gmail, id1)
	if err != nil {
		fmt.Println("Error2", err)
	}

	fmt.Println("Data Modified  successfully")
}

// for delete the users
func (app *application) deleteData(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodDelete {
		http.Error(w, "Metodo no permitido", http.StatusMethodNotAllowed)
	}

	path := r.URL.Path
	// dividir la ruta en segmentos separados por "/"
	segments := strings.Split(path, "/")
	// el numero se encuentra en el ultimo segmento
	numString := segments[len(segments)-1]

	id, err := strconv.Atoi(numString)

	dataBase, _ := db.ConnectPostgres()
	defer dataBase.Close()

	data, err := dataBase.Exec("DELETE FROM persona WHERE id=$1", id)

	if err != nil {
		fmt.Println("Error 2", err)
	}

	fmt.Println(data)

}

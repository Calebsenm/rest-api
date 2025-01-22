package store

import (
	"database/sql"
)

type Data struct {
	Id    int    `json:"id"`
	Name  string `json:"name"`
	Age   int    `json:"age"`
	Gmail string `json:"gmail"`
}

type DataModel struct {
	db *sql.DB
}

func (d *DataModel) Get() ([]Data, error) {

	var query string = `SELECT * FROM persona`

	data, err := d.db.Query(query)
	if err != nil {
		return nil, err
	}

	defer data.Close()

	var users []Data

	for data.Next() {
		var p Data
		err := data.Scan(
			&p.Id,
			&p.Name,
			&p.Age,
			&p.Gmail,
		)
		if err != nil {
			return nil, err
		}
		users = append(users, p)
	}

	return users, nil
}

func (d *DataModel) getById() {

}

func (d *DataModel) create() {

}

func (d *DataModel) update() {

}

func (d *DataModel) delet() {

}

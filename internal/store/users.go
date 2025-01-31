package store

import (
	"context"
	"database/sql"
)

type User struct {
	Id    int    `json:"id"`
	Name  string `json:"name"`
	Age   int    `json:"age"`
	Gmail string `json:"gmail"`
}

type UserStore struct {
	db *sql.DB
}

func (d *UserStore) Get() ([]User, error) {

	var query string = `SELECT * FROM persona`

	data, err := d.db.Query(query)
	if err != nil {
		return nil, err
	}

	defer data.Close()

	var users []User
	for data.Next() {
		var p User
		err := data.Scan(&p.Id, &p.Name, &p.Age, &p.Gmail)

		if err != nil {
			return nil, err
		}

		users = append(users, p)
	}

	return users, nil
}

func (d *UserStore) GetByID(ctx context.Context, userID int64) (*User, error) {
	return nil, nil
}

func (d *UserStore) Create(ctx context.Context, user *User) error {
	return nil
}

func (d *UserStore) Delete(ctx context.Context, userID int64) error {
	return nil
}

func (d *UserStore) Update(ctx context.Context, user *User) error {
	return nil
}

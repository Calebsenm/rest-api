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

func (d *UserStore) Get(ctx context.Context) ([]User, error) {
	ctx, cancel := context.WithTimeout(ctx, QueryTimeoutDuration)
	defer cancel()

	var query string = `SELECT * FROM persona`

	rows , err := d.db.Query(query)
	if err != nil {
		return nil, err
	}

	defer rows.Close()

	var users []User
	for rows.Next() {
		var p User
		err := rows.Scan(&p.Id, &p.Name, &p.Age, &p.Gmail)

		if err != nil {
			return nil, err
		}

		users = append(users, p)
	}

	return users, nil
}

func (d *UserStore) GetByID(ctx context.Context, userID int64) (*User, error) {
	
    ctx, cancel := context.WithTimeout(ctx, QueryTimeoutDuration)
	defer cancel()

    var query string = `
        SELECT id ,name , age, gmail 
        FROM persona
        WHERE id = $1
    `
    var user User 
   
    err := d.db.QueryRowContext(ctx , query , userID).Scan(
        &user.Id, 
        &user.Name,   
        &user.Age,
        &user.Gmail,
    )

    if err != nil   {
        return nil , err  
    } 

    return &user , nil
}

func (d *UserStore) Create(ctx context.Context, user *User) error {

    query := `
		INSERT INTO persona (name, age, gmail)
		VALUES ($1, $2, $3)
	`

	ctx, cancel := context.WithTimeout(ctx, QueryTimeoutDuration)
	defer cancel()

	_ , err := d.db.ExecContext(
		ctx,
		query,
		user.Name, 
        user.Age,
		user.Gmail,
	)

    if err != nil {
        return err  
    }	

	return nil

}

func (d *UserStore) Delete(ctx context.Context, userID int64) error {
	query := `DELETE FROM persona WHERE id = $1`

	ctx, cancel := context.WithTimeout(ctx, QueryTimeoutDuration)
	defer cancel()

	res, err := d.db.ExecContext(ctx, query, userID)
	if err != nil {
		return err
	}

	rows, err := res.RowsAffected()
	if err != nil {
		return err
	}

	if rows == 0 {
		return ErrNotFound
	}

	return nil

}

func (d *UserStore) Update(ctx context.Context, id int64 ,user *User) error {
	query := `
		UPDATE persona 
        SET name = $1 , age = $2, gmail =$3
		WHERE id=$4
	`

	ctx, cancel := context.WithTimeout(ctx, QueryTimeoutDuration)
	defer cancel()

    _ ,  err := d.db.ExecContext(
		ctx,
		query,
		user.Name, 
        user.Age,
		user.Gmail,
        id,
	)
    

    if err != nil {
        return err  
    }	

	return nil

}

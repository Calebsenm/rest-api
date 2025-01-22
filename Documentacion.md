
1 se usa docker compose por lo tanto para conectarse con la terminal puedes usar lo siguiente.

Nombre del contenedor :       postgres1
Nombre de la base de datos:   test
Usuaro                        caleb
Contraseña                    12345
puerto                        8080


Abre una terminal o línea de comandos en el directorio raíz de tu proyecto donde se encuentra el archivo docker-compose.yml.

Ejecuta el siguiente comando para iniciar los servicios definidos en el archivo docker-compose.yml:

Copy code
docker-compose up -d

Luego, para conectarse a la terminal del contenedor de PostgreSQL, puedes ejecutar el siguiente comando:

Copy code
sudo  docker exec -it postgres1 bash

luego
psql -U root -d rest_api

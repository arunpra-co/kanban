# A kanban app

A kanban app built using **vanilla JS** and **Django**.

### Tools required
- Docker

### Installation
1. Start docker container
	```docker
	>  docker-compose up --build
	```
2. Migrate your database and create superuser.
	a.  Open shell in django's container (new terminal)
	```docker
	>  docker exec -it django sh
	```
	b. Run migration scripts

	```python
	#  python manage.py makemigrations kanban
	#  python manage.py migrate
	#  python manage.py createsuperuser
	```
	c. Seed data into database. (still inside docker container)

	```python
	#  python manage.py loaddata seed.json
	```
3. Open Frontend on **localhost:3000**
4. Backend on **localhost:8000**



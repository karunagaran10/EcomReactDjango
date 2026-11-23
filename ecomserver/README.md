# E-commerce API

The registration endpoint saves accounts to the MySQL database configured in
`ecomserver/settings.py`. Set the MySQL connection values before starting
Django:

```powershell
$env:MYSQL_DATABASE = "ecom_db"
$env:MYSQL_USER = "root"
$env:MYSQL_PASSWORD = "<your MySQL password>"
$env:MYSQL_HOST = "localhost"
$env:MYSQL_PORT = "3306"
```

Create the database in MySQL if it does not already exist:

```sql
CREATE DATABASE ecom_db CHARACTER SET utf8mb4;
```

From the repository root, install the backend dependencies and run database
migrations:

```powershell
.\ecomenv\Scripts\Activate.ps1
python -m pip install -r .\ecomserver\requirements.txt
Set-Location .\ecomserver\ecomserver
python manage.py migrate
python manage.py runserver 127.0.0.1:8001
```

The React registration form posts to `http://127.0.0.1:8001/register/`.
Passwords are hashed by Django before they are stored.

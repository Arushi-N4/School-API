### 🏫 School API

This API allow users to add new schools and retrieve a list of schools sorted by proximity to a user-specified location.

📌 **Features**
- Add school with name, address, latitude, longitude.
- Get schools sorted by distance from user location.
- Input validation with Joi.
- Distance calculation using Haversine formula.


### Project Structure

```
schools-api/
│── src/
│   ├── app.js             # Express app setup
│   ├── routes/
│   │   └── schools.js     # Handling adding and viewing schools
│   ├── middleware/
│   │   └── validate.js
│   ├── validator/
│   │   └── school.js
│   └── db.js              # MySQL2 connection
```



## ⚙️ Setup Instructions

### Clone Repository

```bash
git clone https://github.com/Arushi-N4/School-API.git
cd School-API
```

### Install Dependencies

```bash
npm install
```

### Configure Database

Create a MySQL database:

```sql
CREATE DATABASE school_db;
```
Create a `school` table:

```sql
CREATE TABLE schools (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  latitude DECIMAL(10, 6) NOT NULL,
  longitude DECIMAL(10, 6) NOT NULL
);
```

Create `.env` file and add this

```
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your password
DB_NAME=school_db
DB_PORT=3306
```

### Run Server
```bash
npm run dev
```






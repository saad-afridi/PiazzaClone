# PiazzaClone

A Full Stack Application for a POC of a piazza-based bot. Made using the **FARM** Stack i.e. **F**ast**A**PI, **R**eact and **M**ongoDB.

### Technology and Tools

![](https://img.shields.io/badge/Database-MongoDB-informational?style=flat&logo=logo_name&logoColor=white&color=448ee4) ![](https://img.shields.io/badge/Backend-FastAPI-informational?style=flat&logo=logo_name&logoColor=white&color=448ee4) ![](https://img.shields.io/badge/Frontend-React-informational?style=flat&logo=logo_name&logoColor=white&color=448ee4)

### Setting Up (Windows)

```bash
# clone the repo
git clone https://github.com/saad-afridi/PiazzaClone
```

#### Backend

```bash
# Go into the backend
cd backend

# [OPTIONAL] Create and activate virtual environment
pip install virtualenv
virtualenv venv
venv\Scripts\activate.bat

# Downloading dependencies
pip install -r requirements.txt

# Setup your mongo database
echo MONGO_ATLAS_URI=mongodb+srv://... > .env

# Run the server
python main.py

# [OPTIONAL] Run sanity tests
python -m pytest
```

#### Frontend

```bash
# Go into frontend
cd frontend

# download dependencies
npm install

# Start the application
npm start
```

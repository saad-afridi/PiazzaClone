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

# Create and activate virtual environment (can SKIP)
pip install virtualenv
virtualenv venv
venv\Scripts\activate.bat

# Downloading dependencies
pip install -r requirements.txt

# Setup your mongo database
echo MONGO_ATLAS_URI=mongodb+srv://... > .env

# Run the server
python main.py
```

#### Frontend

```bash
# Go into frontend
cd frontend

# Start the application
npm start
```


# 4↴
    code block outside of a list

- Main list
#     8↴
        code block
# 4↴
    - sub list

#        12↴
            code block
#     8↴
        <!-- --> # can also be used to set highlighting <!-- language: lang-none -->
#        12↴
            second code block
#     8↴
        - sub<sup>2</sup> list

#            16↴
                code block
#        12↴
            - sub<sup>3</sup> list
#                20↴
                    code block
#     8↴
        <!-- -->
#        12↴
            up two list levels

# PiazzaClone

A Full Stack Application for a POC of a piazza-based bot. Made using the FARM Stack i.e.  FastAPI, React and MongoDB.

### Setting up the backend (Windows)

```bash
# Clone the repository
git clone https://github.com/saad-afridi/PiazzaClone

# Go into the backend
cd backend

# Create and activate virtual environment (can SKIP)
virtualenv <virtual environment name>
venv\Scripts\activate.bat

# Downloading dependencies
pip install -r requirements.txt

# Setup your mongo database
echo MONGO_ATLAS_URI=mongodb+srv://... > .env

# Run the server
python main.py
```

# PiazzaClone

A Full Stack Application for a POC of a piazza-based bot. Made using the FARM Stack i.e.  FastAPI, React and MongoDB.

### Setting up the backend (Local & Windows OS)

```bash
# Clone the repository
git clone https://github.com/saad-afridi/PiazzaClone

# Go into the backend
cd backend

# Create and activate virtual environment (can SKIP)
virtualenv <virtual environment name>
venv\Scripts\activate.bat

# After skipping the virtual environment setup/or not
pip install -r requirements.txt

# Setup your mongo database
echo MONGO_ATLAS_URI=mongodb+srv://... > .env

# Run the server
python main.py
```

# django-react-boilerplate
# Simmons 

## Getting Started
To get your environment set up for development, first install the necessary depdencies for the frontend and backend. In the frontend folder, run `yarn install` to install the required yarn packages. In the backend folder, run `pip install -r requirements.txt` to install the required Python packages (it is recommended, but not required, to use a virtual environment via `pipenv shell` or with Python's `venv` utilities). 

Once dependencies are installed, in one terminal call `yarn start` from the frontend directory and `python manage.py runserver` from the `backend` directory. Development uses the SQLite3 example database; production uses an entirely separate database, so do not worry about playing around with the development build. Do not push changes made to the development SQLite3 file unless required.

# Simmons DB
**A temporary deployed version of the DB can be found here: https://temp-sdb-2020.herokuapp.com/**
This project is an attempt to completely re-write, with all its existing
functionality, the database system and interface used in Simmons Hall at MIT. These
include, but are not limited to,
* Tracking the rooming status and history of residents
* Logging and managing packages delivered to residents
* Logging and managing items checked out by students
* Organizing directories of students, student groups, and student officers
* Managing the administrative staff assigned to various parts of the building (GRAs, HOH,
etc.)
* Managing and allowing the creation of mailing lists
* Managing and allowing the creation of polls and lotteries
* Managing and viewing the guest list of residents
* Creating, viewing, and managing House Government proposals
* Creating, presenting, and viewing the history of house meetings
* Creating, managing, viewing the history of, and joining social lounges
* Logging and managing financial balances for various groups within the dormitory (e.g. 
the main house account, lounge accounts, etc.)
* And much, much more...

This project has several goals, which are, in order of importance:
1. Implement every feature the old DB provides
2. Be extensively and clearly documented
3. Use modern, easy to learn and use languages and frameworks
4. Separate backend DB logic from client-facing HTML
5. Natively support mobile devices
6. Add, where appropriate and sensible, new features to the old DB that improves the 
user experience

Before attempting to make any changes to this project, **please read this, and the entirety of
`/docs` very carefully**.

## Requirements
The following programs are required to run and develop this project:
* Yarn version 1.21
* Python version 3.7 (or higher)
* Nodejs version 11.12
* Pip (for Python 3; tested with version 18)

Additionally, to fully test asynchronous functionality (such as sending emails for overdue items), 
your operating system should have some way to run Cron jobs.

## Frameworks and Useful Docs
This project uses React for the frontend website and Django for the backend server. Specifically,
the backend provides a REST API through much of the `Django REST Framework` Django package. 

Luckily, these frameworks are easy to learn and jump into with a working knowledge of Javascript,
Python, and web development. *If you do not have Javascript and Python knowledge, it is highly 
recommended that you first learn up to an intermediate level of those languages before attempting to understand
or make changes to this project*. 

If you are unfamiliar with React, read through the React docs and tutorials: 
https://reactjs.org/docs/getting-started.html
The Codecademy course on React is also pretty good: https://www.codecademy.com/learn/react-101

If you are unfamiliar with Django, work through the entirety of the "Writing your first Django app" 
tutorial on the Django website: https://docs.djangoproject.com/en/3.0/intro/tutorial01/

Lastly, the `Django REST Framework` documentation will be very helpful in understanding a lot of
the codebase: https://www.django-rest-framework.org/

## Getting Started
To get your environment set up for local development, perform for the following actions in the specified order
1. Navigate to the `frontend` directory.
2. Run `yarn install`. This installs the packages necessary for the frontend site.
3. Navigate to the root directory.
4. Optionally create a Python venv and activate it (recommended). To do this, run `python -m venv PATH_TO_YOUR_VENV`
 followed by `source PATH_TO_YOUR_VENV/bin/activate`. `PATH_TO_YOUR_VENV` can be anywhere on your machine; note that
 venv paths cannot contain spaces. Make sure the Python version in this venv satisfies the requirements above.
5. Run `pip install -r requirements.txt`. This installs the Python packages required for the backend server.
6. Run `python manage.py makemigrations` and then `python manage.py migrate --run-sync`. This initializes an empty sqlite3 
database. Run `python manage.py createsuperuser` and follow the instructions. This creates an account with the 
given username and password that can be used to log into the site with.
7. Run `python manage.py setadmin YOUR_USERNAME` where `YOUR_USERNAME` was the username you used in the previous 
step. This adds your account to the `Administrator` group on the DB.
8. Run `python manage.py initdb`. This does two things:
    1. Creates all the `Room` and `Section` objects needed for the DB. This data comes from `data/room_sections.csv`.
    2. Creates an account on the DB for every row (user) in `data/sample_user_csv.csv`. This is all dummy data.

Once you perform these actions, to get the development servers running you need to
1. Run `yarn start` from the `frontend` directory to get the frontend development server (React) started.
2. In a separate terminal, run `python manage.py runserver` from the root directory to get the backend server 
(Django) started.
3. Navigate to http://localhost:3000/ in your browser.

## Deploying to Heroku
Currently the DB is being hosted temporarily using Heroku's free tier. To deploy changes to Heroku, complete the following steps:
1. First make sure you have Heroku installed
2. Commit your changes
3. Run `git push heroku branch:master` and replace branch with your current local branch.

## TODOS
* Add ability to login with MIT Certificates. This should use the same middleware pipeline and work in
tandem with the regular username/password login.
* Figure out how to send emails.
* Add ability to set your display name (instead of the registered name).
* Add Guest List functionality.
* Add packages functionality.
* Figure out how to authenticate front desk. One way is to look at the request IP address. Another way
is to create a separate desk user that has to be logged in. Are there other ways though?
* Add mailing lists functionality.
* Add votes and polls functionality.
* Add lotteries functionality.
* Add desk movies database list functionality.
* Add library catalogue link.
* Create an About page.
* Create house meetings flow
    - Ability to register an upcoming meeting
    - Ability to submit proposals/other things
    - Ability to close an upcoming meeting from new proposals + send out email with schedule
        * Ability to arrange proposal + announcement order
    - Ability run house meeting
        * Display list, in the given order
        * Keep track + allow amendments, and ability to approve, reject, or table
        * Close house meeting
* Everything to do with lounges.
* Create a frontend and backend hierarchical authorization scheme.
* Figure out how to keep track of account balances.
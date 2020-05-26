To run commands for the backend navigate to EE-364D-Senior-Design/CONNECT_DJANGO/connectbackend.

Then start a virtual pip environment by running

```pipenv shell```

Then setup the environment by installing all the required packages

```pip install -r requirements.txt```

All commands for django use the manage.py script.

To run the server locally:

```python manage.py runserver```

To make a new admin account to login with on the front end

```python manage.py createsuperuser```

We use AWS Elastic Beanstalk to deploy our Django app 

To setup Elastic Beanstalk to a new AWS account use

```eb init```

To deploy the app use

```eb deploy```

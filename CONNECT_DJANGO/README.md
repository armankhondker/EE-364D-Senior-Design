# Intro
- The backend is divided up into smaller modules called Django apps which all work together to form the API.
- Each Django app is located in its own directory under the CONNECT_DJANGO directory
   - **models.py**: Contains the models with their fields that are used in MongoDB
   - **serializers.py**: Serializes the models to be used in the API
   - **api.py**: Automatically creates the CRUD functions for each model using the serializers
   - **url.py**: The URL endpoints for the API for each model
 - the matching algorithm can be found in **algorithm/matching_algorithm.py**
 - the settings for the entire app can be found in **connectbackend/settings.py**
 - **.ebextensions**: Holds the settings and configuration for deploying the entire application on AWS Elastic Beanstalk
   

# Commands

To run commands for the backend navigate to EE-364D-Senior-Design/CONNECT_DJANGO/connectbackend.

Then start a virtual pip environment by running

```pipenv shell```

Then setup the environment by installing all the required packages

```pip install -r requirements.txt```

### All commands for django use the manage.py script.

To run the server locally:

```python manage.py runserver```

To make a new admin account to login with on the front end

```python manage.py createsuperuser```

#### Migrations
Any changes to the models will have to be migrated to update the MongoDB database

To make migrations call

```python manage.py makemigrations```

Any changes to the models will automatically be detected

To migrate the recently made migrations call

```python manage.py migrate```

### Elastic Beanstalk

We use AWS Elastic Beanstalk to deploy our Django app 

To setup Elastic Beanstalk to a new AWS account use

```eb init```

To deploy the app use

```eb deploy```

**Note:** Any new packages added must be added to the requirements.txt file as well as the version before deployment. This can easily be done by
 ```pip freeze > requirements.txt```

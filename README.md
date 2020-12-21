# Habitat mapping toolkit - HabMapp
In a world facing multiple challenges, the need for a participatory and educated population is ever greater. [Citizen science](https://en.wikipedia.org/wiki/Citizen_science) is emerging as a general tool for helping to collect high-quality data in support of a vast array of scientific endeavours. But big amounts of data put a high strain on professionals collecting, analysing and distributing it. HabMapp attempts to build a bridge between the participatory citizens and professionals at collecting spatial data about protected habitats. The app was built as a prototype for Birdlife Slovenia.

## Tech Stack
- React
- Material UI
- Django
- Django REST framework
- Auth: JWT for DRF
- Server: Google Cloud

## Features
- users can search and filter the database for habitat plots
- authenticated users can draw new plots and add the pertaining information
- saved plots automatically get assigned the geographical centre of the plot, surface area, the regional position in Slovenia (based on a KML file)
- authenticated users can download ESRI shp data for each habitat plot

# Getting started
You can view a live demo over at https://habmapp.herokuapp.com/

To get the app running locally on windows:
- Clone this repo
- Set up a virtual environment: `py -m venv habitat-mapping-toolkit` 
- Install packages with pip: `pip install -r requirements.txt`
- Install additional packages with pipwin: 
```
pip install wheel
pip install pipwin

pipwin install numpy
pipwin install pandas
pipwin install shapely
pipwin install gdal
pipwin install fiona
pipwin install pyproj
pipwin install six
pipwin install rtree
pipwin install geopandas
```
- Add .env with the secret key based on .env_sample
- Run `npm install` in the habitat_app directory

If all went well you should be able to run `py manage.py runserver` in habitat_be directory and start the server.

# Habitat-mapping-toolkit
An app used for mapping different kinds of habitats. Primarily intended for NGO use.

# Getting started
You can view a live demo over at https://habmapp.oa.r.appspot.com/

To get the frontend running locally:
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

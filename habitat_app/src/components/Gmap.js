import { useEffect } from 'react';
import ReactGeoJSON from 'react-geojson';
import Container from '@material-ui/core/Container';
import CreatePlot from './CreatePlot';
import { Button } from '@material-ui/core';

const Gmap = () => {
    
    // When components unmounts set google api to null, so other maps can load afterwards
    useEffect(() => {
        return () => { window.google = null }
    }, [])

    return (
        <div>
            <div className="row">
                <div className="g-map-desk col-6">
                    <ReactGeoJSON
                    
                    onMapInitiated={(map) => console.log('Map initiated', map)}
                    onPolygonsDrawn={(polygons) => console.log('Available polygons', polygons)}
                    scriptLibraries="geometry"
                    existingArea={JSON.parse(localStorage.getItem('geojson'))}
                    onSave={(data) => localStorage.setItem('geojson', JSON.stringify(data))}
                    // mapStyles={mapStyles}
                    mapOptions={{
                        tilt: 0, 
                        mapTypeControl:true,
                        mapTypeControlOptions:{
                            mapTypeIds:['roadmap', 'hybrid'],
                        }
                    }}
                    // areaStyles={areaStyles}
                    zoom={8}
                    center={{ lat: 46.129282, lng: 14.923680 }}
                    />
                    <Button 
                        onClick={() => localStorage.removeItem('geojson')}
                        variant='outlined'
                    >
                        Delete all inputed data
                    </Button>
                </div>
                <div className="col-5">
                    <CreatePlot/>
                </div>
            </div>            
        </div>

    )
};

export default Gmap;

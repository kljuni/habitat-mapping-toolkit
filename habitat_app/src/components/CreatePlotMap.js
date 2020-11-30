import { useCallback, useEffect, useRef, useState } from 'react';
import ReactGeoJSON from './ReactGeoJSON';
import Container from '@material-ui/core/Container';
import CreatePlotForm from './CreatePlotForm';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router';

const CreatePlotMap = () => {
    
    // When components unmounts set google api to null, so other maps can load afterwards
    useEffect(() => {
        return () => { window.google = null }
    }, [])
    
    const [refresh, doRefresh] = useState(0);
    console.log(process.env)
    // const mapRef = useRef();
    // const onMapLoad = useCallback((map) => {
    //     mapRef.current = map;
    // }, [])
    const onPlotSave = useCallback(() => {
        doRefresh(refresh => refresh + 1);
    }, [])
    console.log(refresh)

    return (
        <div className="row">
            <div className="g-map-desk col-7">
            <ReactGeoJSON
            apiKey='AIzaSyChsbUBL7fU-k_fdIJPJUJmt0zvJpIy6U4'
            // onMapInitiated={onMapLoad}
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
                <CreatePlotForm onPlotSave={onPlotSave} />
            </div>
        </div>
    )
};

export default React.memo(CreatePlotMap);

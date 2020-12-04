import React, { useEffect, useState, useCallback, useRef } from 'react'
import { GoogleMap, InfoWindow, LoadScript, Marker } from '@react-google-maps/api';
import axiosInstance from "../AxiosApi";
import PlotModal from "./PlotModal";
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobileOnly,
  isTablet
} from "react-device-detect";

const containerStyle = {
    width: '100%',
    height: isMobileOnly ? '85vh' : window.innerWidth < 960 ? '40vh' :
    (window.innerHeight - 64),
  };
   
const center = {
    lat: 45.99745,
    lng: 15.0523,
};  
   
const SearchMap = ({ markers, loading, mapRef }) => {
    const [map, setMap] = useState(null)
    // const [markers, setMarkers] = useState([])
    // const [markersLoaded, setMarkersLoaded] = useState(false)
    const [selected, setSelected] = useState(null)
    const [open, setOpen] = useState(false);
    const [plotData, setPlotData] = useState([]);
   
    // const mapRef = useRef();

    const onLoad = useCallback(function callback(map) {
      // const bounds = new window.google.maps.LatLngBounds();
      // map.fitBounds(bounds);
      setMap(map)
      mapRef.current = map;
    }, [])

    const panTo = useCallback(({ lat, lng }) => {
      console.log('panin')
      mapRef.current.panTo({lat, lng});
      mapRef.current.setZoom(14);
    }, [])
   
    const onUnmount = useCallback(function callback(map) {
      setMap(null)
    }, [])

    const handleOpen = () => {
      setOpen(true)
      setSelected(null);
    };
  
    const handleClose = () => setOpen(false);

    const viewModal = (id) => {
      axiosInstance.get(`/api/plots/view/${id}`)
      .then((res) => {
        setPlotData(res.data);
        handleOpen();
      })
      .catch((err) => console.log(err))
    };

    return (
      <span>
        <LoadScript
          googleMapsApiKey='AIzaSyC4CY4vYUeTZNYtFcFnnE8gDy0lsXkstsg'
        >
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={8}
            onLoad={onLoad}
            onUnmount={onUnmount}
          >
            {
              !loading ? (markers.map(marker => (
              <Marker
                key={marker.id}
                position={{ lat: parseFloat(marker.lat), lng: parseFloat(marker.lng) }}
                onClick={() => {
                  setSelected(marker);
                }}
              />
              ))) 
              : null
            }
  
            {
              selected ? (<InfoWindow
                position={{ lat: parseFloat(selected.lat), lng: parseFloat(selected.lng) }}
                onCloseClick={() => setSelected(null)}
              >
                <div>
                  <Typography variant="h4" gutterBottom>
                    {selected.title}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {selected.size_ha} ha
                  </Typography>
                  <Typography className="pointer" onClick={() => viewModal(selected.id)} variant="button" display="block" gutterBottom>
                    <u>Get more data</u>
                  </Typography>
                </div>
              </InfoWindow>)
              : null
            }          
            <></>
          </GoogleMap>
        </LoadScript>
        {
            open ? (<PlotModal
              handleOpen={handleOpen}
              handleClose={handleClose}
              plotData={plotData}
            ></PlotModal>) 
            : null
        }
      </span>
    )
  }
   
  export default React.memo(SearchMap)
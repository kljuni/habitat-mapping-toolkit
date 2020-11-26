import React, { useEffect, useState, useCallback } from 'react'
import { GoogleMap, InfoWindow, LoadScript, Marker } from '@react-google-maps/api';
import axiosInstance from "../AxiosApi";
import PlotModal from "./PlotModal";

const containerStyle = {
    width: '100vw',
    height: '700px'
  };
   
const center = {
    lat: 45.99745,
    lng: 15.0523,
};  
   
const SearchMap = () => {
    const [map, setMap] = useState(null)
    const [markers, setMarkers] = useState([])
    const [markersLoaded, setMarkersLoaded] = useState(false)
    const [selected, setSelected] = useState(null)
    const [open, setOpen] = useState(false);
    const [plotData, setPlotData] = useState([]);

    useEffect(() => {
      axiosInstance.get('/plots/api/search/')
      .then((res) => {
        console.log(res);
        setMarkers(res.data);
        setMarkersLoaded(true);
      })
      .catch((err) => console.log(err))
    }, [])

    const onLoad = useCallback(function callback(map) {
      // const bounds = new window.google.maps.LatLngBounds();
      // map.fitBounds(bounds);
      setMap(map)
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
      axiosInstance.get(`/plots/api/view/${id}`)
      .then((res) => {
        console.log(res);
        setPlotData(res.data);
        handleOpen();
      })
      .catch((err) => console.log(err))
    };
   
    return (
      <div>
        <LoadScript
          
        >
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={8}
            onLoad={onLoad}
            onUnmount={onUnmount}
          >
            {
              markersLoaded ? (markers.map(marker => (
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
                  <h2>{selected.title}</h2>
                  <p><b>Size: {selected.size_ha} ha</b></p>
                  <u onClick={() => viewModal(selected.id)}>Get more data</u>
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
      </div>
    )
  }
   
  export default React.memo(SearchMap)
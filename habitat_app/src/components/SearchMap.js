import React, { useEffect, useState, useCallback, useRef } from 'react'
import { GoogleMap, InfoWindow, LoadScript, Marker } from '@react-google-maps/api';
import axiosInstance from "../AxiosApi";
import PlotModal from "./PlotModal";

const containerStyle = {
    width: '100%',
    height: '500px'
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
      axiosInstance.get(`/plots/api/view/${id}`)
      .then((res) => {
        setPlotData(res.data);
        handleOpen();
      })
      .catch((err) => console.log(err))
    };

    return (
      <div>
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
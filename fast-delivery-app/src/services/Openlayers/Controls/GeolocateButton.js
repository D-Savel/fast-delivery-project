import { useContext, useEffect } from "react";
import { Geolocate } from "ol/control";
import MapContext from "/home/savel/Alyra/fast-delivery-project/fast-delivery-app/src/context/MapContext";

const GeolocateButton = () => {
  const { map } = useContext(MapContext);
  useEffect(() => {
    if (!map) return;
    const geolocateButton = new Geolocate({
      bind: false,
      geolocationOptions: {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 7000
      }
    });
    map.controls.push(geolocateButton);
    return () => map.controls.remove(geolocateButton);
  }, [map]);
  return null;
};

export default GeolocateButton;
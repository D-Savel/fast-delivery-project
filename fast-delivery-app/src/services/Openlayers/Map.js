import React, { useRef, useState, useEffect } from "react";
import "./Map.css";
import MapContext from "context/MapContext.js";
import * as ol from "ol";

const Map = ({ children, zoom, center }) => {
  const mapRef = useRef();
  const [map, setMap] = useState(null);

  // on component mount

  useEffect(() => {
    const options = {
      view: new ol.View({ zoom, center }),
      layers: [],
      controls: [],
      overlays: []
    };
    const mapObject = new ol.Map(options);
    mapObject.setTarget(mapRef.current);
    setMap(mapObject);
    return () => mapObject.setTarget(undefined);
  }, [center, zoom]);
  // zoom change handler

  useEffect(() => {
    if (!map) return;
    map.getView().setZoom(zoom);
  }, [map, zoom]);
  // center change handler
  useEffect(() => {
    if (!map) return;
    map.getView().setCenter(center)
  }, [center, map])

  return (
    <MapContext.Provider value={{ map }}>
      <div ref={mapRef} className="ol-map">
        {children}
      </div>
    </MapContext.Provider>)
}

export default Map;

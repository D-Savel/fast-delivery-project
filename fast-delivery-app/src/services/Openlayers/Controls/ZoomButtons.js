import { useContext, useEffect } from "react";
import { Zoom } from "ol/control";
import MapContext from "context/MapContext.js";

const ZoomButtons = () => {
  const { map } = useContext(MapContext);
  useEffect(() => {
    if (!map) return;
    const zoomButtons = new Zoom({ zoomInTipLabel: 'Zoomer', zoomOutTipLabel: 'Dézoomer' });
    map.controls.push(zoomButtons);
    return () => map.controls.remove(zoomButtons);
  }, [map]);
  return null;
};

export default ZoomButtons;
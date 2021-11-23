import { useContext, useEffect } from "react";
import { ScaleLine } from "ol/control";
import MapContext from "/home/savel/Alyra/fast-delivery-project/fast-delivery-app/src/context/MapContext";

const ScaleLineControl = () => {
  const { map } = useContext(MapContext);
  useEffect(() => {
    if (!map) return;
    const scaleLineControl = new ScaleLine({});
    map.controls.push(scaleLineControl);
    return () => map.controls.remove(scaleLineControl);
  }, [map]);
  return null;
};

export default ScaleLineControl;
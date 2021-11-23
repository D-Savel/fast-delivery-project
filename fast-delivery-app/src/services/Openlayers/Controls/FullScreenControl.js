import { useContext, useEffect } from "react";
import { FullScreen } from "ol/control";
import MapContext from "/home/savel/Alyra/fast-delivery-project/fast-delivery-app/src/context/MapContext";

const FullScreenControl = () => {
  const { map } = useContext(MapContext);
  useEffect(() => {
    if (!map) return;
    const fullScreenControl = new FullScreen({});
    map.controls.push(fullScreenControl);
    return () => map.controls.remove(fullScreenControl);
  }, [map]);
  return null;
};

export default FullScreenControl;
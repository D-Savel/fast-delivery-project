import { useContext, useEffect } from "react";
import MapContext from "/home/savel/Alyra/fast-delivery-project/fast-delivery-app/src/context/MapContext";
import OLTileLayer from "ol/layer/Tile";

const TileLayer = ({ source, zIndex = 0 }) => {
  const { map } = useContext(MapContext);
  useEffect(() => {
    if (!map) return;
    const tileLayer = new OLTileLayer({ source, zIndex, });
    map.addLayer(tileLayer);
    tileLayer.setZIndex(zIndex);
    return () => { if (map) { map.removeLayer(tileLayer); } };
  }, [map]);
  return null;
};

export default TileLayer;
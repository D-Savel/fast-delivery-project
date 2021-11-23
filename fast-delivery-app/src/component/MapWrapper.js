import React, { useState } from 'react';
import {
  Box,
  Flex,
  Vstack,
} from '@chakra-ui/react'
import Map from "../services/Openlayers/Map";
import { Layers, TileLayer, VectorLayer } from "../services/Openlayers/Layers";
import { Controls, FullScreenControl, ZoomButtons, ScaleLineControl, GeolocateButton } from "../services/Openlayers/Controls";
import { styles } from "../services/Openlayers/Features/Styles";
import { osm, vector } from "../services/Openlayers/Source";
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';
import { fromLonLat, get } from 'ol/proj';
import GeoJSON from 'ol/format/GeoJSON';


const { Point, Polygon, MultiPolygon } = styles
const geojsonObject = {}; // see full geojson object in Githubconst
const geojsonObject2 = {}; // see full geojson object in Githubconst

const MapWrapper = () => {
  const [center, setCenter] = useState([2.34, 48.855]);
  const [zoom, setZoom] = useState(12);
  const [showLayer1, setShowLayer1] = useState(true);
  const [showLayer2, setShowLayer2] = useState(true);

  return (
    <Flex m="1" alignItems="center" justifyContent="center">
      <Box>
        <Map center={fromLonLat(center)} zoom={zoom}>
          <Layers>
            <TileLayer source={osm()} zIndex={0} />
            {showLayer1 && (
              <VectorLayer />)}
            {showLayer2 && (
              <VectorLayer />)}
          </Layers>
          <Controls>
            <FullScreenControl />
            <ZoomButtons />
            <ScaleLineControl />
            <GeolocateButton />
          </Controls>
        </Map>
        <div>
          <input type="checkbox" checked={showLayer1} onChange={event => setShowLayer1(event.target.checked)} />
          Johnson County
        </div>
        <div>
          <input type="checkbox" checked={showLayer2} onChange={event => setShowLayer2(event.target.checked)} />
          Wyandotte County
        </div>
      </Box>
    </Flex>
  );
}

export default MapWrapper

/*
set intial state
const [map, setMap] = useState()
const [featuresLayer, setFeaturesLayer] = useState()

pull refs
const mapElement = useRef()

create state ref that can be accessed in OpenLayers onclick callback function
 https://stackoverflow.com/a/60643670
const mapRef = useRef()
mapRef.current = map

initialize map on first render - logic formerly put into componentDidMount
useEffect(() => {
  map click handler
  const handleMapClick = (event) => {

    let lonlat = map.getLonLatFromViewPortPx(event.xy);
    alert("latitude : " + lonlat.lat + ", longitude : " + lonlat.lon);
  }

  if (deliveriesList.length > 0) {

    create and add vector source layer
    const initalFeaturesLayer = new VectorLayer({
      source: new VectorSource()
    })


    const features = [];

    for (let i = 1; i < deliveriesList.length; i++) {
      if (deliveriesList[i].deliveryStatus === "onLine")
        features.push(new Feature({
          geometry: new Point(fromLonLat([Number(deliveriesList[i].latRecipient), Number(deliveriesList[i].lonRecipient)]))
        }));
    }

    console.log(features, 'FEATURES')

    create the source and layer for random features
    const vectorSource = new VectorSource({
      features
    });
    const vectorLayer = new VectorLayer({
      source: vectorSource,
      style: new Style({
        image: new Circle({
          text: "1",
          radius: 6,
          fill: new Fill({ color: 'blue' })
        })
      })
    });


    create map
    const initialMap = new Map({
      target: mapElement.current,
      layers: [

        Google Maps Terrain
        new TileLayer({
          source: new XYZ({
            url:
              'https://server.arcgisonline.com/ArcGIS/rest/services/' +
              'World_Street_Map/MapServer/tile/{z}/{y}/{x}',
          })
        }),
        initalFeaturesLayer,
        vectorLayer
      ],
      view: new View({
        projection: 'EPSG:3857',
        center: fromLonLat([2.34, 48.855]),
        zoom: 12
      }),
      controls: []
    })

    set map onclick handler
    initialMap.on('click', handleMapClick)

    save map and vector layer references to state
    setMap(initialMap)
    setFeaturesLayer(initalFeaturesLayer)
  }


}, [deliveriesList, map])


update map if features prop changes - logic formerly put into componentDidUpdate
useEffect(() => {

  if (props.features.length) { // may be null on first render

    set features to map
    featuresLayer.setSource(
      new VectorSource({
        features: props.features // make sure features is an array
      })
    )

    fit map to feature extent (with 100px of padding)
    map.getView().fit(featuresLayer.getSource().getExtent(), {
      padding: [100, 100, 100, 100]
    })

  }

}, [featuresLayer, map, props.features])
*/

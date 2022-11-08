import mapboxgl from "mapbox-gl";
import { useEffect, useRef} from 'react';
import markerJson from "./restaurants.json";
import "./NewMap.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoiYW5odHJyIiwiYSI6ImNsOW9kbGtwazBnbTAzd281YXJ3ejhjcmsifQ.Et0LpdRG7mN6MB58p_52qQ";

const NewMap = () =>{
    const mapContainerRef = useRef(null);
    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: "mapbox://styles/anhtrr/cl9odtk6b001v15s1cq54igry",
            center: [-73.998017,40.731925],
            zoom: 15,
            pitch:45,
          });
        
        markerJson.results.data.map((feature) =>{ 
            const center1 = [feature.longitude.replace(/['"]+/g, ''), feature.latitude.replace(/['"]+/g, '')];
            console.log(center1);
            new mapboxgl.Marker().setLngLat(center1).addTo(map)
        }
        )

        map.addControl(new mapboxgl.NavigationControl(), "top-right");
        
        //return () => map.remove();
    }, []);
    return <div className="map-container" 
    style={{width: '100vw', height: '94vh'}}  
    ref={mapContainerRef} />;
};

export default NewMap;

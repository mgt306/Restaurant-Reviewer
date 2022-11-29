import mapboxgl from "mapbox-gl";
import { useEffect, useRef} from 'react';
import markerJson from "./restaurants.json";
import StarIcon from "@mui/icons-material/Star";
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
            new mapboxgl.Marker()
                .setLngLat(center1)
                .setPopup(
                    new mapboxgl.Popup({ offset: 25 })
                    .setHTML(
                        `<div className ="card">
                          <label>Place</label>
                          <h3 className ="place">${feature.name}</h3>
                          <label>Address</label>
                          <p className ="address">${feature.address}</p>
                          <label>Review</label>
                          <p>${feature.location_string}</p>
                        </div>`
                      )
                )
                .addTo(map)
        }
        )

        map.addControl(new mapboxgl.NavigationControl(), "top-right");
        
        //return () => map.remove();
    }, []);
    return <div className="map-container" ref={mapContainerRef}>
    </div>;
};

export default NewMap;

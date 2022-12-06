import mapboxgl from "mapbox-gl";
import { useEffect, useRef} from 'react';
import markerJson from "./newrestaurants.json";
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
        
        markerJson.results.map((feature) =>{ 
            const center1 = [feature.geometry.location.lng, feature.geometry.location.lat];
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
                          <p className ="address">${feature.vicinity}</p>
                          <label>Review</label>
                          <p>${feature.rating}</p>
                          <label>Number of reviews</label>
                          <p>${feature.user_ratings_total}</p>
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

/*Made with the help of https://www.telerik.com/blogs/how-to-implement-standard-search-using-react 
and https://www.digitalocean.com/community/tutorials/react-axios-react
in accordance with the requirements of the CS department at NYU */

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

export const SearchResults = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(false);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");
  const { slug } = useParams();
  useEffect(() => {
    const searchProduct = async () => {
      try {
        const { data } = await axios.get(`mongodb+srv://admin:restaurantreviewer@cluster0.y0tshry.mongodb.net/?retryWrites=true&w=majority/search?q=${query}`); setSearchResults(data.products);
        } catch (error) {
         setError(error.response?.data?.message);
         }
        };
         searchProduct();
       }, []);

  return (
    <div>
      {searchResults.map((searchResult) => (
        <div>
          key={searchResult.id}
          <p>{searchResult.name}</p>
        </div>
      ))}
    </div>
  )
}

export default SearchResults;
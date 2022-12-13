import { useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import { useState } from "react";
import '../Styles/Search.css'
import axios from "axios";
export default function Search() {
    const [searchResult, setSearchResult] = useState([]);
    const [key, setKey] = useState("");
    useEffect (() => {
        const search = async () => {
            try {
                if (!key.trim()) {
                    setSearchResult([]);
                    return;
                }
                const res = await axios.get("http://localhost:3001/rest")
            } catch (error) {
                console.log(error);   
            }
        }
        search();
    }, [])
    return (
        <form>
            <div className = "search-wrapper">
                <button className = "search-button"><BsSearch /> </button>
                <div classname = "form-group">
                    <input 
                    type="text" 
                    className = "form-control"
                    placeholder="Search for a restaurant"
                    value={key}
                    onChange={(e) => setKey(e.target.value)}
                    />
                </div>
            </div>
        </form>
    )
}
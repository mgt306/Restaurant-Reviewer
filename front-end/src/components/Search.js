//Made with the help of https://www.telerik.com/blogs/how-to-implement-standard-search-using-react in accordance with the requirements of the CS department at NYU

import React, { useState} from "react";
import { useNavigate } from "react-router-dom";
import { Input } from '@chakra-ui/react'

export const SearchInput = () => {

  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  return (
    <div>
        <InputGroup>
            <Input
            onChange={(e) => {
            setSearch(e.target.value)
            }}
            type="search"
            placeholder="Search restaurant"
            />
            <InputRightElement>
                <div>
                <button onClick={() => navigate(`/search?query=${search}`)} >Search</button>
                </div>
            </InputRightElement>
        </InputGroup>
    </div>
  )
}

export default SearchInput;
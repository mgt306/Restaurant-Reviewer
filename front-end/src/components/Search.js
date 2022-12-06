//Made with the help of https://www.telerik.com/blogs/how-to-implement-standard-search-using-react in accordance with the requirements of the CS department at NYU

import React, { useState} from "react";
import { useNavigate, createSearchParams } from "react-router-dom";
// import { Input, InputGroup, InputRightElement } from '@chakra-ui/react'

export const SearchInput = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const params = { query: search };
  const goToSearch = () =>
    navigate({
        pathname: '/search',
        search: `?${createSearchParams(params)}`,
    });

  return (
    <div>
        {/* <InputGroup> */}
            <input
            onChange={(e) => {
            setSearch(e.target.value)
            }}
            type="search"
            placeholder="Search restaurant"
            />
            {/* <InputRightElement> */}
                <div>
                <button onClick={goToSearch}>Search</button>
                </div>
            {/* </InputRightElement> */}
        {/* </InputGroup> */}
    </div>
  )
}

export default SearchInput;
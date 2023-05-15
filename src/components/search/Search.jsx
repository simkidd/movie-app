import React, { useContext, useState } from "react";
import Button from "../buttons/Button";
import { MovieContext } from "../../contexts/MovieContext";
import { useNavigate } from "react-router-dom";
import './search.scss';
import {BsSearch} from 'react-icons/bs'

const Search = () => {
    const {handleSearch} = useContext(MovieContext)
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      handleSearch(searchQuery);
      navigate(`/search?q=${searchQuery}`)
      setSearchQuery(""); // clear the input field after search
    }
  }

  return (
    <div className="search">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder='Search here...'
          value={searchQuery}
          onChange={handleInputChange}
        />
        <Button type="submit"> {<BsSearch size={14}/>} </Button>
      </form>
    </div>
  );
};

export default Search;

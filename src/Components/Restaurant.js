import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RestaurantCard from "./RestaurantCard";
import { filterData } from "./Constants";
import Shimmer from "./Shimmer";
import Nav from "./Navbar";
import Footer from "./Footer";

function Restaurant() {
  const [searchText, setSearchText] = useState("");
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    getRestaurants();
  }, []);

  //Res Details by diff url
  // const fetchapi = async () => {
  //   const data = await fetch(
  //     "https://www.swiggy.com/mapi/homepage/getCards?lat=18.4694714&lng=73.8290409"
  //   );
  //   const json = await data.json();
  //   console.log(json.data.success.cards[5].gridWidget.gridElements.infoWithStyle.restaurants);
  // };

  // useEffect(() => {
  //   fetchapi();
  // }, []);

  async function getRestaurants() {
    const data = await fetch(
      "https://corsproxy.io/?https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.5270362&lng=77.13593279999999&page_type=DESKTOP_WEB_LISTING"
      //https://corsproxy.io/?https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.5270362&lng=77.13593279999999&page_type=DESKTOP_WEB_LISTING
    );

    const json = await data.json();
    console.log(json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    setAllRestaurants(
      json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    setFilteredRestaurants(
      json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
  }

  const searchData = (searchText, restaurants) => {
    if (searchText !== "") {
      const data = filterData(searchText, restaurants);
      setFilteredRestaurants(data);
      setErrorMessage("");
      if (data.length === 0) {
        setErrorMessage(
          `Sorry, we couldn't find any results for "${searchText}"`
        );
      }
    } else {
      setErrorMessage("");
      setFilteredRestaurants(restaurants);
    }
  };

  function scrollWin() {
    window.scrollTo(0, 0);
  }
  if (!allRestaurants) return null;

  return (
    <>
      <Nav />
      <div className="search-container p-3 text-center w-full bg-orange-50 ">
        <input
          data-testid="search-input"
          type="text"
          className="focus:bg-blue-100 p-2 w-1/5 m-2"
          placeholder="Search Restaurants"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
            searchData(e.target.value, allRestaurants);
          }}
        />
        <button
          data-testid="search-btn"
          className="p-2 m-2 bg-orange-200 hover:bg-gray-100 hover:text-black text-white rounded-md"
          onClick={() => {
            // user click on button searchData function is called
            searchData(searchText, allRestaurants);
          }}
        >
          Search
        </button>
      </div>
      {errorMessage && <div className="error-container">{errorMessage}</div>}
      {allRestaurants?.length === 0 ? (
        <Shimmer />
      ) : (
        <div className="restaurant-list">
          {filteredRestaurants.map((restaurant) => {
            return (
              <Link
                onClick="scrollWin()"
                to={"/restaurant/" + restaurant.info.id}
                key={restaurant.info.id}
              >
                <RestaurantCard {...restaurant.info} />
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
}

export default Restaurant;

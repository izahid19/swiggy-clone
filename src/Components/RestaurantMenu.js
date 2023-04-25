import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { IMG_CDN_URL } from "./Constants";
import useRestaurant from "./useRestaurantMenu";
import { MenuShimmer } from "./Shimmer";
import Nav from "./Navbar";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem } from "./cartSlice";

const RestaurantMenu = () => {
  const { resId } = useParams();

  const restaurant = useRestaurant(resId);

  const restaurantInfo = restaurant?.cards[0]?.card?.card?.info;

  // console.log(restaurant)

  let result = [],
    uniqueFoodItems = [];
  const restaurantMenuInfo = restaurant?.cards; //[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards//[1]?.card.card.itemCards;

  // const menu = restaurant?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards.find(x => x.card.card.title=="Recommended")
  //   console.log(menu)

  const customFilter = (object, result) => {
    if (object.hasOwnProperty("itemCards")) result.push(object);

    for (var i = 0; i < Object.keys(object).length; i++) {
      if (typeof object[Object.keys(object)[i]] == "object") {
        customFilter(object[Object.keys(object)[i]], result);
      }
    }
  };
  const resMenu =
    restaurantMenuInfo?.length > 0 && customFilter(restaurantMenuInfo, result); //, "@type", "type.googleapis.com/swiggy.presentation.food.v2.Dish");
  if (result.length > 0) {
    const uniqueIds = [];
    let uniqueItems = [
      ...new Set(result.flatMap((f) => f.itemCards).map((p) => p.card.info)),
    ];
    uniqueFoodItems = uniqueItems?.filter((element) => {
      const isDuplicate = uniqueIds.includes(element.id);

      if (!isDuplicate) {
        uniqueIds.push(element.id);

        return true;
      }

      return false;
    });
  }

  const dispatch = useDispatch();
  const cartItems = useSelector((store) => store.cart.items);
  const addFoodItem = (item) => {
    dispatch(addItem(item));
  };

  const removeFoodItem = () => {
    dispatch(removeItem());
  };
  return (
    <div className="bg-orange-50">
      <Nav />
      {!restaurant ? (
        <MenuShimmer />
      ) : (
        <div className="grid justify-center m-auto max-w-[70%] p-4">
          <div className="grid lg:grid-cols-2 gap-12 border-dotted border-b-2 p-2 sm:grid-cols-none ">
            <div className="text-center">
              <h1 className="font-bold p-2">
                {restaurant?.cards[0]?.card?.card?.info?.name}
              </h1>
              <ul>
                <li className="p-2 font-small text-sm text-slate-500 font-sans">
                  {restaurant?.cards[0]?.card?.card?.info?.cuisines.join(", ")}
                </li>
                <li className="p-2 font-small text-sm text-slate-500 font-sans">
                  {restaurant?.cards[0]?.card?.card?.info?.areaName},{" "}
                  {
                    restaurant?.cards[0]?.card?.card?.info?.sla
                      ?.lastMileTravelString
                  }
                </li>
                <li className="p-2 font-small text-sm  font-sans text-green-700">
                  {restaurant?.cards[0]?.card?.card?.info?.avgRating} &#9733; ||
                  <span className="p-2  flexfont-bold  font-small text-sm text-slate-500 font-sans">
                    {restaurant?.cards[0]?.card?.card?.info?.totalRatingsString}
                  </span>
                </li>
              </ul>
            </div>

            <div className="restaurant-img rounded-lg md:w-[118] sm:w-[118] sm:h-full  sm:rounded-md ">
              <img
                src={
                  IMG_CDN_URL +
                  restaurant?.cards[0]?.card?.card?.info?.cloudinaryImageId
                }
                alt={restaurant?.cards[0]?.card?.card?.info?.name}
              />
            </div>
          </div>

          <div className="">
            <h1 className="font-bold border-b pt-2 pb-2 m-auto">Menu</h1>
            <ul>
              {uniqueFoodItems.length > 0 ? (
                Object.values(uniqueFoodItems).map((item, index) => {
                  if (index < 25) {
                    return (
                      <li
                        className="grid lg:grid-cols-8 justify-center p-2 gap-2 m-2 border-b sm:grid-cols-4"
                        key={index}
                      >
                        <>
                          <div className="lg:col-span-5">
                            <span className="font-bold">{item?.name}</span>
                            <br />
                            <span>
                              ₹ {(item?.price || item?.defaultPrice) / 100}
                            </span>
                            <br />
                            <span className="font-small mt-2 text-sm text-slate-500 font-sans hidden md:block">
                              {item?.description}
                            </span>
                          </div>
                          <div className="relative justify-self-end col-span-3">
                            {item?.imageId && (
                              <img
                                className="w-[118] rounded-md h-[96] object-cover"
                                src={IMG_CDN_URL + item?.imageId}
                                alt="item"
                              />
                            )}
                            <div className="text-center w-[118]  mt-1 border-2 rounded-md">
                              <button
                                className="text-gray-800 font-extrabold px-3"
                                onClick={() => {
                                  removeFoodItem();
                                }}
                              >
                                -
                              </button>
                              <button
                                className="text-green-800 font-bold px-2 m-1 text-sm border-x-2 align-middle"
                                disabled={true}
                              >
                                {
                                  cartItems.filter((f) => f.id === item.id)
                                    .length
                                }
                              </button>
                              <button
                                className="text-green-800 font-extrabold px-3"
                                onClick={() => {
                                  addFoodItem(item);
                                }}
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </>
                      </li>
                    );
                  }
                })
              ) : (
                <span>No restaurant menu items.</span>
              )}
            </ul>
          </div>

          {cartItems?.length > 0 && (
            <div className="flex justify-between fixed bottom-9 right-3 mb-12 mr-10">
              <span className="px-5 py-2 text-sm font-bold tracking-wide text-white rounded-full focus:outline-none"></span>
              <Link to="/cart">
                {" "}
                <button className="px-5 py-2 text-sm font-bold tracking-wide text-white bg-orange-500 rounded-full">
                  <i className="fa fa-shopping-cart"></i> Cart -{" "}
                  {cartItems.length}
                </button>{" "}
              </Link>
            </div>
          )}
        </div>
      )}

      <Footer />
    </div>
  );
};
export default RestaurantMenu;

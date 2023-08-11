import React from "react";
import { IMG_CDN_URL } from "./Constants";

const RestaurantCard = ({
  cloudinaryImageId,
  name,
  cuisines,
  areaName,
  sla,
  costForTwo,
  avgRating,
}) => {
  return (
    <div className="card w-56 p-2 mt-2 m-4 h-96 bg-purple-50 transition duration-500 ease-in-out hover:scale-105 hover:shadow-slate-400">
      <img src={IMG_CDN_URL + cloudinaryImageId} />
      <h3 className="font-bold text-lg">{name}</h3>
      <h5>{cuisines.join(", ")}</h5>
      <h3>{areaName}</h3>
      <span>
        <h4> &#9733; {avgRating}</h4>
        <h4>• {sla.slaString}</h4>
        <h4>• {costForTwo}</h4>
      </span>
    </div>
  );
};
export default RestaurantCard;

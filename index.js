import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./src/App";
import RestaurantMenu from "./src/Components/RestaurantMenu";
import Cart from "./src/Components/Cart";
import About from "./src/Components/About";
import store from "./src/Components/Store";
import { Provider } from "react-redux";
import Contact from "./src/Components/Contact";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/restaurant/:resId" element={<RestaurantMenu />} />
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);

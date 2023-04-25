import { React, useEffect, useState } from "react";
import Nav from "./Navbar";
import { useSelector, useDispatch } from "react-redux";
import { IMG_CDN_URL } from "./Constants";
import { clearCart } from "./cartSlice";
import Modal from "./Modal";
import Footer from "./Footer";

function Cart() {
  const cartItems = useSelector((store) => store.cart.items);
  // console.log(cartItems);

  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [openInfoModal, setOpenInfoModal] = useState(false);
  // const [cart, setCart] = useState([]);

  // useEffect(() => {
  //   setCart(JSON.parse(localStorage.getItem("foodItems")));
  // }, []);

  // console.log("as", cart);

  let uniqueFoodItems = [];
  if (cartItems.length > 0) {
    let uniqueItems = [...new Set(cartItems)];
    uniqueFoodItems = uniqueItems.map((value) => [
      value,
      cartItems.filter((str) => str === value).length,
    ]);
  }
  const total =
    cartItems.length > 0
      ? cartItems
          .map((x) => (x.price > 0 ? x.price / 100 : x.defaultPrice / 100))
          .reduce((sum, a) => sum + a, 0)
      : 0;

  const final = total + 49 + 29;

  const handleClearCart = () => {
    dispatch(clearCart());
    localStorage.clear();
  };
  const placeOrder = () => {
    dispatch(clearCart());
    setOpenModal(true);
  };

  return (
  <>
    <div className="bg-orange-50">
      <Nav />
      {cartItems?.length > 0 && (
        <div className="mt-4 text-center text-lg font-bold">
          <h3 className="fw-bolder">Cart Items- {cartItems.length}</h3>
        </div>
      )}

      {cartItems?.length == 0 && (
        <div className="mt-4 text-center">
          <h1 className="font-bold text-2xl">Cart Empty</h1>
          <h2 className="mt-2 font-semibold text-2xl">
            You can go to{" "}
            <a href="/" className="font-bold">
              Home Page
            </a>{" "}
            to view more restaurants.
          </h2>
        </div>
      )}
      <div className="restaurant-menu-content">
        <div className="menu-items-container">
          <div className="menu-items-list">
            {Object.values(uniqueFoodItems).map((item, index) => {
              return (
                <div>
                  <li type="none" key={index}>
                    <div className="menu-item">
                      <div className="menu-item-details">
                        <h3 className="item-title">
                          {item[0].name} - [{item[1]}]
                        </h3>
                        <p className="item-cost">
                          ₹ {(item[0]?.price || item[0]?.defaultPrice) / 100}
                        </p>
                        <p className="item-desc hidden md:block ">
                          {item[0]?.description}
                        </p>
                      </div>
                      <div className="menu-img-wrapper">
                        {item[0]?.imageId && (
                          <img
                            className="w-[118] rounded-md h-[96] object-cover"
                            src={IMG_CDN_URL + item[0]?.imageId}
                            alt="item"
                          />
                        )}
                      </div>
                    </div>
                  </li>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {cartItems.length > 0 ? (
        <>
          {" "}
          <div className="restaurant-menu-content">
            <div className="price-items-container">
              <div className=" ">
                <h1 className="text-center font-semibold ">Price Breakup</h1>
                <hr />
                <div className="">
                  <div className="items-start text-start mt-2 mb-2 ">
                    <div className="">
                      <label>Item Total </label>
                      {`₹${total}`}
                    </div>
                    <label>Taxes ₹49</label>
                    <div>
                      <label>Delivery Charges ₹29</label>
                    </div>
                  </div>
                  <hr />
                  <div className="font-bold mt-2">Total Amount :- ₹{final}</div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        [null]
      )}

      {cartItems?.length > 0 && (
        <div className=" flex flex-wrap justify-center ">
          <button
            className="m-3 p-3  text-white font-medium border justify-self-center rounded-lg hover:text-slate-50 hover:bg-orange-700 bg-orange-500"
            onClick={() => {
              placeOrder();
            }}
            disabled={!cartItems.length}
          >
            Place Order
          </button>
          <button
            className="m-3 p-3 text-white font-medium justify-self-center hover:text-slate-50 hover:bg-red-700 bg-red-500 rounded-lg"
            onClick={() => {
              handleClearCart();
            }}
            disabled={!cartItems.length}
          >
            Clear Cart
          </button>
          
        </div>
      )}
      {openModal && <Modal closeModal={setOpenModal} />}
      <Footer />
    </div>
  </>
  );
}

export default Cart;

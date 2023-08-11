import Logo from "../assets/img/swiggy.svg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Navbar() {
  const cartItems = useSelector((store) => store.cart.items);
  // console.log(cartItems);
  return (
    <div>
      <div className="flex justify-between bg-orange-200">
        <Link to="/">
          {" "}
          <img className="h-16 w-full m-2 mx-3 navlogo" src={Logo} alt="logo" />
        </Link>
        <div className="mt-6 mr-4 items-center">
          <ul className="flex space-x-4 p-2">
            <Link to="/">
              <li>Home</li>
            </Link>
            <Link to="/about">
              <li>About</li>
            </Link>
            <Link to="/contact">
              <li>Contact Us</li>
            </Link>
          </ul>
        </div>
        <div className="mt-6 mr-4 items-center">
          <ul className="flex space-x-4 p-2">
            <Link to="/cart">
              <li>
                <i className="fa fa-shopping-cart"></i> Cart -{" "}
                {cartItems.length}
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;

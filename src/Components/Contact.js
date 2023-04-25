import { React, useRef } from "react";
import Nav from "./Navbar.js";
import Footer from "./Footer";
import { useState, useEffect } from "react";

function Contact() {
  const [message, setMessage] = useState({});
  const [email, setEmail] = useState({});
  const [name, setName] = useState({});
  const messageInputRef = useRef();
  const emailInputRef = useRef();
  const nameInputRef = useRef();

  function submitHandler(e) {
    e.preventDefault();

    const setMessage = messageInputRef.current.value;
    const setEmail = emailInputRef.current.value;
    const setName = nameInputRef.current.value;

    const Data = {
      name: setName,
      email: setEmail,
      message: setMessage,
    };

    //Post Tweets
    fetch(
      "https://hunger-wheel-default-rtdb.firebaseio.com/data.json",
      {
        method: "POST",
        body: JSON.stringify(Data),
      },
      alert("success")
    ).then(() => {
      e.target.reset();
    });
  }

  return (
    <>
      <Nav />

      <div>
        <form
          className="text-gray-700 body-font relative"
          onSubmit={submitHandler}
        >
          <div className="container px-5 py-10 mx-auto">
            <div className="flex flex-col text-center w-full mb-12">
              <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
                Contact Us
              </h1>
              <h2 className="sm:text-3xl text-2xl">
                We'd love to hear feedback from you
              </h2>
            </div>
            <div className="lg:w-1/2 md:w-2/3 mx-auto">
              <div className="flex flex-wrap -m-2">
                <div className="p-2 w-1/2">
                  <div className="relative">
                    <label
                      for="name"
                      className="leading-7 text-sm text-gray-600"
                    >
                      Name
                    </label>
                    <input
                      ref={nameInputRef}
                      type="text"
                      id="name"
                      required
                      name="name"
                      className="w-full bg-gray-100 rounded border border-gray-300 focus:border-orange-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>
                </div>
                <div className="p-2 w-1/2">
                  <div className="relative">
                    <label
                      for="email"
                      className="leading-7 text-sm text-gray-600"
                    >
                      Email
                    </label>
                    <input
                      required
                      ref={emailInputRef}
                      type="email"
                      id="email"
                      name="email"
                      className="w-full bg-gray-100 rounded border border-gray-300 focus:border-orange-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>
                </div>
                <div className="p-2 w-full">
                  <div className="relative">
                    <label
                      for="message"
                      className="leading-7 text-sm text-gray-600"
                    >
                      Message
                    </label>
                    <textarea
                      required
                      ref={messageInputRef}
                      id="message"
                      name="message"
                      className="w-full bg-gray-100 rounded border border-gray-300 focus:border-orange-500 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                    ></textarea>
                  </div>
                </div>
                <div className="p-2 w-full">
                  <button
                    type="submit"
                    className="flex mx-auto text-white bg-orange-500 border-0 py-2 px-6 focus:outline-none hover:bg-orange-600 rounded-lg text-lg"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>

      <Footer />
    </>
  );
}
export default Contact;

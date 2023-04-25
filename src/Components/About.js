import React from "react";
import Nav from "./Navbar";
import Footer from "./Footer";

function About() {
  return (
    <div>
      <Nav />
      <div className="grid p-2 m-2">
        <span className="mt-2">
          <b>App description:</b> This is a food ordering app created as single
          page app using React. <br />
          Below are few details and features :-
          <ul className="list-disc mx-8 list-inside">
            <li>
              I used Parcel.js as bundler.{" "}
              <a
                className="underline"
                href={"https://parceljs.org/"}
                target={"_blank"}
              >
                Link to docs.
              </a>
            </li>
            <li>
              The app was created with the idea of implementing major concepts
              inside React like functional and class components, inbuilt hooks
              and custom hooks.
            </li>
            <li>
              Used inbuilt hooks like <b>useState</b>, <b>useEffect</b>,{" "}
              <b>useContext</b>.
            </li>
            <li>
              Used<b> Swiggy's Public API</b> for fetching Restaurant List and
              Menu.
            </li>
            <li>
              Used <b>Firebase</b> to get Realtime Data from Contact page.
            </li>
            <li>
              Created custom hooks like:
              <ul className="list-disc mx-8 list-inside">
                <li>
                  <b>useRestaurantMenu</b> (Used to get list of menu items of a
                  selected restaurant)
                </li>
              </ul>
            </li>
            <li>
              Loading components on demand using different <b>chunks</b> to make
              app <b>performant</b>.
            </li>
            <li>
              Used <b>Shimmer</b> component to make UI more good.
            </li>
            <li>
              Used <b>Tailwind CSS</b> for designing UI.{" "}
              <a
                className="underline"
                href={"https://tailwindcss.com/"}
                target={"_blank"}
              >
                Link to docs.
              </a>
            </li>
            <li>
              Used <b>React Router</b> for routing.{" "}
              <a
                className="underline"
                href={"https://reactrouter.com/en/main"}
                target={"_blank"}
              >
                Link to docs.
              </a>
            </li>
            <li>
              Used <b>Redux Toolkit</b> for state management.{" "}
              <a
                className="underline"
                href={"https://redux-toolkit.js.org/"}
                target={"_blank"}
              >
                Link to docs.
              </a>
            </li>
          </ul>
        </span>
      </div>
      <Footer />
    </div>
  );
}

export default About;

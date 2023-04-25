import { Link } from "react-router-dom";

const Modal = ({ closeModal, info, title }) => {
  return (
    <>
      <div className="fixed top-0 bg-gray-900 bg-opacity-40 left-0 right-0 z-[1055] h-full w-auto overflow-y-hidden overflow-x-hidden outline-none  ">
        <div className="pointer-events-none absolute right-7 h-auto w-full translate-x-[100%] transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:max-w-[500px] transform-none opacity-100 p-4 m-4">
          <div className="min-[576px]:shadow-[0_0.5rem_1rem_rgba(#000, 0.15)] pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none p-2">
            <div className="p-2 font-bold border-b text-black">
              Order Confirmation: We have received your order
            </div>
            <div className="p-2 border-b">
              {" "}
              <p>
                Order Placed successfully! <br />
                Thank you for ordering from Swiggy{" "}
                <span className="text-lg">&#128588;</span>
              </p>
            </div>
            <div>
              <Link to="/">
                <button
                  href="/"
                  className="px-4 py-2 mt-2 font-semibold text-sm bg-orange-200 text-black rounded-full shadow-sm float-right"
                  onClick={() => closeModal(false)}
                >
                  Close
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Modal;

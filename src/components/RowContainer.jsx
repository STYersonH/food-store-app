import React from "react";
import { MdShoppingBasket } from "react-icons/md";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useRef } from "react";
import NotFound from "../img/NotFound.svg";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import { useState } from "react";

const RowContainer = ({ flag, data, scrollValue }) => {
  console.log(data);
  const rowContainer = useRef();

  const [items, setItems] = useState(
    //evitar que al recargar la pagina se reinicie el carrito de compras
    JSON.parse(localStorage.getItem("cartItems")) || []
  );

  const [{ cartItems }, dispatch] = useStateValue();

  const addToCart = () => {
    dispatch({
      type: actionType.SET_CARTITEMS,
      cartItems: items,
    });
    // de por si los datos no se guardan y al reiniciar se pierde info de que se selecciono
    // por lo que se tiene que almacenar en el local storage
    localStorage.setItem("cartItems", JSON.stringify(items));
  };

  useEffect(() => {
    console.log("pasa por este use Effect");
    addToCart();
  }, [items]);

  useEffect(() => {
    rowContainer.current.scrollLeft += scrollValue;
  }, [scrollValue]);

  return (
    <div
      ref={rowContainer}
      className={`w-full my-12 flex gap-3 items-center scroll-smooth ${
        flag
          ? "overflow-x-scroll scrollbar-none" // scrollbar-none : ocultar barra
          : "overflow-x-hidden flex-wrap justify-center"
      }`}
    >
      {data && data.length > 0 ? (
        data.map((item) => (
          <div
            key={item?.id}
            className="w-275 h-[175px] min-w-[275px] md:min-w-[300px] md:w-300 my-12 bg-cardOverlay rounded-lg px-2 py-2 backdrop-blur-lg hover:drop-shadow-lg hover:bg-gray-200 flex flex-col items-center justify-between"
          >
            <div
              key={item.id}
              className="w-full flex items-center justify-between"
            >
              {/* al usar un div sobre el img controlamos que todas las imagenes tengan el mismo tamanio y que no haya algunas que sean grandes */}
              <motion.div
                whileHover={{ scale: 1.2 }}
                className="w-40 h-40 -mt-8 drop-shadow-2xl"
              >
                <img
                  src={item.imageURL}
                  alt=""
                  //object-contain encajar en el espacio de su contenedor sin deformarlo
                  className="w-full h-full object-contain"
                />
              </motion.div>

              <motion.div
                whileTap={{ scale: 0.75 }}
                className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center cursor-pointer hover:shadow-md -mt-8"
                onClick={() => setItems([...cartItems, item])} //addToCart}
              >
                <MdShoppingBasket className="text-white" />
              </motion.div>
            </div>

            <div className=" w-full flex flex-col items-end justify-end -mt-11">
              <p className=" text-textColor font-semibold text-base md:text-lg">
                {item?.title}
              </p>
              <p className=" mt-1 text-sm text-gray-500">
                {item?.calories} calories
              </p>
              <div className="flex items-center gap-8">
                <p className="text-lg text-headingColor font-semibold">
                  <span className="text-sm text-red-500 ">$</span>
                  {item?.price}
                </p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className=" w-full flex flex-col items-center justify-center">
          <img src={NotFound} className="h-340" />
          <p className="text-xl text-headingColor font-semibold py-5">
            Items Not Available
          </p>
        </div>
      )}
    </div>
  );
};

export default RowContainer;

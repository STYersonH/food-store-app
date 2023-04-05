import React from "react";
import Delivery from "../img/delivery.png";
import HomeContainer from "./HomeContainer";
import { motion } from "framer-motion";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import RowContainer from "./RowContainer";
import { useStateValue } from "../context/StateProvider";
import { useRef, useState, useEffect } from "react";
import MenuContainer from "./MenuContainer";
import CartContainer from "./CartContainer";

const MainContainer = () => {
  //obtenemos la informacion de los datos
  const [{ foodItems, cartShow }, dispatch] = useStateValue();

  //const rowContainerRef = useRef(); //ya no se uso al final
  /*const scroll = (scrollOffset) => {
    rowContainerRef.current.scrollLeft += scrollOffset;
  };*/

  const [scrollValue, setScrollValue] = useState(0);

  useEffect(() => {}, [scrollValue]);

  return (
    <div className=" w-full h-auto flex flex-col items-center justify-center">
      <HomeContainer />

      <section className=" w-full  my-6">
        <div className=" w-full flex items-center justify-between">
          <p className="text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-32 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100">
            Our fresh & healthy fruits
          </p>
          <div className="hidden md:flex gap-3 items-center ">
            <motion.div
              whileTap={{ scale: 0.75 }}
              className=" w-8 h-8 rounded-lg bg-orange-300 hover:bg-orange-500 cursor-pointer transition-all hover:shadow-lg flex items-center justify-center"
              onClick={() => setScrollValue(-200)} //{() => scroll(-200)}
            >
              <MdChevronLeft className=" text-lg text-white" />
            </motion.div>
            <motion.div
              whileTap={{ scale: 0.75 }}
              className=" w-8 h-8 rounded-lg bg-orange-300 hover:bg-orange-500 cursor-pointer transition-all hover:shadow-lg flex items-center justify-center"
              onClick={() => setScrollValue(200)} //{() => scroll(200)}
            >
              <MdChevronRight className=" text-lg text-white" />
            </motion.div>
          </div>
        </div>
        <RowContainer
          scrollValue={scrollValue} //ref={rowContainerRef}
          flag={true}
          data={foodItems?.filter((n) => n.category === "fruits")}
        />
      </section>

      {/* menu section */}
      <MenuContainer />

      {/* carta de productos como carrito */}
      {cartShow && <CartContainer />}
    </div>
  );
};

export default MainContainer;

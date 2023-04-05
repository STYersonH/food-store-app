import React from "react";
import Delivery from "../img/delivery.png";
import HeroBg from "../img/heroBg.png";
import I1 from "../img/i1.png";
import { heroData } from "../utils/data";
import { motion } from "framer-motion";

const HomeContainer = () => {
  return (
    <section
      className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full "
      id="home"
    >
      {/* para probar que espacio abarcaban los div se uso p-4 bg-yellow-400 */}
      <div className=" py-2 flex-1 flex flex-col items-start  justify-center gap-6">
        <div className="flex items-center gap-2 justify-center bg-yellow-100 px-4 py-1 rounded-full">
          <p className="text-base text-yellow-600 font-semibold">
            Bike Delivery
          </p>
          <div className="w-6 h-6 bg-white rounded-full overflow-hidden drop-shadow-xl">
            <img
              src={Delivery}
              className="w-full h-full object-contain"
              alt="delivery"
            />
          </div>
        </div>

        {/* tracking-wide -> espacio entre letras */}
        <p className="text-[2.5rem] lg:text-[4.5rem] font-bold tracking-wide text-headingColor">
          The Fastest Delivery in{" "}
          <span className=" text-yellow-600">Your city</span>{" "}
        </p>

        <p className="text-base text-textColor text-center md:text-left md:w-[80%]">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Impedit a
          praesentium voluptatem, ad tempora voluptates saepe, soluta rem vel
          explicabo tempore debitis officia repellat, asperiores distinctio
          beatae fuga ipsam! Tempore!
        </p>

        <button
          type="button"
          className=" bg-gradient-to-br from-yellow-400 to-yellow-500 w-full md:w-auto px-4 py-2 rounded-lg hover:shadow-lg transition-all ease-in-out duration-100"
        >
          Order now
        </button>
      </div>

      <div className=" py-10 flex-1 flex items-center relative">
        <img
          src={HeroBg}
          alt="hero-bg"
          className="ml-auto h-[420px] w-full lg:w-auto lg:h-[650px]"
        />
        <div className=" w-full h-full absolute top-0 left-0 flex items-center justify-center lg:px-32 py-14 gap-5 flex-wrap">
          {heroData &&
            heroData.map((n) => (
              <motion.div
                whileHover={{ scale: 1.06 }}
                key={n.id}
                className=" lg:w-190 p-4 bg-cardOverlay backdrop-blur-md rounded-3xl flex flex-col items-center justify-center drop-shadow-lg"
              >
                <img
                  src={n.imgageSrc}
                  alt="I1"
                  className="w-20 lg:w-40 -mt-10 lg:-mt-20"
                />
                <p className="text-base lg:text-xl font-semibold text-textColor mt-2 lg:mt-4">
                  {n.name}
                </p>

                <p className="text-[12px] lg:text-sm text-lighttextGray text-center my-1 lg:my-3">
                  {n.desc}
                </p>

                <p className="text-sm font-semibold">
                  <span className="text-xs text-red-600">$</span>
                  {n.price}
                </p>
              </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default HomeContainer;

import React from "react";
import { MdShoppingBasket, MdAdd, MdLogout } from "react-icons/md";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../firebase";

import Logo from "../img/logo.png";
import Avatar from "../img/avatar.png";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import { useState } from "react";

function Header() {
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();

  // {user} es un objeto y dispatch es una funcion
  const [{ user, cartShow, cartItems }, dispatch] = useStateValue();

  // para mostrar el menu que se despliega al tocar el incono de usuario
  const [isMenu, setIsMenu] = useState(false);

  const login = async () => {
    if (!user) {
      const {
        user: { refreshToken, providerData },
      } = await signInWithPopup(firebaseAuth, provider);
      dispatch({
        type: actionType.SET_USER,
        user: providerData[0], // alli esta la informacion que nos interesa
      });
      // se almacenara el primer elemento de providerData convertido en cadena en el almacenamiento local del navegador
      localStorage.setItem("user", JSON.stringify(providerData[0]));
    } else {
      // de esta manera aparecera el menu
      setIsMenu(!isMenu);
    }
  };

  const logout = () => {
    setIsMenu(false);
    localStorage.clear();

    dispatch({
      type: actionType.SET_USER,
      user: null, //anulamos al usuario que se tenia antes
    });
  };

  const showCart = () => {
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: !cartShow,
    });
  };

  return (
    // Header al ser fixed, los estilos de su contenedor padre no se le aplican
    <header className="w-screen fixed z-50 p-3 px-4 md:p-6 md:px-16 bg-primary">
      {/* desktop & tablet*/}
      <div className="hidden md:flex w-full h-full items-center justify-between">
        <Link
          to={"/"}
          className="flex items-center gap-2"
          onClick={() => {
            setIsMenu(false);
          }}
        >
          <img className="w-10 object-cover" src={Logo} alt="logo" />
          <p className=" text-headingColor text-xl font-bold">City</p>
        </Link>

        <div className="flex items-center gap-8">
          {/* ml-auto : mover los items a la derecha */}
          <motion.ul
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}
            className="flex items-center gap-8 "
          >
            <li className="liElement">Home</li>
            <li className="liElement">Menu</li>
            <li className="liElement">About us</li>
            <li className="liElement">Service</li>
          </motion.ul>

          <div
            className="relative flex items-center justify-center"
            onClick={showCart}
          >
            <MdShoppingBasket className="text-textColor text-2xl ml-8 cursor-pointer " />
            {/* mostrar la cantidad de items en el carrito */}
            {cartItems && cartItems.length > 0 && (
              <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
                <p className="text-xs text-white font-semibold">
                  {cartItems.length}
                </p>
              </div>
            )}
          </div>

          <div className=" relative">
            {/*user && console.log("user ", user, "user.photoURL: ", user.photoURL)*/}
            {/*  ver si eran lo mismo : user && "https://lh3.googleusercontent.com/a/AGNmyxbOF-0PXHDnN-jIC86PQotxjbLRk36IyfFrp2nJ=s96-c" === user.photoURL ? console.log("son iguales") : console.log("no lo son") */}
            {/* no funcionaba shadow-2xl asi que usamos drop-shadow-xl */}

            <motion.img
              whileTap={{ scale: 0.6 }} // efecto de click
              src={user ? user.photoURL : Avatar}
              className="w-10 h-10 min-w-[40px] min-h-[40px] drop-shadow-xl cursor-pointer rounded-full"
              alt="userPicture"
              onClick={login}
            />

            {isMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className=" w-[10rem] bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-12 right-2"
              >
                {
                  // restringir el acceso solo para el usuario creador
                  user && user.email === "yersonjugador27@gmail.com" && (
                    <Link to={"/createItem"}>
                      <p
                        className=" px-4 py-2 flex items-center justify-between gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base"
                        onClick={() => {
                          setIsMenu(false);
                        }}
                      >
                        New Item <MdAdd />{" "}
                      </p>
                    </Link>
                  )
                }
                <p
                  className=" px-4 py-2 flex items-center justify-between gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base"
                  onClick={logout}
                >
                  Logout <MdLogout />{" "}
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* mobile */}
      <div className="flex items-center justify-between md:hidden w-full h-full">
        <div className="relative flex items-center justify-center">
          <MdShoppingBasket className="text-textColor text-2xl ml-8 cursor-pointer " />
          {/* mostrar la cantidad de items en el carrito */}
          {cartItems && cartItems.length > 0 && (
            <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
              <p className="text-xs text-white font-semibold">
                {cartItems.length}
              </p>
            </div>
          )}
        </div>

        <Link
          to={"/"}
          className="flex items-center gap-2"
          onClick={() => {
            setIsMenu(false);
          }}
        >
          <img className="w-10 object-cover" src={Logo} alt="logo" />
          <p className=" text-headingColor text-xl font-bold">City</p>
        </Link>

        <div className=" relative">
          {/*user && console.log("user ", user, "user.photoURL: ", user.photoURL)*/}
          {/*  ver si eran lo mismo : user && "https://lh3.googleusercontent.com/a/AGNmyxbOF-0PXHDnN-jIC86PQotxjbLRk36IyfFrp2nJ=s96-c" === user.photoURL ? console.log("son iguales") : console.log("no lo son") */}
          {/* no funcionaba shadow-2xl asi que usamos drop-shadow-xl */}

          <motion.img
            whileTap={{ scale: 0.6 }} // efecto de click
            src={user ? user.photoURL : Avatar}
            className="w-10 h-10 min-w-[40px] min-h-[40px] drop-shadow-xl cursor-pointer rounded-full"
            alt="userPicture"
            onClick={login}
          />

          {isMenu && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className=" w-[10rem] bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-12 right-2"
            >
              {
                // restringir el acceso solo para el usuario creador
                user && user.email === "yersonjugador27@gmail.com" && (
                  <Link to={"/createItem"}>
                    <p
                      className=" px-4 py-2 flex items-center justify-between gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base"
                      onClick={() => {
                        setIsMenu(false);
                      }}
                    >
                      New Item <MdAdd />{" "}
                    </p>
                  </Link>
                )
              }

              <motion.ul className="flex flex-col ">
                <li
                  className="liElement hover:bg-slate-100 px-4 py-2 "
                  onClick={() => {
                    setIsMenu(false);
                  }}
                >
                  Home
                </li>
                <li
                  className="liElement hover:bg-slate-100 px-4 py-2 "
                  onClick={() => {
                    setIsMenu(false);
                  }}
                >
                  Menu
                </li>
                <li
                  className="liElement hover:bg-slate-100 px-4 py-2 "
                  onClick={() => {
                    setIsMenu(false);
                  }}
                >
                  About us
                </li>
                <li
                  className="liElement hover:bg-slate-100 px-4 py-2 "
                  onClick={() => {
                    setIsMenu(false);
                  }}
                >
                  Service
                </li>
              </motion.ul>

              <p
                className=" m-2 p-2 rounded-md shadow-md flex items-center justify-center bg-slate-200 gap-3 cursor-pointer hover:bg-slate-300 transition-all duration-100 ease-in-out text-textColor text-base"
                onClick={logout}
              >
                Logout <MdLogout />{" "}
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;

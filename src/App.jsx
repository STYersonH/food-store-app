import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { CreateContainer, Header, MainContainer } from "./components";
import { AnimatePresence } from "framer-motion";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useStateValue } from "./context/StateProvider";
import { getAllFoodItems } from "./utils/firebaseFunctions";
import { useEffect } from "react";
import { actionType } from "./context/reducer";

function App() {
  const [{ foodItems }, dispatch] = useStateValue();

  const fetchData = async () => {
    /*await getAllFoodItems().then((data) => {
      console.log(data);
    });*/

    const data = await getAllFoodItems();
    //console.log(data);
    dispatch({
      type: actionType.SET_FOOD_ITEMS,
      foodItems: data,
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <BrowserRouter>
      <AnimatePresence>
        <div className="w-screen h-auto flex flex-col bg-primary">
          <Header />

          <main className="mt-16 md:mt-20 px-4 md:px-16 py-4 w-full">
            <Routes>
              <Route path="/" element={<MainContainer />} />
              <Route path="/createItem" element={<CreateContainer />} />
            </Routes>
          </main>
        </div>
      </AnimatePresence>
    </BrowserRouter>
  );
}

export default App;

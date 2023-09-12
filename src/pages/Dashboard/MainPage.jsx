import { useState } from "react";
import Jokes from "../../components/jokes"
import Animes from "../../components/anime";
import Navbar from "../../components/navbar";
import Manga from "../../components/manga";

const MainPage = () => {
  const [activeMenuItem, setActiveMenuItem] = useState('anime');
  console.log(localStorage.getItem('token'))
  const handleMenuClick = (key) => {
    setActiveMenuItem(key);
  };

  return (
    <div>
      <Jokes/>
      <Navbar activeMenuItem={activeMenuItem} onMenuClick={handleMenuClick} />
      {activeMenuItem === 'anime' && <Animes />}
      {activeMenuItem === 'manga' && <Manga />}
    </div>
  )
}

export default MainPage
import { useEffect, useState }
from "react";

import API from "../services/api";

import MenuCard
from "../components/MenuCard";

function Favorites() {

  const [favorites,
    setFavorites] = useState([]);

  useEffect(() => {

    fetchFavorites();

  }, []);

  const fetchFavorites = async () => {

    try {

      const response =
        await API.get(
          "menu/favorites/"
        );

      setFavorites(response.data);

    } catch (error) {

      console.log(error);

    }

    

  };

  return (

    <div>

      <h1>Favorite Items</h1>

      <div className="menu-grid">

        {

          favorites.map((item) => (

            <MenuCard
              key={item.id}
              item={item}
            />
          ))
        }

      </div>

    </div>
  );
}

export default Favorites;
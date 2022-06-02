import React, { useEffect, useState } from "react";
import { Drawer } from "./components/Drawer/Drawer";
import { Header } from "./components/Header";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Favorites } from "./pages/Favorites";
import { AppContext } from "./context";
import { baseUrl } from "./APIURL";
import axios from "axios";
import { Orders } from "./pages/Orders";

export const App = () => {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [cartOpened, setCartOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [cartResponse, favoritesResponse, itemsResponse] =
          await Promise.all([
            axios.get(baseUrl + "/cart"),
            axios.get(baseUrl + "/favorites"),
            axios.get(baseUrl + "/items"),
          ]);

        setIsLoading(false);

        setCartItems(cartResponse.data);
        setFavorites(favoritesResponse.data);
        setItems(itemsResponse.data);
      } catch (error) {
        alert("Ошибка при отправке запроса");
        console.error(error);
      }
    })();
  }, []);

  const onAddToCart = async (obj) => {
    try {
      const findItem = cartItems.find(
        (item) => Number(item.parentId) === Number(obj.id)
      );

      if (findItem) {
        setCartItems((prev) =>
          prev.filter((item) => Number(item.parentId) !== Number(obj.id))
        );
        await axios.delete(`${baseUrl}/cart/${findItem.id}`);
      } else {
        setCartItems((prev) => [...prev, obj]);
        const { data } = await axios.post(baseUrl + "/cart", obj);
        setCartItems((prev) =>
          prev.map((item) => {
            if (item.parentId === data.parentId) {
              return {
                ...item,
                id: data.id,
              };
            } else {
              return item;
            }
          })
        );
      }
    } catch (error) {
      alert("Не удалось добавить товар в корзину");
      console.error(error);
    }
  };

  const onRemoveItem = (id) => {
    try {
      axios.delete(`${baseUrl}/cart/${id}`);
      setCartItems((prev) =>
        prev.filter((item) => Number(item.id) !== Number(id))
      );
    } catch (error) {
      alert("Не удалось удалить товар из корзины");
      console.error(error);
    }
  };

  const onAddToFavorite = (obj) => {
    try {
      if (favorites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
        axios.delete(`${baseUrl}/favorites/${obj.id}`);

        setFavorites((prev) =>
          prev.filter((item) => Number(item.id) !== Number(obj.id))
        );
      } else {
        axios.post(baseUrl + "/favorites", obj);
        setFavorites((prev) => [...prev, obj]);
      }
    } catch (error) {
      alert("Не удалось добавить товар в избранное");
      console.error(error)
    }
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.parentId) === Number(id));
  };

  const isItemFavorite = (id) => {
    return favorites.some((obj) => Number(obj.parentId) === Number(id));
  };

  return (
    <AppContext.Provider
      value={{
        items,
        cartItems,
        favorites,
        isItemAdded,
        isItemFavorite,
        onAddToFavorite,
        onAddToCart,
        setCartOpened,
        setCartItems,
        setFavorites,
      }}
    >
      <div className="wrapper clear">
      
          <Drawer
            items={cartItems}
            onClose={() => setCartOpened(false)}
            onRemove={onRemoveItem}
            opened={cartOpened}
          />
              
        <Header onClickCart={() => setCartOpened(!cartOpened)} />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <Home
                items={items}
                cartItems={cartItems}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                onChangeSearchInput={onChangeSearchInput}
                onAddToFavorite={onAddToFavorite}
                onAddToCart={onAddToCart}
                isLoading={isLoading}
              />
            }
          />
          <Route exact path="/favorites" element={<Favorites />} />
          <Route exact path="/orders" element={<Orders />} />
        </Routes>
      </div>
    </AppContext.Provider>
  );
};

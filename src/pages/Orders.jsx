import React, { useContext, useEffect, useState } from "react";
import { Card } from "../components/Card/Card";
import { AppContext } from "../context";
import { baseUrl } from "../APIURL";
import axios from "axios";

export const Orders = () => {
  const { onAddToFavorite, onAddToCart } = useContext(AppContext);

  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(baseUrl + "/orders");

        setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
        setIsLoading(false);
      } catch (error) {
        alert("Ошибка при запросе списка заказов");
        console.error(error);
      }
    })();
  }, []);

  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>Мои заказы</h1>
      </div>
      <div className="d-flex flex-wrap">
        {(isLoading ? [...Array(10)] : orders).map((item, index) => (
          <Card
            key={index}                
            {...item}
            loading={isLoading}
          />
        ))}
      </div>
    </div>
  );
};

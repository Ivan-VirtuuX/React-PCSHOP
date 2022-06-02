import React, { useContext, useState } from "react";
import { Info } from "../Info";
import { AppContext } from "../../context";
import { baseUrl } from "../../APIURL";
import { useCart } from "../../hooks/useCart";
import remove from "../../assets/images/remove.svg";
import emptyCart from "./../../assets/images/empty-cart.svg";
import orderSended from "./../../assets/images/order-sended.svg";
import axios from "axios";
import styles from "./Drawer.module.scss"

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const Drawer = ({ onClose, onRemove, items = [], opened }) => {
  const { setFavorites } = useContext(AppContext);
  const { cartItems, setCartItems, cartSum, cartTax } = useCart();

  const [orderId, setOrderId] = useState(null);
  const [isOrderComplete, setIsOrderComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onClickOrder = async () => {
    try {
      setIsLoading(true);

      const { data } = await axios.post(baseUrl + "/orders", {
        items: cartItems,
      });

      setOrderId(data.id);
      setIsOrderComplete(true);
      setCartItems([]);
      setFavorites([]);

      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete(baseUrl + "/cart" + item.id);
        await delay(1000);
      }
    } catch (error) {
      console.log("Не удалось оформить заказ");
    }
    setIsLoading(false);
  };

  return (
    <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ""}`}>
      <div className={styles.drawer}>
        <h2 className="d-flex justify-between mb-30">
          Корзина
          <img
            onClick={onClose}
            className="removeBtn cu-p"
            src={remove}
            alt=""
          />
        </h2>
        {items.length > 0 ? (
          <div className="d-flex flex-column flex">
            <div className="items flex">
              {items.map((obj) => (
                <div
                  key={obj.id}
                  className="cartItem d-flex align-center mb-20"
                >
                  <img
                    className="mr-20"
                    width={80}
                    height={68}
                    src={obj.imageUrl}
                    alt=""
                  />
                  <div className="mr-20">
                    <p className="mb-5">{obj.title}</p>
                    <b>{obj.price} руб.</b>
                  </div>
                  <img
                    onClick={() => onRemove(obj.id)}
                    className="removeBtn"
                    src={remove}
                    alt=""
                  />
                </div>
              ))}
            </div>
            <div className="cartTotalBlock">
              <ul>
                <li>
                  <span>Итого:</span>
                  <div></div>
                  <b>{cartSum} руб. </b>
                </li>
                <li>
                  <span>Налог 5%:</span>
                  <div></div>
                  <b>{cartTax} руб. </b>
                </li>
              </ul>
              <button
                disabled={isLoading}
                onClick={onClickOrder}
                className="blueButton"
              >
                Оформить заказ
                <svg
                  width="16"
                  height="14"
                  viewBox="0 0 16 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 7H14.7143"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M8.71436 1L14.7144 7L8.71436 13"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        ) : (
          <Info
            title={isOrderComplete ? "Заказ оформлен!" : "Корзина пустая"}
            description={
              isOrderComplete
                ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке`
                : "Добавьте хотя бы один товар в корзину"
            }
            image={isOrderComplete ? orderSended : emptyCart}
            isOrderComplete={isOrderComplete}
          />
        )}
      </div>
    </div>
  );
};

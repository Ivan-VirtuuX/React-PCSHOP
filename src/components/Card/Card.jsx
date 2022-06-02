import React, { useContext } from "react";
import { AppContext } from "../../context";
import ContentLoader from "react-content-loader";
import styles from "./Card.module.scss";

export const Card = ({
  id,
  title,
  price,
  imageUrl,
  onFavorite,
  onPlus,
  width,
  height,
  loading = false,
}) => {
  const { isItemAdded, isItemFavorite } = useContext(AppContext);
  const obj = { id, parentId: id, title, imageUrl, price, width, height };

  const onClickPlus = () => {
    onPlus(obj);
  };

  const onClickFavorite = () => {
    onFavorite(obj);
  };

  return (
    <div className={styles.card}>
      {loading ? (
        <ContentLoader
          speed={2}
          width={160}
          height={250}
          viewBox="0 0 150 265"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="1" y="0" rx="10" ry="10" width="155" height="155" />
          <rect x="0" y="167" rx="5" ry="5" width="155" height="15" />
          <rect x="0" y="187" rx="5" ry="5" width="100" height="15" />
          <rect x="1" y="234" rx="5" ry="5" width="80" height="25" />
          <rect x="124" y="230" rx="10" ry="10" width="32" height="32" />
        </ContentLoader>
      ) : (
        <>
          <img
            width={width}
            height={height}
            src={imageUrl}
            alt=""
            style={{ margin: "0 auto" }}
          />
          <h5>{title}</h5>
          <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column">
              <span>Цена:</span>
              <b>{price} руб.</b>
            </div>
            {onPlus &&
              (isItemAdded(id) ? (
                <svg
                  className={styles.addedBtn}
                  onClick={onClickPlus}
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    width="32"
                    height="32"
                    rx="8"
                    fill="url(#paint0_linear_60_200)"
                  />
                  <g clip-path="url(#clip0_60_200)">
                    <g filter="url(#filter0_d_60_200)">
                      <path
                        d="M19.6567 11.6207C19.8394 11.4363 20.0876 11.3318 20.3471 11.3299C20.6066 11.3279 20.8563 11.4288 21.0416 11.6105C21.227 11.7921 21.3329 12.0398 21.3362 12.2993C21.3395 12.5588 21.24 12.809 21.0594 12.9954L15.8327 19.5294C15.7429 19.626 15.6346 19.7036 15.5141 19.7575C15.3937 19.8114 15.2636 19.8404 15.1317 19.8429C14.9998 19.8454 14.8687 19.8213 14.7463 19.772C14.6239 19.7227 14.5127 19.6492 14.4194 19.556L10.954 16.092C10.7699 15.9078 10.6665 15.6579 10.6665 15.3975C10.6666 15.137 10.7701 14.8872 10.9544 14.703C11.1386 14.5189 11.3885 14.4155 11.6489 14.4155C11.9094 14.4156 12.1592 14.5191 12.3434 14.7034L15.084 17.4447L19.6307 11.6514C19.639 11.6408 19.6479 11.6308 19.6574 11.6214L19.6567 11.6207Z"
                        fill="white"
                      />
                    </g>
                  </g>
                  <defs>
                    <filter
                      id="filter0_d_60_200"
                      x="10.6665"
                      y="11.3298"
                      width="10.6698"
                      height="10.5132"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset dy="2" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_60_200"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_60_200"
                        result="shape"
                      />
                    </filter>
                    <linearGradient
                      id="paint0_linear_60_200"
                      x1="16"
                      y1="0"
                      x2="16"
                      y2="32"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#89F09C" />
                      <stop offset="1" stop-color="#3CC755" />
                    </linearGradient>
                    <clipPath id="clip0_60_200">
                      <rect
                        width="10.6667"
                        height="10.6667"
                        fill="white"
                        transform="translate(10.6667 10.6667)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              ) : (
                <svg
                  className={styles.plus}
                  onClick={onClickPlus}
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="0.5"
                    y="0.5"
                    width="31"
                    height="31"
                    rx="7.5"
                    fill="white"
                    stroke="#F2F2F2"
                  />
                  <path
                    d="M20.6653 15.1312H17.2021V11.6682C17.2021 10.3328 15.1311 10.3328 15.1311 11.6682V15.1312H11.668C10.3329 15.1312 10.3329 17.2022 11.668 17.2022H15.1311V20.6652C15.1311 22.0005 17.2021 22.0005 17.2021 20.6652V17.2022H20.6653C22.0005 17.2022 22.0005 15.1312 20.6653 15.1312Z"
                    fill="#D3D3D3"
                  />
                </svg>
              ))}
            {onFavorite &&
              (isItemFavorite(id) ? (
                <svg
                  className={styles.favoriteBtn}
                  onClick={onClickFavorite}
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="32" height="32" rx="7" fill="#FEF0F0" />
                  <path
                    d="M22.5849 12.2231C22.3615 11.7098 22.0394 11.2446 21.6365 10.8536C21.2333 10.4615 20.758 10.1499 20.2363 9.93573C19.6954 9.71277 19.1152 9.59865 18.5295 9.59999C17.7077 9.59999 16.906 9.82326 16.2092 10.245C16.0425 10.3459 15.8842 10.4567 15.7342 10.5774C15.5841 10.4567 15.4258 10.3459 15.2591 10.245C14.5624 9.82326 13.7606 9.59999 12.9388 9.59999C12.3471 9.59999 11.7737 9.71245 11.232 9.93573C10.7086 10.1507 10.2369 10.46 9.83181 10.8536C9.42843 11.2442 9.10619 11.7094 8.88337 12.2231C8.65168 12.7573 8.53333 13.3246 8.53333 13.9084C8.53333 14.4592 8.64668 15.0331 8.8717 15.6169C9.06006 16.1048 9.33009 16.6109 9.67513 17.1219C10.2219 17.9307 10.9736 18.7742 11.9071 19.6293C13.4539 21.0467 14.9857 22.0258 15.0507 22.0655L15.4458 22.3169C15.6208 22.4277 15.8458 22.4277 16.0209 22.3169L16.4159 22.0655C16.4809 22.0241 18.0111 21.0467 19.5596 19.6293C20.493 18.7742 21.2448 17.9307 21.7915 17.1219C22.1366 16.6109 22.4083 16.1048 22.5949 15.6169C22.82 15.0331 22.9333 14.4592 22.9333 13.9084C22.935 13.3246 22.8166 12.7573 22.5849 12.2231Z"
                    fill="#FF8585"
                  />
                </svg>
              ) : (
                <svg
                  className={styles.favoriteBtn}
                  onClick={onClickFavorite}
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="0.5"
                    y="0.5"
                    width="31"
                    height="31"
                    rx="7.5"
                    fill="white"
                    stroke="#F2F2F2"
                  />
                  <path
                    d="M23.0516 12.6231C22.8282 12.1098 22.506 11.6446 22.1032 11.2537C21.7 10.8615 21.2247 10.5499 20.703 10.3358C20.1621 10.1128 19.5819 9.99867 18.9961 10C18.1744 10 17.3726 10.2233 16.6759 10.645C16.5092 10.7459 16.3508 10.8567 16.2008 10.9775C16.0508 10.8567 15.8925 10.7459 15.7258 10.645C15.029 10.2233 14.2273 10 13.4055 10C12.8138 10 12.2404 10.1125 11.6986 10.3358C11.1752 10.5508 10.7035 10.86 10.2985 11.2537C9.8951 11.6442 9.57286 12.1095 9.35004 12.6231C9.11835 13.1573 9 13.7246 9 14.3084C9 14.8592 9.11335 15.4331 9.33837 16.0169C9.52673 16.5048 9.79676 17.0109 10.1418 17.522C10.6885 18.3307 11.4403 19.1742 12.3737 20.0293C13.9206 21.4467 15.4524 22.4258 15.5174 22.4655L15.9125 22.7169C16.0875 22.8277 16.3125 22.8277 16.4875 22.7169L16.8826 22.4655C16.9476 22.4242 18.4778 21.4467 20.0263 20.0293C20.9597 19.1742 21.7115 18.3307 22.2582 17.522C22.6032 17.0109 22.8749 16.5048 23.0616 16.0169C23.2866 15.4331 23.4 14.8592 23.4 14.3084C23.4017 13.7246 23.2833 13.1573 23.0516 12.6231V12.6231Z"
                    fill="#D3D3D3"
                  />
                </svg>
              ))}
          </div>
        </>
      )}
    </div>
  );
};

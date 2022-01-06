import React, { useState } from 'react';
import Data from '../Cart/Data';
import { useCart } from 'react-use-cart';
import './swiper.style.scss';
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const styles = {
  root: {
    maxWidth: 345,
  },
  swiper: {
    padding: '3rem',
  },
  media: {
    height: 140,
    backgroundSize: 'contain',
  },
};
const SwiperJs = () => {
  const { addItem } = useCart();

  return (
    <>
      <div className="title-section ">
        <h2 className="">Featured Products</h2>
      </div>
      <Swiper
        className="swiper-container"
        style={styles.swiper}
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={50}
        pagination={{ clickable: true }}
        loop
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
        breakpoints={{
          // when window width is >= 320px
          320: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          // when window width is >= 480px
          480: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          // when window width is >= 640px
          640: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          // when window width is >= 768px
          768: {
            slidesPerView: 2,
          },
          // when window width is >= 1024px
          1024: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
        }}
        autoplay={{
          delay: 200,
          disableOnInteraction: false,
        }}
      >
        {Data.map((item) => (
          <SwiperSlide key={item.id}>
            <Card>
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt="Contemplative Reptile"
                  style={styles.media}
                  image={item.image}
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {item.name}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => addItem(item)}
                >
                  Add to cart
                </Button>
                <Link to={`/product/${item.id}`}>
                  <Button size="small" color="primary">
                    View Product
                  </Button>
                </Link>
              </CardActions>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};
export default SwiperJs;

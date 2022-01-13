import React, { useEffect } from 'react';
import Banner from '../Banner/Banner';
import Features from '../Features/Features';
import SwiperJs from '../Swiper/Swiper';
import ServiceCard from '../ServiceCard/ServiceCard';
import ShopDiscount from '../ShopDiscount/ShopDiscount';
import CartIcon from '../CartIcon/CartIcon';
import Testimonial from '../Testimonial/Testimonial';

const Home = () => {
  useEffect(() => {
    document.title = `Sky Tech | Home`;
  }, []);

  return (
    <>
      <CartIcon />
      <Banner />
      <Features />
      <SwiperJs />
      <ShopDiscount />
      <ServiceCard />
      <Testimonial />
    </>
  );
};

export default Home;

import React, { useEffect } from 'react';
import { useCart } from 'react-use-cart';
import { Link } from 'react-router-dom';
import Aos from 'aos';
import 'aos/dist/aos.css';
import './product.css';
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import swal from 'sweetalert';
import Button from '@mui/material/Button';

const Product = (props) => {
  const { addItem } = useCart();
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  const handleAddToCart = (product) => {
    addItem(product);
    swal({
      title: 'Added to cart',
      text: `${product.name} has been added to your cart`,
      icon: 'success',
      button: false,
      timer: 1000,
    });
  };

  //style for the card using material-ui

  const cardStyle = {
    width: '300px',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
    boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.5)',
    borderRadius: '10px',
    // backgroundColor: '#fff',
    color: '#000',
    fontFamily: 'Roboto',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    textAlign: 'center',
  };

  return (
    <>
      <Card
        sx={{ maxWidth: 345 }}
        // style={cardStyle}
        className="card"
        data-aos="fade-up"
        data-aos-duration="2000"
      >
        <CardActionArea>
          <CardMedia
            alt={props.alt}
            component="img"
            height="180"
            image={props.src}
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              color="primary"
              component="div"
            >
              ${props.price}
            </Typography>
            <Typography variant="h6" component="p">
              {props.productName}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Link to={`/products/${props.id}`}>
            <Button color="primary" variant="contained">
              View Product
            </Button>
          </Link>
          <Button
            className="btn btn-primary"
            onClick={() => handleAddToCart(props.item)}
          >
            Add to Cart
          </Button>
        </CardActions>
      </Card>
    </>
  );
};
export default Product;

import React from 'react';
import './services.scss';
import services from '../Services/services.data';
import { Link } from 'react-router-dom';

function ServiceCard() {
  return (
    <div className="Services pd-y">
      <div className="section-header">
        <h2 className="section-title">What We Offer</h2>
        <span className="line" />
      </div>
      <div className="Services-container">
        {services.map((service) => (
          <div className="Services-item tb-effect" key={service.id}>
            <h2 className="Services-item-text">{service.title}</h2>
            <div className="pricint-item-perhour">
              <img className="doller" src={service.icon} alt={service.title} />
            </div>
            <span className="hour"> {service.price}/Hours</span>
            <p className="testimonial-list">{service.description}</p>
            <button className="Services-item-purchase">
              <Link to={`/services/${service.title}`}>Book Now</Link>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ServiceCard;

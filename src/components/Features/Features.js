import React from 'react';
import './features.scss';

const features = [
  {
    title: 'Free Shipping',
    text: 'Delivery within the Jordan, and Saudi Arabia',
    icon: 'fas fa-truck',
  },
  {
    title: 'Return Policy',
    text: 'Return within 30 days for unused items',
    icon: 'fas fa-sync',
  },
  {
    title: '24/7 Support\n',
    text: 'We are here to help you 24/7',
    icon: 'fas fa-headset',
  },
  {
    title: 'Secure Payment',
    text: 'We accept Visa and PayPal',
    icon: 'fas fa-money-check-alt',
  },
];
const Features = () => {
  return (
    <section className="features-area section_gap ">
      <div className="container">
        <div className="features-row">
          {features.map((feature, index) => (
            <div className="single-features" key={index}>
              <span className="features-icon">
                <i className={feature.icon} />
              </span>
              <div className="desc">
                <h6 className="title-feature">{feature.title}</h6>
                <p>{feature.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;

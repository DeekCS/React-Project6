import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import './testimonial.scss';
export default function Testimonials() {
  return (
    <>
      <div className="title-section ">
        <h2 className="">What Our Customers Say</h2>
      </div>
      <div className="testimonial-container">
        <div className="testimonial-overlay">
          <Carousel
            showArrows={true}
            infiniteLoop={true}
            showThumbs={false}
            showStatus={false}
            autoPlay={true}
            interval={6100}
          >
            <div>
              <img
                src="https://www.incimages.com/uploaded_files/image/1920x1080/mark-zuckerberg-headshot-web_77358.jpg"
                alt={'img1'}
              />
              <div className="myCarousel">
                <h3>Shirley Fultz</h3>
                <h4>Designer</h4>
                <p>
                  It's freeing to be able to catch up on customized news and not
                  be distracted by a social media element on the same site
                </p>
              </div>
            </div>

            <div>
              <img
                src="https://peaklife.in/wp-content/uploads/2019/06/elon-musk-image.jpg"
                alt={'img1'}
              />
              <div className="myCarousel">
                <h3>Daniel Keystone</h3>
                <h4>Designer</h4>
                <p>
                  The simple and intuitive design makes it easy for me use. I
                  highly recommend Fetch to my peers.
                </p>
              </div>
            </div>

            <div>
              <img
                src="https://storage.googleapis.com/cgiarorg/2021/02/c343f97f-1200x-1-b.jpg"
                alt={'img1'}
              />
              <div className="myCarousel">
                <h3>Theo Sorel</h3>
                <h4>Designer</h4>
                <p>
                  I enjoy catching up with Fetch on my laptop, or on my phone
                  when I'm on the go!
                </p>
              </div>
            </div>
          </Carousel>
        </div>
      </div>
    </>
  );
}

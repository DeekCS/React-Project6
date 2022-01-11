import React, { useEffect, useState } from 'react';
import './services.css';
import service from './services.data';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

const Services = () => {
  const loggedUserNow = JSON.parse(localStorage.getItem('loggedUser'));
  const navigate = useNavigate();
  console.log(service[0].title);
  let [appointments, setAppointments] = useState(
    JSON.parse(localStorage.getItem(`${service[0].title} appointments`))
      ? JSON.parse(localStorage.getItem(`${service[0].title} appointments`))
      : []
  );

  const [reservation, setReservation] = useState({
    mobile: '',
    date: '',
    startTime: '',
    finishTime: '',
  });

  const [newSTime, setNewSTime] = useState('');
  const [newFTime, setNewFTime] = useState('');
  useEffect(() => {
    let newStartTime = reservation.startTime.split('');
    newStartTime.splice(2, 1);

    let newStartTimeString = newStartTime.join('');
    setNewSTime(newStartTimeString);

    let newFinishTime = reservation.finishTime.split('');
    newFinishTime.splice(2, 1);

    let newFinishTimeString = newFinishTime.join('');
    setNewFTime(newFinishTimeString);
  }, [reservation.finishTime, reservation.startTime]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReservation({ ...reservation, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!loggedUserNow) {
      navigate('/register');
    } else {
      let newStartTime = reservation.startTime.split('');
      newStartTime.splice(2, 1);
      let newStartTimeString = newStartTime.join('');

      let newFinishTime = reservation.finishTime.split('');
      newFinishTime.splice(2, 1);
      let newFinishTimeString = newFinishTime.join('');

      if (Number(newFinishTimeString) < Number(newStartTimeString)) {
        swal({
          icon: 'error',
          title: 'Oops...',
          text: 'Please pick a time that is after the start time',
          confirmButtonText: 'OK',
        }).then(
          (r) =>
            r.value &&
            setReservation({
              date: '',
              startTime: '',
              finishTime: '',
            })
        );
        return;
      }

      let flag = false;

      const newTotalPrice =
        ((Number(newFinishTimeString) - Number(newStartTimeString)) / 100) *
        service[0].price;
      const newId = 1 + new Date();

      let newAppointment = {
        mobileNumber: reservation.mobile,
        id: newId,
        service: service[0].title,
        date: reservation.date,
        startTime: newStartTimeString,
        finishTime: newFinishTimeString,
        totalPrice: newTotalPrice,
      };

      let newArray = appointments;
      newArray.forEach((item) => {
        if (item.date === newAppointment.date) {
          if (
            Number(newAppointment.finishTime) > Number(item.startTime) &&
            Number(newAppointment.startTime) < Number(item.finishTime)
          ) {
            swal({
              icon: 'error',
              title: 'Oops...',
              text: 'Please pick a time that is not already booked',
              confirmButtonText: 'OK',
            }).then(
              (r) =>
                r.value &&
                setReservation({
                  date: '',
                  startTime: '',
                  finishTime: '',
                })
            );
            flag = true;
          }
        }
      });

      if (!flag) {
        newArray.push(newAppointment);
        localStorage.setItem(
          `${service[0].title} appointments`,
          JSON.stringify(newArray)
        );
        const user = JSON.parse(localStorage.getItem('loggedUser'));
        user.appointments.push(newAppointment);
        localStorage.setItem('loggedUser', JSON.stringify(user));
        const allUsers = JSON.parse(localStorage.getItem('users'));
        const filteredAllUsers = allUsers.filter((data) => user.id !== data.id);
        filteredAllUsers.push(user);
        localStorage.setItem('users', JSON.stringify(filteredAllUsers));
        setAppointments(
          JSON.parse(localStorage.getItem(`${service[0].title} appointments`))
        );
        swal({
          icon: 'success',
          title: 'Success!',
          text: 'Your appointment has been booked!',
          confirmButtonText: 'Explore more!',
        });
      }
    }
  };

  return (
    <>
      <div className={'wrapper'}>
        <div className={'services'}>
          <div className={'services__img'}>
            <img src={'/booking.svg'} alt={'services-1'} />
          </div>
          <form className={'form-services'} onSubmit={handleSubmit}>
            <div className={'services__form'}>
              <div className={'services__form-title'}>
                <h2>Computer Repair Service</h2>
              </div>
              <div className={'services__form-group'}>
                <div className={'services__form-input'}>
                  <label htmlFor={'name'}>Name</label>
                  <input
                    type={'text'}
                    placeholder="Login to Show your name"
                    value={
                      loggedUserNow
                        ? loggedUserNow.firstName + ' ' + loggedUserNow.lastName
                        : ''
                    }
                    readOnly
                  />
                </div>
                <div className={'services__form-input'}>
                  <label htmlFor={'email'}>Email</label>
                  <input
                    type={'email'}
                    placeholder="Login to Show your email"
                    value={loggedUserNow ? loggedUserNow.email : ''}
                    readOnly
                  />
                </div>
              </div>

              <div className={'services__form-group'}>
                <div className={'services__form-input'}>
                  <label htmlFor={'time'}>Start Time</label>
                  <input
                    type={'time'}
                    placeholder={'Ваше имя'}
                    value={reservation.startTime}
                    onChange={handleChange}
                    className="form-control"
                    name="startTime"
                    min="09:00"
                    max="18:00"
                    required
                  />
                </div>
                <div className={'services__form-input'}>
                  <label htmlFor={'time'}>End Time</label>
                  <input
                    name="finishTime"
                    type="time"
                    min="09:00"
                    max="18:00"
                    required
                    value={reservation.finishTime}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className={'services__form-group'}>
                <div className={'services__form-input'}>
                  <label htmlFor={'date'}>Date</label>
                  <input
                    type={'date'}
                    name="date"
                    value={reservation.date}
                    onChange={handleChange}
                    required
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div className={'services__form-input'}>
                  <label htmlFor={'phone'}>Phone</label>
                  <input
                    type="tel"
                    required
                    placeholder={'Enter phone number'}
                    name="mobile"
                    value={reservation.mobile}
                    onChange={handleChange}
                    min="10"
                  />
                </div>
              </div>
              <div className={'services__form-group'}>
                <div className={'services__form-input'}>
                  <span className="form-control">
                    {reservation.startTime && reservation.finishTime
                      ? (
                          ((Number(newFTime) - Number(newSTime)) / 100) *
                          service[0].price
                        ).toFixed(2)
                      : 0}
                  </span>
                </div>
              </div>
              <button className={'services__form-btn'}>Book Now</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Services;

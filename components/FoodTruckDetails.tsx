import {useState} from 'react';
import PropTypes from 'prop-types';
import {FaTimes, FaExternalLinkAlt } from 'react-icons/fa';
import Modal from 'react-modal';
import moment from 'moment';

Modal.setAppElement('#appContainer');
export default function FoodTruckDetails(props) {
  const dateFormat = 'MMMM Do YYYY';

  // Generate GMaps link to directions from current location as origin 
  // and specified longitude and latitude as the destination
  const getDirections = (longitude, latitude) => {
    return `https://www.google.com/maps/dir/?api=1&origin=Current+Location&destination=${latitude},${longitude}`;
  }

  return (
    <Modal
      closeTimeoutMS={250}
      isOpen={props.isVisible}
      onRequestClose={props.onCloseRequest}
      contentLabel="Detailed Info"
      className="foodTruckDetailsModal"
    >
      <header>
        <div className="headerBackground"/>
        <button className="close" onClick={props.onCloseRequest}>
          Close <FaTimes/>
        </button>
        <h1>{props.foodTruck.applicant}</h1>
        <a className="directions" target="_blank" rel="noreferrer" title="Get Directions Using Google Maps" href={getDirections(props.foodTruck.longitude, props.foodTruck.latitude)}>
          Get Directions <FaExternalLinkAlt/>
        </a>
      </header>
      <main>
        <h2>Detailed Information</h2>
        <table>
          <tbody>
            <tr>
              <th>Food Items:</th>
              <td>{props.foodTruck.fooditems}</td>
            </tr>
            <tr>
              <th>Facility Type:</th>
              <td>{props.foodTruck.facilitytype}</td>
            </tr>
            <tr>
              <th>Location:</th>
              <td>{props.foodTruck.locationdescription}</td>
            </tr>
            <tr>
              <th>Permit Status:</th>
              <td>{props.foodTruck.status}</td>
            </tr>
            <tr>
              <th>Schedule:</th>
              <td><a target="_blank" rel="noreferrer" href={props.foodTruck.schedule}>Download (PDF) <FaExternalLinkAlt/></a></td>
            </tr>
            <tr>
              <th>Permit Approved:</th>
              <td>{moment(props.foodTruck.approved).format(dateFormat)}</td>
            </tr>
            <tr>
              <th>Permit Expiration:</th>
              <td>{moment(props.foodTruck.expirationdate).format(dateFormat)}</td>
            </tr>
          </tbody>
        </table>
      </main>
    </Modal>
  );
}

FoodTruckDetails.propTypes = {
  foodTruck: PropTypes.object.isRequired,
  isVisible: PropTypes.bool.isRequired,
  onCloseRequest: PropTypes.func.isRequired
};

import Head from 'next/head';
import Image from 'next/image';
import {useState, useEffect} from 'react';
import GoogleMapReact from 'google-map-react';
import {getFoodTrucks} from '../utils/api';
import { RiTruckFill } from 'react-icons/ri';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';

import FoodTruckDetails from './../components/FoodTruckDetails';

export default function Home() {
  const [allFoodTrucks, setAllFoodTrucks] = useState([]);
  const [filteredFoodTrucks, setFilteredFoodTrucks] = useState([]);
  const [selectedFoodTruck, setSelectedFoodTruck] = useState(null);
  const [isListCollapsed, setIsListCollapsed] = useState(true);
  const [showDetails, setShowDetails] = useState(false);
  const [permitStatusFilter, setPermitStatusFilter] = useState('APPROVED');
  const [searchString, setSearchString] = useState('');

  // When the permit status filter is updated,
  // regenerate the filtered list
  useEffect(()=>{
    filterFoodTruckList();
  }, [permitStatusFilter]);

  // When the search string changes,
  // regenerate the filtered list
  useEffect(()=>{
    filterFoodTruckList();
  }, [searchString]);

  // On initial load, fetch all the food trucks
  // directly from data.sfgov.org and generate
  // initial filtered list based on default state
  if(allFoodTrucks.length === 0) {
    getFoodTrucks().then((foodTruckList)=>{
      setAllFoodTrucks(foodTruckList);
      filterFoodTruckList(foodTruckList);
    });
  }

  // Finds food truck by objectid key
  const getFoodTruckById = (id) => {
    const foodTrucks = allFoodTrucks.filter((foodTruck)=>{return foodTruck.objectid === id;});
    if(foodTrucks.length !== 1) {
      throw new Error(`Could not find the food truck with id: ${id}`);
    }
    return foodTrucks[0];
  }

  // Filter the food truck list by the permit status and search string
  const filterFoodTruckList = (foodTruckList = null) => {
    let foodTrucks = foodTruckList === null ? allFoodTrucks : foodTruckList;

    // If permit status is not 'All', only show food trucks 
    // where the status equals the selected permit status
    if(permitStatusFilter != 'All') {
      foodTrucks = foodTrucks.filter((truck)=>{
        return truck.status === permitStatusFilter;
      });
    }

    // Simple case insensitive search function that determines if search
    // string is a subset of the fooditems property
    if(searchString != '') {
      foodTrucks = foodTrucks.filter((foodTruck) => {
        if(!foodTruck.fooditems) return false;
        return foodTruck.fooditems.toUpperCase().indexOf(searchString.toUpperCase()) !== -1;
      })
    }
    setFilteredFoodTrucks(foodTrucks);
  }

  // Handles button clicks that result in the food truck
  // details modal being opened
  const handleFoodTruckSelection = (event, foodTruck) => {
    event.preventDefault();
    setSelectedFoodTruck(foodTruck.objectid);
    setShowDetails(true);
  };

  // Handle permit status selection
  const handlePermitStatusFilterChange = (event) => {
    setPermitStatusFilter(event.target.value);
  }

  // Handle changes made to the search field
  const handleKeywordSearch = (event) => {
    console.log("Updating search string", event.target.value);
    setSearchString(event.target.value);
  }

  // Custom map marker for food trucks
  const FoodTruckMarker = ({ id, text, onClick }) => (
    <div onClick={onClick} className={selectedFoodTruck === id ? "marker selected" : "marker"}>
      <RiTruckFill color={selectedFoodTruck === id ? "red" : "green"} size={24}/>
      <div className="details">{text}</div>
    </div>
  );

  return (
    <div id="appContainer">
      <Head>
        <title>Food Truck Challenge</title>
      </Head>

      {/* When a food Truck is selected, show the details modal */}
      {selectedFoodTruck !== null &&
        <FoodTruckDetails
          foodTruck={getFoodTruckById(selectedFoodTruck)}
          isVisible={showDetails}
          onCloseRequest={()=>{
            setShowDetails(false);
          }}
        />
      }

      <header>
        <h1>Local Food Trucks</h1>

        <section className="search">
          <input
            type="text"
            placeholder="Search food type (eg Tacos, Chinese, Hot Dogs)"
            onKeyPress={event => {
              if (event.key === 'Enter') {
                handleKeywordSearch(event);
              }
            }}
            onBlur={handleKeywordSearch}
          />
        </section>

        <section className="filters">
          <label>
            Permit Status:
          </label>
          <select defaultValue="APPROVED" onChange={handlePermitStatusFilterChange}>
            <option>All</option>
            <option value="APPROVED">Approved</option>
            <option value="REQUESTED">Requested</option>
            <option value="EXPIRED">Expired</option>
            <option value="SUSPEND">Suspended</option>
          </select>
        </section>
      </header>

      <main className={isListCollapsed ? "shrunk" : ""}>
        <aside>
          <ul>
            {filteredFoodTrucks.map((foodTruck, index) =>
              <li 
                key={foodTruck.objectid} 
                onClick={(e)=>{handleFoodTruckSelection(e, foodTruck)}}
              >
                <span style={{fontWeight: (selectedFoodTruck === foodTruck.objectid ? 'bold' : 'normal')}}>{foodTruck.applicant}</span>
              </li>
            )}
          </ul>
        </aside>

        <button className="shrinkList" onClick={(e)=>{
          setIsListCollapsed( !isListCollapsed );
        }}>
          {isListCollapsed &&
            <FaChevronRight/>
          }
          {!isListCollapsed &&
            <FaChevronLeft/>
          }
        </button>

        <article>
          <GoogleMapReact
            bootstrapURLKeys={{ key: "AIzaSyA_s4HLlLkg_buW0XlVtFzQLkv-Kq-Ykls" }}
            defaultCenter={{
              lat: 37.752129,
              lng: -122.440343
            }}
            defaultZoom={13}
            onClick={(e)=>{
              // setSelectedFoodTruck(null);
            }}
          >
            {filteredFoodTrucks.map(foodTruck =>
              <FoodTruckMarker 
                id={foodTruck.objectid}
                key={foodTruck.objectid}
                text={foodTruck.applicant}
                lat={foodTruck.location.latitude}
                lng={foodTruck.location.longitude}
                onClick={(e)=>{handleFoodTruckSelection(e, foodTruck)}}
              />
            )}
          </GoogleMapReact>
        </article>
      </main>
    </div>
  )
}

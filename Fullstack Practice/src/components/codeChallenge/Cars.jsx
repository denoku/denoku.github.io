import React, {useEffect, useState} from "react";
import SingleCar from "./SingleCar"

const carsArr = [
    {
        make: "Kia",
        model: "Sorento",
        year: 2020
    },
    {
        make: "Kia",
        model: "Optima",
        year: 2019
    },
    {
        make: "Tesla",
        model: "Model 3",
        year: 2021
    },
    {
        make: "Honda",
        model: "Civic",
        year: 2019
    },
    {
        make: "Honda",
        model: "Accord",
        year: 2018
    },
    {
        make: "Volkswagen",
        model: "Jetta",
        year: 2021
    },
    {
        make: "Toyota",
        model: "Camry",
        year: 2021
    },
    {
        make: "Ford",
        model: "Mustang",
        year: 2019
    },
    {
        make: "Ford",
        model: "F-150",
        year: 2019
    },
    {
        make: "Toyota",
        model: "Camry",
        year: 2020
    },
    {
        make: "Ford",
        model: "F-150",
        year: 2021
    }
]


function Cars() {
const [cars, setCars] = useState({
 list: carsArr,
 mappedList: [],


});
const [showCars, setShowCars] = useState(false);
useEffect(() => {
    handleMapping();
}, []);

const onShowCarsClicked = (e) =>{
    e.preventDefault();
    setShowCars (!showCars)

}

const onShow2018CarsClicked = (e) =>{
    e.preventDefault();
    const twentyEighteen = cars.list.filter(function(car){
          if (car.year === 2018) {
              return true;
          }
          
          return false;
      })
      
    console.log("twentyeighteen",twentyEighteen)
        const mappedList = twentyEighteen.map(mapCars);
        setCars((prevState) => {
          let state = { ...prevState };
          state.mappedList = mappedList;
          return state;
        });
        return mappedList
      }


const onShow2019CarsClicked = (e) =>{
    e.preventDefault();
    const twentyNineteen = cars.list.filter(function(car){
        if (car.year === 2019) {
            return true;
        }
        
        return false;
    })
      const mappedList = twentyNineteen.map(mapCars);
      setCars((prevState) => {
        let state = { ...prevState };
        state.mappedList = mappedList;
        return state;
      });
      return mappedList
    }


const onShow2020CarsClicked = (e) =>{
    e.preventDefault();
    const twentyTwenty = cars.list.filter(function(car){
        if (car.year === 2020) {
            return true;
        }
        
        return false;
    })
      const mappedList = twentyTwenty.map(mapCars);
      setCars((prevState) => {
        let state = { ...prevState };
        state.mappedList = mappedList;
        return state;
      });
      return mappedList
    }


const onShow2021CarsClicked = (e) =>{
    e.preventDefault();
    const twentyTwentyOne = cars.list.filter(function(car){
        if (car.year === 2021) {
            return true;
        }
        
        return false;
    })
      const mappedList = twentyTwentyOne.map(mapCars);
      setCars((prevState) => {
        let state = { ...prevState };
        state.mappedList = mappedList;
        return state;
      });
      return mappedList

}

const handleMapping = () => {
       
        const mappedList = cars.list.map(mapCars);
        console.log("cars.list",cars.list);
        setCars((prevState) => {
          let state = { ...prevState };
          state.mappedList = mappedList;
          return state;
        });
        return mappedList
      };

const mapCars = (aCarData) =>{
    console.log("aCarData", aCarData);
 return  <SingleCar key={"CarsList" + aCarData.id} carProp={aCarData}/>
    }
return (
    <React.Fragment>
       
         <div className="container characters">
        <div className="row justify-content-center d-flex"> 
        <button className="btn btn-secondary m-2 col-3" type="button" id="showCars" onClick={onShowCarsClicked}>Show Cars</button>
        <button className="btn btn-secondary m-2 col-3" type="button" id="show-2018-cars" onClick={onShow2018CarsClicked}>2018 Cars </button>
        <button className="btn btn-secondary m-2 col-3" type="button" id="show-2019-cars" onClick={onShow2019CarsClicked}>2019 Cars </button>
        <button className="btn btn-secondary m-2 col-3" type="button" id="show-2020-cars" onClick={onShow2020CarsClicked}>2020 Cars </button>
        <button className="btn btn-secondary m-2 col-3" type="button" id="show-2021-cars" onClick={onShow2021CarsClicked}>2021 Cars </button>


            <div className="container"> 
                <div className="row justify-content-center d-flex"> 
                    {showCars && cars.mappedList}
                  </div>
                 
            </div>
        </div>
    </div>
     
    </React.Fragment>
  );
}

export default Cars;

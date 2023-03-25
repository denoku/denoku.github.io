import React from "react";

function SingleCar(props){

const car = props.carProp;
console.log("this is at SingleCar", car);


    return(

        <React.Fragment>
     <div className="card col-md-3 m-1">
     <div className="card-body">
                <h5 className="card-title">{car.make}</h5>
                <h5 className="card-text">{car.model}</h5>
                <h5 className="card-text">{car.year}</h5>
     </div>
 </div>
    
    </React.Fragment>


    )
}


export default SingleCar;
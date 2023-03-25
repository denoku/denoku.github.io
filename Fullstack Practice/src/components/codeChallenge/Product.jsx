import React, {useState} from "react";
import productService from "./services/productService";
import toastr from "toastr";


function Product() {

    const [ProductInfo, setProductInfo] = useState ({

        name : "",
        manufacturer : "",
        description : "",
        cost: 0
    }) 

const onSubmitClicked = (e) =>{
    e.preventDefault(); 

    productService
    .addProduct(ProductInfo)
    .then(submitInfoSuccess)
    .catch(submitInfoError)
      };

const submitInfoSuccess =(response) =>{
    console.log("submitInfoSuccess", response);
    toastr.success("You have successfuly logged in", "Welcome")
}

const submitInfoError =(response) =>{
    console.log("submitInfoError", response);
    toastr.error("Log in failed")
}

const onFormFieldChanged = event => {

  const target = event.target;

  const newUserValue = target.value;

  const nameOfField = target.name;

  setProductInfo((prevState)=>{
    const updatedFormData = {...prevState}

    updatedFormData[nameOfField] = newUserValue;

    return updatedFormData
  })
};

    return(

        <React.Fragment>
        <div className="container">
        <div className="row p-5 justify-content-center">

            <div className="col-4">
                <form id="userLogin mt-2 " className="card p-2 bg-light">
                    <h5 className="text-center">Sign in</h5>
                    <div className="form-group mt-2">
                        <label className="form-group" htmlFor="nameInput">Name</label>
                        <input value={ProductInfo.name} type="text" id="name" className="form-control" name={"name"}
                        onChange={onFormFieldChanged} />
                    </div>
                    <div className="form-group mt-2">
                        <label className="form-group mt-2" htmlFor="manufacturerInput">Manufacturer</label>
                        <input value={ProductInfo.manufacturer} type="text" id="manufacturer" className="form-control" name={"manufacturer"}
                        onChange={onFormFieldChanged} />
                    </div>
                    <div className="form-group mt-2">
                        <label className="form-group mt-2" htmlFor="descriptionInput">Description</label>
                        <input value={ProductInfo.description} type="text" id="description" className="form-control" name={"description"}
                        onChange={onFormFieldChanged} />
                    </div>
                    
                    <div className="form-group mt-2">
                        <label className="form-group mt-2" htmlFor="costInput">Cost</label>
                        <input value={ProductInfo.cost} type="text" id="cost" className="form-control" name={"cost"}
                        onChange={onFormFieldChanged} />
                    </div>

                    <button onClick={onSubmitClicked} id="cmdSubmit" className="btn btn-primary col-3 mt-2">Submit</button>


                </form>
            </div>
        </div>
    </div>
        </React.Fragment>
    )
}

export default Product;
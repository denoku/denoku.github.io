import React, {useState} from "react";
import usersService from "../services/usersService";
import toastr from "toastr";



function Register() {

 const [registerFrmData, setRegisterFrmData] = useState({

    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: "",
    avatarUrl: "",
    tenantId: "u1234"

 });

const onFormFieldChanged = event =>{
    const target = event.target;

    const newUserValue = target.value;

    const nameOfField = target.name

 setRegisterFrmData((prevstate) =>{
    const updatedFormData = {...prevstate};
    updatedFormData[nameOfField] = newUserValue

    return updatedFormData
 
 });
};

 const onRegisterClicked = (e) =>{
    e.preventDefault();
    e.stopPropagation();
    usersService
        .userRegister(registerFrmData)
        .then(userRegisterSuccess)
        .catch(userRegisterError)

 }

 const userRegisterSuccess = (response) =>{
    console.log("userRegisterSuccess", response);
    toastr.success("User registration successful");
 };

 const userRegisterError = (response) =>{
    console.log("userRegisterError", response);
    toastr.error("User registration failed", "Please check fields and try again");
 };

    return (
        <React.Fragment>
             <div className="container">
        <div className="row justify-content-center">
            <h2 className="text-bold text-center mt-3">User Registration</h2>
            <div className="col-6">
                <form id="registationInput" className="card p-2 bg-light mt-5">
                    <div className="form-group">
                        <label htmlFor="registerUserFirstName" className="form-label">First Name</label>
                        <input id="registerUserFirstName" className="form-control" type="text" placeholder="Ex. Walter"
                            name={"firstName"} onChange={onFormFieldChanged} />
                    </div>

                    <div className="form-group mt-2">
                        <label className="form-label" htmlFor="registerUserLastName">Last Name</label>
                        <input type="text" id="registerUserLastName" className="form-control" name={"lastName"}
                            placeholder="Ex. White" onChange={onFormFieldChanged} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="registerUserEmail" className="form-label">Email Address</label>
                        <input type="email" name={"email"} className="form-control email" id="registerUserEmail"
                            placeholder="name@example.com" onChange={onFormFieldChanged} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="registerUserPassword" className="form-label ">Password</label>
                        <input type="password" className="form-control" id="registerUserPassword"
                            autoComplete="current-password" name={"password"} placeholder="Password"
                             onChange={onFormFieldChanged} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="retypeUserPassword" className="form-label">Confirm Password</label>
                        <input type="password" className="form-control" id="retypeUserPassword"
                            autoComplete="current-password" name={"passwordConfirm"} placeholder="Retype Password" 
                            onChange={onFormFieldChanged} />
                    </div>
                    <div className="form-group mt-2">
                        <label className="form-label" htmlFor="registerUserAvatar">Avatar URL</label>
                        <input type="text" id="registerUserAvatar" className="form-control" name={"avatarUrl"}
                            placeholder="Avatar Url" onChange={onFormFieldChanged} />
                    </div>
                    
                    <a className="link p-2" href="login.html">Already have an account?</a>

                    <button type="submit" className=" col-6 btn btn-primary mt-3 m-md-2" id="cmdSubmit" onClick={onRegisterClicked}>Register</button>



                </form>
            </div>
        </div>
    </div>
        </React.Fragment>
    )
}

export default Register;
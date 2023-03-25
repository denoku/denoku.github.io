import React, { useState } from "react";
import usersService from "../services/usersService";
import toastr from "toastr";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().min(2).max(50).required("Is Required"),
    //tenantId: Yup.string().min(3).max(6).required("Is Required")
})

function Login() {
    const navigate = useNavigate();
    const [userLoginData] = useState({
        email: "",
        password: "",
        tenantId: "u1234"
    })

    const handlesubmit = (values) => {
        console.log(values);
        usersService
            .userLogin(values)
            .then(userLoginSuccess)
            .catch(userLoginError)
    };

    const userLoginSuccess = (data) => {
        console.log("userLoginSuccess", data);
        toastr.success("You have successfuly logged in", "Welcome")
        usersService.getCurrentUser().then(getCurrentUserSuccess).catch(getCurrentUserError)
    }

    const userLoginError = (response) => {
        console.log("userLoginError", response);
        toastr.error("Log in failed")
    }

    const getCurrentUserSuccess = (data) => {
        console.log("getCurrentUserSuccess", data.item.id);
        const userId = data.item.id
        usersService.getUserById(userId).then(getUserByIdSuccess).catch(getUserByIdError)

    }

    const getCurrentUserError = (err) => {
        console.log("getCurrentUserError", err);
    }

    const getUserByIdSuccess = (data) => {
        console.log("getUserByIdSuccess", data);
        // const userTransport = { type: "CURRENT_USER", payload: data.item }
        // console.log(userTransport);
        navigate("/")

    }

    const getUserByIdError = (err) => {
        console.log("getUserByIdError", err);
    }

    // const onFormFieldChanged = event => {

    //     const target = event.target;

    //     const newUserValue = target.value;

    //     const nameOfField = target.name;

    //     setUserLogin((prevState) => {
    //         const updatedFormData = { ...prevState }

    //         updatedFormData[nameOfField] = newUserValue;

    //         return updatedFormData
    //     })
    // };

    return (

        <React.Fragment>
            <div className="container">
                <div className="row p-5 justify-content-center">

                    <div className="col-4">
                        <Formik
                            enableReintialize={true}
                            initialValues={userLoginData}
                            onSubmit={handlesubmit}
                            validationSchema={validationSchema}
                        >
                            <Form id="userLogin mt-2 " className="card p-2 bg-light">
                                <h5 className="text-center">Log in</h5>
                                <div className="form-group">
                                    <label htmlFor="email" className="form-label">Email Address</label>
                                    <Field type="email" name="email" className="form-control email" id="userEmailInput"
                                        placeholder="name@example.com" />
                                    <ErrorMessage name="email" component="div" className="has-error" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <Field type="password" className="form-control" id="userPasswordInput" name="password"
                                        placeholder="Password" />
                                    <ErrorMessage name="password" component="div" className="has-error" />
                                </div>
                                {/* <div className="form-group mt-2">
        <label className="idStorage" htmlFor="tenantIdInput">Tenant Id</label>
        <input type="text" id="tenantIdInput" className="form-control" name={"tenantId"}
        onChange={onFormFieldChanged} />
    </div> */}

                                <button type="submit" id="signIn" className="btn btn-primary col-3 mt-2">Log in</button>
                            </Form>
                        </Formik>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Login;
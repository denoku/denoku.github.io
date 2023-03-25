import { Formik, Form, Field, ErrorMessage } from "formik";
import React from "react";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
    fullName: Yup.string().min(2).max(50).required("Is Required"),
    email: Yup.string().email("Invalid email").required("Required")
})

class Basic extends React.Component {
    state = {
        formData: {
            fullName: "",
            email: "",
        },
    };

    handleSubmit = (values) => {
        console.log(values);
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-4">
                        <Formik
                            enableReintialize={true}
                            initialValues={this.state.formData}
                            onSubmit={this.handleSubmit}
                            validationSchema={validationSchema}
                        >
                            <Form>
                                <div className="form-group">
                                    <label htmlFor="fullName">FullName</label>
                                    <Field type="text" name="fullName" className="form-control" />
                                    <ErrorMessage name="fullName" component="div" className="has-error" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <Field type="email" name="email" className="form-control" />
                                    <ErrorMessage name="email" component="div" className="has-error" />
                                </div>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </Form>
                        </Formik>
                    </div>
                </div>
            </div>

        )
    }
}

export default Basic;
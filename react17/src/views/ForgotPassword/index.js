import React, { useState } from 'react';
import { useNavigate, Navigate, Link} from "react-router-dom";
import { Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import "./index.css";

const ForgotPasswordSchema = Yup.object()
    .shape({      
        email: Yup.string()
            .email('Invalid email')
            .required('Required'),
    });

const ForgotPassword = () => {
    const navigate = useNavigate();

    const [form] = useState({
        email : '', 
    })

    const onSubmit = (values,{setSubmitting}) => {            
        window.$axios.post("/forgot-password",values)        
        .then(res => {
            navigate("/reset-password?email="+values.email)
            // window.$toastr("Success","Berhasil Kirim Ke Email")                    
        })        
        .catch(err => {         
            console.log(err)
            window.$globalErrorToaster(window.$toastr,err)        
        })
        .finally(() => {
            setSubmitting(false)   
        });
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="container-small">
                <h1  className="text-4xl">ForgotPassword</h1>

                <Formik
                    initialValues={form}
                    validationSchema={ForgotPasswordSchema}
                    onSubmit={onSubmit}>
                    {({isSubmitting,resetForm}) => (                
                        <Form>
                            <div className="pt-5">
                                <Field 
                                    type="email" 
                                    name="email"
                                    placeholder="Email . . ."
                                    className="bg-white p-2 border-b-2 border-indigo-500 input-focus-gone w-full"/>

                                <ErrorMessage  
                                    name="email" 
                                    component="div" 
                                    className="text-red-600 text-sm text-right w-full pt-3"/>
                            </div>
                        
                            <div className="pt-5">
                                <button 
                                    type="submit" 
                                    disabled={isSubmitting}
                                    className="pr-5 pl-5 pt-2 pb-2 bg-indigo-500 rounded-md text-white text-sm ml-2">
                                    {isSubmitting ? '...' : 'Submit'}
                                </button>
                                <button type="reset"
                                    onClick={resetForm}
                                    className="pr-5 pl-5 pt-2 pb-2 bg-orange-500 rounded-md text-white text-sm ml-2">
                                    Reset
                                </button>
                            </div>

                            <div className="pt-5 flex justify-end">
                                <Link to="/signin"
                                    className="text-small text-blue-500">Signin</Link>                    
                            </div>
                        </Form>
                        )
                    }
                </Formik>
            </div>
        </div>
    );
}
 
 export default ForgotPassword;
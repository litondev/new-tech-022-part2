import React, { useState } from 'react';
import { useNavigate ,Navigate,Link} from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import "./index.css";

const SigninSchema = Yup.object()
    .shape({      
        password: Yup.string()
            .min(8, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        email: Yup.string()
            .email('Invalid email')
            .required('Required'),
    });

const Signin = () => {
    const navigate = useNavigate();

    const [form] = useState({
        email : '', 
        password : ''
    })

    const onSubmit = (values,{setSubmitting}) => {            
        window.$axios.post("/auth/signin",values)
        .then(res => {
            localStorage.setItem('user-token',res.data.access_token);            
            // return window.$axios.get("/me");           
        })
        .then(res => {
            setSubmitting(false)
            // props.setUser(res.data);
            window.$toastr("Success","Berhasil Masuk")            
            navigate('/')
        })        
        .catch(err => {         
            setSubmitting(false)   
            console.log(err)
            window.$globalErrorToaster(window.$toastr,err)        
        })
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="container-small">
                <h1 className="text-4xl">Signin</h1>

                <Formik
                    initialValues={ form }
                    validationSchema={ SigninSchema }
                    onSubmit={ onSubmit }>
                    { ({ isSubmitting,resetForm }) => (                
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
                                <Field 
                                    type="password" 
                                    name="password" 
                                    placeholder="Password . . ."
                                    className="bg-white p-2 border-b-2 border-indigo-500 input-focus-gone w-full"/>

                                <ErrorMessage  
                                    name="password" 
                                    component="div" 
                                    className="text-red-600 text-sm text-right w-full pt-3"/>
                            </div>

                            <div className="pt-5 flex justify-start">
                                <button 
                                    type="submit" 
                                    disabled={ isSubmitting }
                                    className="pr-5 pl-5 pt-2 pb-2 bg-indigo-500 rounded-md text-white text-sm ml-2">
                                    { isSubmitting ? '...' : 'Submit' }
                                </button>

                                <button type="reset"
                                    onClick={ resetForm }
                                    className="pr-5 pl-5 pt-2 pb-2 bg-orange-500 rounded-md text-white text-sm ml-2">
                                    Reset
                                </button>
                            </div>

                            <div className="pt-5 flex justify-end">
                                <div>
                                    <Link to="/forgot-password"
                                        className="text-sm text-blue-500 mt-3">Forgot Password</Link>
                                    <br/>                  
                                    <Link to="/signup"
                                        className="text-sm text-blue-500 mt-3">Daftar</Link>
                                </div>
                            </div>
                        </Form>
                        )
                    }
                </Formik>
            </div>
        </div>
    );
}
 
 export default Signin;
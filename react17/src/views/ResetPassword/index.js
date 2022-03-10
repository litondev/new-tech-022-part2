import React, { useState } from 'react';
import { useNavigate,Navigate, useSearchParams} from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import "./index.css";

const ResetPasswordSchema = Yup.object()
    .shape({      
        password : Yup.string()
            .min(8, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        password_confirmation: Yup.string()
            .min(8, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Required'),
        email: Yup.string()
            .email('Invalid email')
            .required('Required'),
    });

const ResetPassword = () => {

    const navigate = useNavigate();

    const [searchParams] = useSearchParams();

    const [form] = useState({
        password_confirmation : '',
        email : searchParams.get("email") || "admin@admin.com", 
        password : '',
        token : searchParams.get("token") || "12345"
    })

    const onSubmit = (values,{setSubmitting}) => {            
        window.$axios.post("/reset-password",values)
        .then(() => {
            setSubmitting(false)
            window.$toastr("success","Berhasil Reset Password")
            navigate('/signin')
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
                <h1 className="text-4xl">ResetPassword</h1>

                <Formik
                    initialValues={form}
                    validationSchema={ResetPasswordSchema}
                    onSubmit={onSubmit}>
                    {({isSubmitting,resetForm}) => (                
                        <Form>                                      
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

                            <div className="pt-5">
                                <Field 
                                    type="password" 
                                    name="password_confirmation" 
                                    placeholder="Password  Konfirmasi . . ."
                                    className="bg-white p-2 border-b-2 border-indigo-500 input-focus-gone w-full"/>

                                <ErrorMessage  
                                    name="password_confirmation" 
                                    component="div" 
                                    className="text-red-600 text-sm text-right w-full pt-3"/>
                            </div>

                            <div className="pt-5 flex justify-end">
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
                        </Form>
                        )
                    }
                </Formik>
            </div>
        </div>
    );
}
 
 export default ResetPassword;
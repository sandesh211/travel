import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {Link} from 'react-router-dom'
import "../pages/Login.css";
let Register = () => {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    confirmpassword: '',
    password: '',

  });

  const {
   
    setError,
    getValues,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm();


  const onChangeInput = (value, label) => {
    switch (label) {
      case 'name':
        if (!value) {
          setError("name", { type: "required" });
        } else {
          setValue('name', value);
          clearErrors("name");
        }
        break;

      case 'email':
        if (!value) {
          setError("email", { type: "required" });
        } else {
          setValue('email', value);
          clearErrors("email");
        }
        break;

      case 'password':
        if (!value) {
          setError("password", { type: "required" });
        } else if (value.length < 8) {
          setError("password", { type: "minLength" });
        } else {
          setValue('password', value);
          clearErrors("password");
        }
        break;

      case 'confirmpassword':
        if (!value) {
          setError("confirmpassword", { type: "required" });
        } else if (value.length < 8) {
          setError("confirmpassword", { type: "minLength" });
        } else {
          setValue('confirmpassword', value);
          clearErrors("confirmpassword");
        }
        break;
      default:
        break;
    }
  }
  const onSubmit = async (e) => {

    const data = getValues();
    if (data.password !== data.confirmpassword) {
      setError("confirmpassword", { type: "match", message: "Passwords do not match" });
      return;
    }
  };
  return (

  <section className="layout-pt-lg layout-pb-lg bg-blue-2">
  <div className="container">
    <div className="row justify-center">
      <div className="min-w-50">
        <div className="px-50 py-50 sm:px-20 sm:py-20 bg-white shadow-4 rounded-4">
          <div className="row y-gap-20">
            <div className="col-12">
              <h1 className="text-22 fw-500">Sign in or create an account</h1>
              <p className="mt-10">Already have an account? <Link to="/Login" className="text-blue-1">Log in</Link></p>
            </div>
            <div className="col-12">
              <div className="form-input ">
                <input type="text" required />
                <label className="lh-1 text-14 text-light-1">User Name</label>
              </div>
            </div>
          
            <div className="col-12">
              <div className="form-input ">
                <input type="text" required />
                <label className="lh-1 text-14 text-light-1">Email ID</label>
              </div>
            </div>
            <div className="col-12">
              <div className="form-input ">
                <input type="password" required />
                <label className="lh-1 text-14 text-light-1">Password</label>
              </div>
            </div>
            
            <div className="col-12">
              <div className="d-flex ">
                <div className="form-checkbox mt-5">
                  <input type="checkbox" name="name" />
                  <div className="form-checkbox__mark">
                    <div className="form-checkbox__icon icon-check" />
                  </div>
                </div>
                <div className="text-15 lh-15 text-light-1 ml-10">Email me exclusive Agoda promotions. I can opt out later as stated in the Privacy Policy.</div>
              </div>
            </div>
            <div className="col-12">
              <a href="#" className="button py-20 -dark-1 bg-blue-1 text-white">
                Sign In <div className="icon-arrow-top-right ml-15" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>




  );
};
export default Register;
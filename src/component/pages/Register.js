import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../../services/auth";
import "../pages/Login.css";
let Register = () => {
  const [name, setName] = React.useState();
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();
  const [confirmPassword, setConfirmPassword] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState();
  const navigate = useNavigate();

  const onSignUp = async () => {
    setLoading(true);
    setError();
    const res = await AuthService.register(
      name,
      email,
      password,
      confirmPassword
    );
    if (res.data.status !== false) {
      navigate("/Login");
    } else {
      setError(res.data.message);
    }
    setLoading(false);
  };

  return (
    <section className="layout-pt-lg layout-pb-lg bg-blue-2">
      <div className="container">
        <div className="row justify-center">
          <div className="min-w-50">
            <div className="px-50 py-50 sm:px-20 sm:py-20 bg-white shadow-4 rounded-4">
              <div className="row y-gap-20">
                <div className="col-12">
                  <h1 className="text-22 fw-500">
                    Sign in or create an account
                  </h1>
                  <p className="mt-10">
                    Already have an account?{" "}
                    <Link to="/Login" className="text-blue-1">
                      Log in
                    </Link>
                  </p>
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
                <div className="col-12">
                  <div className="form-input ">
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <label className="lh-1 text-14 text-light-1">
                      User Name
                    </label>
                  </div>
                </div>

                <div className="col-12">
                  <div className="form-input ">
                    <input
                      type="text"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <label className="lh-1 text-14 text-light-1">
                      Email ID
                    </label>
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-input ">
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <label className="lh-1 text-14 text-light-1">
                      Password
                    </label>
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-input ">
                    <input
                      type="password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <label className="lh-1 text-14 text-light-1">
                      Confirm Password
                    </label>
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
                    <div className="text-15 lh-15 text-light-1 ml-10">
                      Email me exclusive Agoda promotions. I can opt out later
                      as stated in the Privacy Policy.
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <a
                    href="#"
                    className="button py-20 -dark-1 bg-blue-1 text-white"
                    onClick={onSignUp}
                  >
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

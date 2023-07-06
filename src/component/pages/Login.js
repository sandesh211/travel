import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../../services/auth";
import { Button, ButtonGroup } from "react-bootstrap";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState();
  const [agentLogin, setAgentLogin] = React.useState(false)

  const onSignIn = async () => {
    setLoading(true);
    setError();
    const res = await AuthService.login(email, password);
    if (res.data.status !== false) {
      if (res.data.user_type === "Normal User" && agentLogin) {
        setError("Unable to login")
        return
      }
      navigate("/");
      localStorage.setItem("access_token", res.data.access_token);
      localStorage.setItem("token_type", res.data.token_type);
      localStorage.setItem("email", res.data.data.email);
      localStorage.setItem("id", res.data.data.id);
      localStorage.setItem("name", res.data.name);
      localStorage.setItem("user_type", res.data.user_type)
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
            <div></div>
            <div className="px-50 py-50 sm:px-20 sm:py-20 bg-white shadow-4 rounded-4">
              <div className="row y-gap-20">
                <div className="col-12">
                  <h1 className="text-22 fw-500">Welcome back</h1>
                  <p className="mt-10">
                    Don't have an account yet?{" "}
                    <Link to="/Register" className="text-blue-1">
                      Sign up for free
                    </Link>
                  </p>
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
                <div className="col-12">
                  <div className="form-input ">
                    <input
                      type="text"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <label className="lh-1 text-14 text-light-1">Email</label>
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
                <ButtonGroup>
                  <Button color="primary" onClick={() => setAgentLogin(false)} active={!agentLogin}>User</Button>
                  <Button color="primary" onClick={() => setAgentLogin(true)} active={agentLogin}>Agent</Button>
                </ButtonGroup>
                <div className="col-12">
                  <a href="#" className="text-14 fw-500 text-blue-1 underline">
                    Forgot your password?
                  </a>
                </div>
                <div className="col-12">
                  <div
                    className="button py-20 -dark-1 bg-blue-1 text-white"
                    onClick={onSignIn}
                  >
                    Sign In <div className="icon-arrow-top-right ml-15" />
                  </div>
                </div>
              </div>
              <div className="row y-gap-20 pt-30">
                <div className="col-12">
                  <div className="text-center px-30">
                    By creating an account, you agree to our Terms of Service
                    and Privacy Statement.
                  </div>
                </div>
              </div>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Login;

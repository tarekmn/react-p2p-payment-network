const Signup = () => {
  return (
    <>
      <div className="login-form justify-content-center d-flex">
        <form className="col-6" id="signup-form">
          <div className="d-flex justify-content-center">
            <img
              className="mb-4 center"
              src="logo-no-background.png"
              alt=""
              width="210"
              height="140"
            />
          </div>
          <h1 className="h3 mb-3 fw-normal">Create an account </h1>

          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="first_name"
              placeholder="John"
            />
            <label htmlFor="floatingInput">First name</label>
          </div>
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="last_name"
              placeholder="Doe"
            />
            <label htmlFor="floatingInput">Last name</label>
          </div>
          <div className="form-floating">
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="name@example.com"
            />
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>
          <button
            id="login-btn"
            className="w-100 btn btn-md btn-primary"
            type="submit"
          >
            Create account
          </button>
        </form>
      </div>
    </>
  );
};

export default Signup;

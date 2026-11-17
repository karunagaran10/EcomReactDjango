
import React, { useState } from "react";
// import ".index.css/";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    fullname: "",
    email: "",
    password: "",
    mobile: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password.length < 8) {
      alert("Password must be at least 8 characters!");
      return;
    }

    if (!/^[0-9]{10}$/.test(formData.mobile)) {
      alert("Enter valid 10 digit mobile number!");
      return;
    }

    alert("Registration Successful!");

    setFormData({
      username: "",
      fullname: "",
      email: "",
      password: "",
      mobile: ""
    });
  };

  return (
    <section className="register-section">

      <div className="register-container">

        <div className="register-info">
          <span className="register-tag">
            WELCOME TO OUR COMMUNITY
          </span>

          <h1>
            Create Your <span>Account</span>
          </h1>

          <p>
            Join our community and experience
            something amazing. Create your account today!
          </p>

          <div className="register-features">
            <p>✓ Easy Registration</p>
            <p>✓ Secure Account</p>
            <p>✓ User Friendly Experience</p>
          </div>
        </div>

        <div className="register-form">

          <h2>Register Now</h2>
          <p className="form-subtitle">
            Enter your details to create an account.
          </p>

          <form onSubmit={handleSubmit}>

            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                name="username"
                placeholder="Enter username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="fullname"
                placeholder="Enter full name"
                value={formData.fullname}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="Enter email address"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter password (8+ characters)"
                value={formData.password}
                onChange={handleChange}
                required
                minLength="8"
              />
            </div>

            <div className="form-group">
              <label>Mobile Number</label>
              <input
                type="tel"
                name="mobile"
                placeholder="Enter 10 digit mobile number"
                value={formData.mobile}
                onChange={handleChange}
                maxLength="10"
                required
              />
            </div>

            <button type="submit" className="register-btn">
              Create Account →
            </button>

          </form>

          <p className="login-text">
            Already have an account? <a href="/login">Login</a>
          </p>

        </div>

      </div>

    </section>
  );
}

export default Register;

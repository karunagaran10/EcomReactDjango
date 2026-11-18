
import React, { useState } from "react";

function Register() {

  const [formData, setFormData] = useState({
    username: "",
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobile: ""
  });

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Form Validation
  const handleSubmit = (e) => {
    e.preventDefault();

    // Username Validation
    if (!formData.username || !formData.fullname || !formData.email || !formData.password || !formData.confirmPassword || !formData.mobile) {
      alert("Please fill in all fields!");
      return;
    }

    // Full Name Validation
    if (!/^[A-Za-z ]+$/.test(formData.fullname.trim())) {
      alert("Enter a valid full name!");
      return;
    }

    // Email Validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      alert("Enter a valid email address!");
      return;
    }

    // Password Validation
    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (!passwordPattern.test(formData.password)) {
      alert(
        "Password must contain 8 characters, uppercase, lowercase, number and special character!"
      );
      return;
    }

    // Confirm Password Validation
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Mobile Validation
    if (!/^[6-9][0-9]{9}$/.test(formData.mobile)) {
      alert("Enter a valid 10 digit mobile number!");
      return;
    }

    // Print Form Data in Console
  console.log("Registration Details:");
  console.log("Username:", formData.username);
  console.log("Full Name:", formData.fullname);
  console.log("Email:", formData.email);
  console.log("Password:", formData.password);
  console.log("Mobile:", formData.mobile);

  console.log("Complete Form Data:", formData);

  alert("Registration Successful!");
    // Registration Success
    alert("Registration Successful!");

    // Reset Form
    setFormData({
      username: "",
      fullname: "",
      email: "",
      password: "",
      confirmPassword: "",
      mobile: ""
    });
  };

  return (
    <section className="register-section">

      <div className="register-container">

        <div className="register-info">

          <span className="register-tag">
            WELCOME TO OUR ECOM PROJECT
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

            {/* Username */}
            <div className="form-group">
              <label htmlFor="username">Username</label>

              <input
                type="text"
                name="username"
                id="username"
                placeholder="Enter username"
                value={formData.username}
                onChange={handleChange}
                // required
              />
            </div>

            {/* Full Name */}
            <div className="form-group">
              <label htmlFor="fullname">Full Name</label>

              <input
                type="text"
                name="fullname"
                id="fullname"
                placeholder="Enter full name"
                value={formData.fullname}
                onChange={handleChange}
                // required
              />
            </div>

            {/* Email */}
            <div className="form-group">
              <label htmlFor="email">Email Address</label>

              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter email address"
                value={formData.email}
                onChange={handleChange}
                // required
              />
            </div>

            {/* Password */}
            <div className="form-group">
              <label htmlFor="password">Password</label>

              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                // required
              />
            </div>

            {/* Confirm Password */}
            <div className="form-group">
              <label htmlFor="confirmPassword">
                Confirm Password
              </label>

              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handleChange}
                // required
              />
            </div>

            {/* Mobile */}
            <div className="form-group">
              <label htmlFor="mobile">Mobile Number</label>

              <input
                type="tel"
                name="mobile"
                id="mobile"
                placeholder="Enter 10 digit mobile number"
                value={formData.mobile}
                onChange={handleChange}
                maxLength="10"
                // required
              />
            </div>

            <button type="submit" className="register-btn">
              Create Account →
            </button>

          </form>

          <p className="login-text">
            Already have an account?
            <a href="/login"> Login</a>
          </p>

        </div>

      </div>

    </section>
  );
}

export default Register;

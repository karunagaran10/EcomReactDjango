
import React, { useState } from "react";
import Api from "../../Api";


function Register() {
  const [formData, setFormData] = useState({
    username: "",
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobile: ""
  });

  const [message, setMessage] = useState("");
  const [uniqueId, setUniqueId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Form Validation and Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setUniqueId("");

    // Empty Validation
    if (
      !formData.username.trim() ||
      !formData.fullname.trim() ||
      !formData.email.trim() ||
      !formData.password ||
      !formData.confirmPassword ||
      !formData.mobile.trim()
    ) {
      setMessage("Please fill in all fields!");
      return;
    }

    // Username Validation
    if (!/^[A-Za-z0-9_]{3,20}$/.test(formData.username)) {
      setMessage("Username must be 3-20 characters (letters, numbers or underscore)!");
      return;
    }

    // Full Name Validation
    if (!/^[A-Za-z ]+$/.test(formData.fullname.trim())) {
      setMessage("Enter a valid full name!");
      return;
    }

    // Email Validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setMessage("Enter a valid email address!");
      return;
    }

    // Password Validation
    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (!passwordPattern.test(formData.password)) {
      setMessage(
        "Password must contain 8 characters, uppercase, lowercase, number and special character!"
      );
      return;
    }

    // Confirm Password Validation
    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }

    // Mobile Validation
    if (!/^[6-9][0-9]{9}$/.test(formData.mobile)) {
      setMessage("Enter a valid 10 digit mobile number!");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await Api.post("register/", formData);

      // Success Message
      setMessage("Registration Successful!");

      // Unique ID from Django
      setUniqueId(response.data.unique_id);

      // Reset Form
      setFormData({
        username: "",
        fullname: "",
        email: "",
        password: "",
        confirmPassword: "",
        mobile: ""
      });

    } catch (error) {
      const responseData = error.response?.data;

      const firstFieldError =
        responseData && typeof responseData === "object"
          ? Object.values(responseData)
              .flat()
              .find((value) => typeof value === "string")
          : null;

      setMessage(
        firstFieldError || "Registration failed. Please try again."
      );

      setUniqueId("");

    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="register-section">

      <div className="register-container">

        {/* Left Information Section */}
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

        {/* Right Register Form */}
        <div className="register-form">

          <h2>Register Now</h2>

          <p className="form-subtitle">
            Enter your details to create an account.
          </p>

          {/* Success / Error Box */}
          {message && (
            <div
              className={
                uniqueId
                  ? "success-box"
                  : "error-box"
              }
              role="status"
            >

              {uniqueId ? (
                <>
                  <span className="success-icon">✓</span>

                  <h3>Registration Successful!</h3>

                  <p>
                    Your account has been created successfully.
                  </p>

                  <div className="unique-id">
                    <span>Your Unique Registration ID</span>
                    <strong>{uniqueId}</strong>
                  </div>
                </>
              ) : (
                <p>{message}</p>
              )}

            </div>
          )}

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
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="register-btn"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Creating Account..."
                : "Create Account →"}
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

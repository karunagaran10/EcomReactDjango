import React, { useEffect, useState } from "react";
import Api from "../../Api";

const emptyForm = {
  username: "",
  fullname: "",
  email: "",
  password: "",
  confirmPassword: "",
  mobile: ""
};

function Register() {
  const [formData, setFormData] = useState(emptyForm);
  const [message, setMessage] = useState("");
  const [uniqueId, setUniqueId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userdata, setUserdata] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [listError, setListError] = useState("");

  const handleChange = (event) => {
    setFormData((current) => ({
      ...current,
      [event.target.name]: event.target.value
    }));
  };

  const getUserData = async () => {
    setLoadingUsers(true);
    setListError("");

    try {
      const response = await Api.get("registerdata/");
      setUserdata(response.data);
    } catch (error) {
      setListError("Unable to load registered users.");
    } finally {
      setLoadingUsers(false);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const validateForm = () => {
    if (
      !formData.username.trim() ||
      !formData.fullname.trim() ||
      !formData.email.trim() ||
      (!editingId && (!formData.password || !formData.confirmPassword)) ||
      !formData.mobile.trim()
    ) {
      return "Please fill in all fields!";
    }

    if (!/^[A-Za-z0-9_]{3,20}$/.test(formData.username)) {
      return "Username must be 3-20 characters (letters, numbers or underscore)!";
    }

    if (!/^[A-Za-z ]+$/.test(formData.fullname.trim())) {
      return "Enter a valid full name!";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      return "Enter a valid email address!";
    }

    if (formData.password || formData.confirmPassword) {
      if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(formData.password)) {
        return "Password must contain 8 characters, uppercase, lowercase, number and special character!";
      }

      if (formData.password !== formData.confirmPassword) {
        return "Passwords do not match!";
      }
    }

    if (!/^[6-9][0-9]{9}$/.test(formData.mobile)) {
      return "Enter a valid 10 digit mobile number!";
    }

    return "";
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setUniqueId("");

    const validationError = validateForm();
    if (validationError) {
      setMessage(validationError);
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = { ...formData };
      if (editingId && !payload.password) {
        delete payload.password;
        delete payload.confirmPassword;
      }

      const response = editingId
        ? await Api.patch(`register/${editingId}/`, payload)
        : await Api.post("register/", payload);

      setMessage(editingId ? "User updated successfully!" : "Registration successful!");
      if (!editingId) {
        setUniqueId(response.data.unique_id);
      }

      setEditingId(null);
      setFormData(emptyForm);
      await getUserData();
    } catch (error) {
      const responseData = error.response?.data;
      const firstFieldError =
        responseData && typeof responseData === "object"
          ? Object.values(responseData).flat().find((value) => typeof value === "string")
          : null;
      setMessage(firstFieldError || "The request failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (user) => {
    setEditingId(user.id);
    setFormData({
      username: user.username,
      fullname: user.fullname,
      email: user.email,
      password: "",
      confirmPassword: "",
      mobile: user.mobile
    });
    setMessage("");
    setUniqueId("");
  };

  const handleDelete = async (user) => {
    if (!window.confirm(`Delete ${user.fullname}?`)) {
      return;
    }

    try {
      await Api.delete(`register/${user.id}/`);
      setMessage("User deleted successfully!");
      setUniqueId("");
      await getUserData();
    } catch (error) {
      setMessage("Unable to delete the user.");
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData(emptyForm);
    setMessage("");
  };

  return (
    <>
      <section className="register-section">
        <div className="register-container">
          <div className="register-info">
            <span className="register-tag">WELCOME TO OUR ECOM PROJECT</span>
            <h1>{editingId ? "Update" : "Create Your"} <span>Account</span></h1>
            <p>Join our community and manage account details in one place.</p>
            <div className="register-features">
              <p>Easy Registration</p>
              <p>Secure Account</p>
              <p>User Friendly Experience</p>
            </div>
          </div>

          <div className="register-form">
            <h2>{editingId ? "Edit User" : "Register Now"}</h2>
            <p className="form-subtitle">
              {editingId ? "Update the selected account details." : "Enter your details to create an account."}
            </p>

            {message && (
              <div className={uniqueId ? "success-box" : "error-box"} role="status">
                {uniqueId ? (
                  <>
                    <span className="success-icon">✓</span>
                    <h3>Registration Successful!</h3>
                    <p>Your account has been created successfully.</p>
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
              {[
                ["username", "Username", "text", "Enter username"],
                ["fullname", "Full Name", "text", "Enter full name"],
                ["email", "Email Address", "email", "Enter email address"],
                ["password", editingId ? "New Password (optional)" : "Password", "password", "Enter password"],
                ["confirmPassword", "Confirm Password", "password", "Confirm password"],
                ["mobile", "Mobile Number", "tel", "Enter 10 digit mobile number"]
              ].map(([name, label, type, placeholder]) => (
                <div className="form-group" key={name}>
                  <label htmlFor={name}>{label}</label>
                  <input
                    type={type}
                    name={name}
                    id={name}
                    placeholder={placeholder}
                    value={formData[name]}
                    onChange={handleChange}
                    maxLength={name === "mobile" ? 10 : undefined}
                  />
                </div>
              ))}

              <button type="submit" className="register-btn" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : editingId ? "Update Account" : "Create Account"}
              </button>

              {editingId && (
                <button type="button" className="cancel-btn" onClick={cancelEdit}>
                  Cancel Edit
                </button>
              )}
            </form>
          </div>
        </div>
      </section>

      <section className="users-section">
        <div className="users-container">
          <div className="users-header">
            <div>
              <span className="users-tag">CRUD DIRECTORY</span>
              <h2>Registered Users</h2>
            </div>
            <button type="button" className="refresh-btn" onClick={getUserData}>
              Refresh
            </button>
          </div>

          {loadingUsers && <p className="users-status">Loading users...</p>}
          {listError && <p className="users-status users-error">{listError}</p>}

          {!loadingUsers && !listError && (
            <div className="users-table-wrap">
              <table className="users-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Username</th>
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>Mobile</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {userdata.map((user) => (
                    <tr key={user.id}>
                      <td>USER-{String(user.id).padStart(4, "0")}</td>
                      <td>{user.username}</td>
                      <td>{user.fullname}</td>
                      <td>{user.email}</td>
                      <td>{user.mobile}</td>
                      <td>
                        <button type="button" className="edit-btn" onClick={() => handleEdit(user)}>Edit</button>
                        <button type="button" className="delete-btn" onClick={() => handleDelete(user)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                  {userdata.length === 0 && (
                    <tr>
                      <td colSpan="6" className="empty-users">No registered users found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default Register;


import React, { useState, useEffect } from "react";
import "./pages.css";

function Info() {

  const [info, setInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {

    fetch("http://localhost:8001/api/")

      .then((response) => {
        if (!response.ok) {
          throw new Error("API Error");
        }
        return response.json();
      })

      .then((data) => {
        console.log(data);

        // API returns an array
        setInfo(Array.isArray(data) ? data : data.results || []);
      })

      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Unable to fetch employee details.");
      })

      .finally(() => {
        setLoading(false);
      });

  }, []);

  return (
    <div className="employee-container">

      <div className="employee-header">

        <span className="header-tag">
          EMPLOYEE MANAGEMENT
        </span>

        <h1>Employee Information</h1>

        <p>
          Manage and view all employee details in one place.
        </p>

      </div>

      <div className="employee-stats">

        <h3>Total Employees</h3>

        <h2>{info.length}</h2>

      </div>

      {loading && <h2>Loading employees...</h2>}

      {error && <p>{error}</p>}

      {!loading && !error && (

        <div className="employee-grid">

          {info.length > 0 ? (

            info.map((item) => (

              <div className="employee-card" key={item.id}>

                <div className="employee-top">

                  <div className="employee-avatar">
                    {item.empname?.charAt(0).toUpperCase()}
                  </div>

                  <span className="employee-id">
                    ID: {item.id}
                  </span>

                </div>

                <h2>{item.empname}</h2>

                <p className="employee-role">
                  {item.emprole}
                </p>

                <div className="employee-divider"></div>

                <div className="employee-salary">

                  <span>MONTHLY SALARY</span>

                  <h3>
                    ₹{Number(item.empsalary).toLocaleString("en-IN")}
                  </h3>

                </div>

                <div className="employee-status">
                  <span></span>
                  Active Employee
                </div>

              </div>

            ))

          ) : (

            <p>No employees found.</p>

          )}

        </div>

      )}

    </div>
  );
}

export default Info;

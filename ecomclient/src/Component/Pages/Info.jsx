import React, { useState, useEffect } from "react";
import './pages.css';
function Info() {

  const [info, setInfo] = useState([]);

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
        setInfo(data);
      })

      .catch((error) => {
        console.error("Error fetching data:", error);
      });

  }, []);

  return (
    <div className="App">

      <h1>Welcome to E-commerce Application</h1>

      {info.map((item) => (

        <div key={item.id}>

          <h2>Employee Name: {item.empname}</h2>
          <p>Role: {item.emprole}</p>
          <p>Salary: ₹{item.empsalary}</p>

        </div>

      ))}

    </div>
  );
}

export default Info;
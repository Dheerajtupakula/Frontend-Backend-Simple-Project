import React, { useState, useEffect } from "react";
import "./app.css";

const App = () => {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
  });
  useEffect(() => {
    async function getResponse() {
      try {
        const response = await fetch("http://localhost:5000/products");
        const responseData = await response.json();

        setData(responseData.products);
      } catch (error) {
        console.log({ message: error });
      }
    }
    getResponse();
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setFormData({
      name: "",
      price: "",
    });

    async function sendResponse() {
      try {
        const response = await fetch("http://localhost:5000/products", {
          method: "POST",
          body: JSON.stringify(formData),
          headers: { "Content-Type": "application/json" },
        });
      } catch (error) {
        console.log({ message: error });
      }
    }

    sendResponse();
  };

  return (
    <>
      <h4>Create New Item</h4>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
        />
        <br />
        <input
          type="text"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
        />
        <br />
        <button type="submit">Create One</button>
      </form>
      <div className="display-items">
        {data.map((item) => (
          <span key={item.id}>
            <h5>{item.name}</h5>
            <p>${item.price}</p>
          </span>
        ))}
      </div>
    </>
  );
};

export default App;

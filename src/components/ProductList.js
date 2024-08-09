import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem('authToken'); // Ensure this key matches
  // Correctly storing the token in localStorage
  localStorage.setItem("token", token);

  useEffect(() => {
    console.log('Fetching products...');
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const response = await fetch("http://localhost:5000/products", {
        headers: {
          'Authorization': `Bearer ${token}`, // Include token in headers
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 401) {
        console.error("Unauthorized access. Please log in.");
        return;
      }
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/products/${id}`, {
        method: "DELETE",
        headers: {
          'Authorization': `Bearer ${token}`, // Include token in headers
          'Content-Type': 'application/json',
        }
      });
      if (response.status === 401) {
        console.error("Unauthorized access. Please log in.");
        return;
      }
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const result = await response.json();
      if (result) {
        getProducts();
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const searchHandle = async (event) => {
    let key = event.target.value;
    if (key) {
      try {
        const response = await fetch(`http://localhost:5000/search/${key}`, {
          headers: {
            'Authorization': `Bearer ${token}`, // Include token in headers
            'Content-Type': 'application/json',
          }
        });
        if (response.status === 401) {
          console.error("Unauthorized access. Please log in.");
          return;
        }
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const result = await response.json();
        if (result) {
          setProducts(result);
        }
      } catch (error) {
        console.error("Error searching products:", error);
      }
    } else {
      getProducts();
    }
  };

  return (
    <div className="product-list">
      <h3>Product List</h3>
      <input
        type="text"
        className="search-product-box"
        placeholder="SEARCH PRODUCT"
        onChange={searchHandle}
      />
      <ul>
        <li>S.NO</li>
        <li>Name</li>
        <li>Price</li>
        <li>Category</li>
        <li>Operation</li>
      </ul>
      {products.length > 0 ? (
        products.map((item, index) => (
          <ul key={item._id}>
            <li>{index + 1}</li>
            <li>{item.name}</li>
            <li>${item.price}</li>
            <li>{item.category}</li>
            <li>
              <button onClick={() => deleteProduct(item._id)}>Delete</button>
              <Link to={`/update/${item._id}`}> Update</Link>
            </li>
          </ul>
        ))
      ) : (
        <h1>No results found</h1>
      )}
    </div>
  );
};

export default ProductList;

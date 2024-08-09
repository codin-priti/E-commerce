import React, { useEffect } from "react";
import { useParams,useNavigate,json } from "react-router-dom";

const UpdateProduct = () => {
    const [name, setName] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [Company, setCompany] = React.useState('');
    const [Category, setCategory] = React.useState('');
    const params = useParams();
    const navigate =useNavigate();

    useEffect(() => {

        getProductDetails();
    }, [])


    const getProductDetails = async () => {
        console.warn(params)
        let result = await fetch('http://localhost:5000/products/$(params.id');
        result = await result.json();
        console.warn(result)
        setName(result.name);
        setPrice(result.price);
        setCategory(result.Category)
        setCompany(result.Company)

    }
    const updateProduct = async () => {
        console.warn(name, price, Category, Company)
        let result = await fetch('http://localhost:5000/products/$(params.id)', {
            method: 'Put',
            body: json.stringify({ name, price, Category, Company }),
            headers: {
                'Content-Type': "application/json"
            }

        });
        result = await result.json()
        console.warn(result)
        navigate('/')

    }


    return (
        <div className="product">
            <h1>Update Product</h1>
            <input type="text" placeholder="Enter the Product Name" className="inputBox"
                value={name} onChange={(e) => { setName(e.target.value) }} />



            <input type="text" placeholder="Enter the Product Price" className="inputBox"
                value={price} onChange={(e) => { setPrice(e.target.value) }} />



            <input type="text" placeholder="Enter the Product Category" className="inputBox"
                value={Category} onChange={(e) => { setCategory(e.target.value) }} />



            <input type="text" placeholder="Enter the Product Company" className="inputBox"
                value={Company} onChange={(e) => { setCompany(e.target.value) }} />



            <button onClick={updateProduct} className=".appButton">UpdateProduct </button>
        </div>
    )
}

export default UpdateProduct;
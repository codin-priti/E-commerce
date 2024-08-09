import React from "react";

const AddProduct = () => {
    const [name, setName] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [Company, setCompany] = React.useState('');
    const [Category, setCategory] = React.useState('');
    const [error, setError] = React.useState(false)
    const addProduct = async () => {

        console.warn(!name);
        if (!name || !price || !Category || !Company) {
            setError(true)
            return false;
        }

        const userId = JSON.parse(localStorage.getItem('user'))._id;
        let result = await fetch("http://localhost:5000/add-product", {
            method: 'post',
            body: JSON.stringify({ name, price, Category, Company, userId }),
            headers: {
                "Content-Type": "application/json"
            }
        });
        result = await result.json();
        console.warn(result)

    }


    return (
        <div className="product">
            <h1>AddProduct</h1>
            <input type="text" placeholder="Enter the Product Name" className="inputBox"
                value={name} onChange={(e) => { setName(e.target.value) }} />

            {error && !name && <span className="invalid-input">Enter valid name</span>}

            <input type="text" placeholder="Enter the Product Price" className="inputBox"
                value={price} onChange={(e) => { setPrice(e.target.value) }} />

            {error && !price && <span className="invalid-input">Enter correct price</span>}

            <input type="text" placeholder="Enter the Product Category" className="inputBox"
                value={Category} onChange={(e) => { setCategory(e.target.value) }} />

            {error && !Category && <span className="invalid-input">Enter valid Category</span>}

            <input type="text" placeholder="Enter the Product Company" className="inputBox"
                value={Company} onChange={(e) => { setCompany(e.target.value) }} />

            {error && !Company && <span className="invalid-input">Enter valid Company</span>}

            <button onClick={addProduct} className=".appButton">AddProduct </button>
        </div>
    )
}

export default AddProduct;
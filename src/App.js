import './App.css';
import Nav from './components/Nav.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer.js';
import Signup from './components/Signup.js';
import PrivateComponent from './components/privatecomponent.js'; // Ensure correct case
import Login from './components/Login.js';
import AddProduct from './components/AddProduct.js';
import ProductList from './components/ProductList.js';
import UpdateProduct from './components/UpdateProduct.js';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route element={<PrivateComponent />}>
            <Route path="/products" element={<ProductList />} />
            <Route path="/add" element={<AddProduct />} />
            <Route path="/update/:id" element={<UpdateProduct />} />
            <Route path="/logout" element={<h1>Logout Component</h1>} />
            <Route path="/profile" element={<h1>Profile Component</h1>} />
            <Route path="/" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Route>

        </Routes>
      </BrowserRouter>
      <Footer />

    </div>
  );
}

export default App;

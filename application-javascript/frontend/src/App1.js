import React from 'react';
import './App.css';
import ProductForm from './ProductForm';
import ProductQuery from './ProductQuery';

function App() {
    return (
        <div className="App">
           
                <h1>Product Tracking</h1>
       
            <ProductForm />
            <ProductQuery />
        </div>
    );
}

export default App;

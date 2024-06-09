import React, { useState } from 'react';
import axios from 'axios';

function ProductQuery() {
    const [id, setId] = useState('');
    const [product, setProduct] = useState(null);

    const handleChange = (e) => {
        setId(e.target.value);
    };

    const handleQuery = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/queryProduct/${id}`);
            setProduct(response.data);
        } catch (error) {
            console.error('Error querying product', error);
            alert('Failed to query product');
        }
    };

    return (
        <div>
            <div>
                <label>ID:</label>
                <input type="text" value={id} onChange={handleChange} />
                <button onClick={handleQuery}>Query Product</button>
            </div>
            {product && (
                <div>
                    <h3>Product Details</h3>
                    <p>ID: {product.id}</p>
                    <p>Name: {product.name}</p>
                    <p>Owner: {product.owner}</p>
                    <p>Location: {product.location}</p>
                    <p>Timestamp: {product.timestamp}</p>
                </div>
            )}
        </div>
    );
}

export default ProductQuery;

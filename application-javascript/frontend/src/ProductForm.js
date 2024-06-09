import React, { useState } from 'react';
import axios from 'axios';

function ProductForm() {
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        owner: '',
        location: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3001/createProduct', formData);
            alert('Product created successfully');
        } catch (error) {
            console.error('Error creating product', error);
            alert('Failed to create product');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>ID:</label>
                <input type="text" name="id" value={formData.id} onChange={handleChange} required />
            </div>
            <div>
                <label>Name:</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div>
                <label>Owner:</label>
                <input type="text" name="owner" value={formData.owner} onChange={handleChange} required />
            </div>
            <div>
                <label>Location:</label>
                <input type="text" name="location" value={formData.location} onChange={handleChange} required />
            </div>
            <button type="submit">Create Product</button>
        </form>
    );
}

export default ProductForm;

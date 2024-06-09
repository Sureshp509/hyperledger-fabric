// src/components/AssetForm.js
import React, { useState, useEffect } from 'react';
import { createAsset, updateAsset } from '../services/api';
import 'bootstrap/dist/css/bootstrap.min.css';

const AssetForm = ({ selectedAsset, clearSelection }) => {
    const [asset, setAsset] = useState({ name: '', color: '', size: '', owner: '', appraisedValue: '' });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (selectedAsset) {
            setAsset(selectedAsset);
        }
    }, [selectedAsset]);

    const handleChange = (e) => {
        setAsset({ ...asset, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (asset.ID) {
                const response =await updateAsset(asset.ID, asset);
                setMessage(response.data.message);
            } else {
                const response =await createAsset(asset);
                setMessage(response.data.message);
            }
            clearSelection();
        } catch (error) {
            console.error('Error:', error);
            setError(error.response ? error.response.data.error : 'Failed to perform asset operation');

        }
    };

    return (
        <div className="container">
            <h2 className="my-4">{asset.ID ? 'Edit Asset' : 'Add Asset'}</h2>
            {message && <div className="alert alert-success">{message}</div>}
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Id</label>
                    <input type="text" className="form-control" name="id" value={asset.ID} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Color</label>
                    <input type="text" className="form-control" name="color" value={asset.color} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Size</label>
                    <input type="text" className="form-control" name="size" value={asset.size} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Owner</label>
                    <input type="text" className="form-control" name="owner" value={asset.owner} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Value</label>
                    <input type="text" className="form-control" name="appraisedValue" value={asset.appraisedValue} onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-primary">{asset.ID ? 'Update' : 'Add'}</button>
                {asset.ID && <button type="button" className="btn btn-secondary ml-2" onClick={clearSelection}>Cancel</button>}
            </form>
        </div>
    );
};

export default AssetForm;

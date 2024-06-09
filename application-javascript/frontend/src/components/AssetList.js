// src/components/AssetList.js
import React, { useEffect, useState } from 'react';
import { getAssets, deleteAsset } from '../services/api';
import 'bootstrap/dist/css/bootstrap.min.css';

const AssetList = ({ selectAsset }) => {
    const [assets, setAssets] = useState([]);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        loadAssets();
    }, []);

    const loadAssets = async () => {
        try {
            const result = await getAssets();
            setAssets(result.data);
        } catch (error) {
            console.error('Failed to load assets:', error);
            setError('Failed to load assets. Please try again.');
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteAsset(id);
            setMessage('Asset deleted successfully.');
            loadAssets();
        } catch (error) {
            console.error('Failed to delete asset:', error);
            setError('Failed to delete asset. Please try again.');
        }
    };

    // const clearMessages = () => {
    //     setMessage('');
    //     setError('');
    // };

    return (
        <div className="container">
            <h2 className="my-4">Assets</h2>
            {message && <div className="alert alert-success">{message}</div>}
            {error && <div className="alert alert-danger">{error}</div>}
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Color</th>
                        <th>Size</th>
                        <th>Owner</th>
                        <th>Value</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {assets.map((asset) => (
                        <tr key={asset.ID}>
                            <td>{asset.ID}</td>
                            <td>{asset.Color}</td>
                            <td>{asset.Size}</td>
                            <td>{asset.Owner}</td>
                            <td>{asset.AppraisedValue}</td>
                            <td>
                                <button className="btn btn-primary" onClick={() => selectAsset(asset)}>Edit</button>
                                <button className="btn btn-danger ml-2" onClick={() => handleDelete(asset.ID)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AssetList;

// src/App.js
import React, { useState } from 'react';
import AssetList from './components/AssetList';
import AssetForm from './components/AssetForm';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const [selectedAsset, setSelectedAsset] = useState(null);

    const selectAsset = (asset) => {
        setSelectedAsset(asset);
    };

    const clearSelection = () => {
        setSelectedAsset(null);
    };

    return (
        <div className="App">
            <div className="container">
                <AssetForm selectedAsset={selectedAsset} clearSelection={clearSelection} />
                <AssetList selectAsset={selectAsset} />
            </div>
        </div>
    );
}

export default App;

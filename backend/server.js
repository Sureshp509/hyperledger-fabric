// server.js or app.js

const express = require('express');
const bodyParser = require('body-parser');
const { Gateway, Wallets } = require('fabric-network');
const fs = require('fs');
const path = require('path');
const cors=require('cors');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());
async function main() {
    // Connect to Fabric network
   // const ccpPath = path.resolve(__dirname, '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
   const ccpPath = path.resolve(__dirname,  'connection.json');

    const ccpJSON = fs.readFileSync(ccpPath, 'utf8');
    const ccp = JSON.parse(ccpJSON);

    const walletPath = path.join(process.cwd(), 'wallet');
    const wallet = await Wallets.newFileSystemWallet(walletPath);

    const gateway = new Gateway();
    await gateway.connect(ccp, {
        wallet,
        identity: 'javascriptAppUser',
        discovery: { enabled: true, asLocalhost: true }
    });

    const network = await gateway.getNetwork('mychannel');
    const contract = network.getContract('basic');

    // REST API endpoints
    app.post('/api/assets', async (req, res) => {
        try {
            const { id, color, size, owner, appraisedValue } = req.body;
            await contract.submitTransaction('CreateAsset', id, color, size, owner, appraisedValue);
            res.status(201).json({ message: 'Asset created successfully' });
        } catch (error) {
            console.error(`Failed to create asset: ${error}`);
            res.status(500).json({ error: 'Failed to create asset' });
        }
    });

    app.get('/api/assets', async (req, res) => {
        try {
            const result = await contract.evaluateTransaction('GetAllAssets');
            res.json(JSON.parse(result.toString()));
        } catch (error) {
            console.error(`Failed to query assets: ${error}`);
            res.status(500).json({ error: 'Failed to query assets' });
        }
    });

    app.get('/api/assets/:id', async (req, res) => {
        try {
            const { id } = req.params;
            const result = await contract.evaluateTransaction('ReadAsset', id);
            res.json(JSON.parse(result.toString()));
        } catch (error) {
            console.error(`Asset not found: ${error}`);
            res.status(500).json({ error: 'Asset not found' });
        }
    });
    
    app.put('/api/assets/:id', async (req, res) => {
        try {
            const { id } = req.params;
            const { color, size, owner, appraisedValue } = req.body;
            await contract.submitTransaction('UpdateAsset', id, color, size, owner, appraisedValue);
            res.status(200).json({ message: 'Asset updated successfully' });
        } catch (error) {
            console.error(`Failed to update asset: ${error}`);
            res.status(500).json({ error: 'Failed to update asset' });
        }
    });

    app.put('/api/assets/transfer/:id', async (req, res) => {
        try {
            const { id } = req.params;
            const { owner } = req.body;
            await contract.submitTransaction('TransferAsset', id, owner);
            res.status(200).json({ message: 'Asset transferred successfully' });
        } catch (error) {
            console.error(`Failed to update asset: ${error}`);
            res.status(500).json({ error: 'Failed to transfer asset' });
        }
    });
    

    app.delete('/api/assets/:id', async (req, res) => {
        try {
            const { id } = req.params;
            await contract.submitTransaction('DeleteAsset', id);
            res.status(200).json({ message: 'Asset deleted successfully' });
        } catch (error) {
            console.error(`Failed to delete asset: ${error}`);
            res.status(500).json({ error: 'Failed to delete asset' });
        }
    });
    

    // Start server
    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
    });
}

main().catch((err) => {
    console.error('Failed to start server:', err);
    process.exit(1);
});

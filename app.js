const express = require('express');
const mustacheExpress = require('mustache-express');
const axios = require('axios');

const app = express();
const apiURL = 'https://opensheet.elk.sh/18MGJ38Di4LcaUr5VDfmfhzYsXnrvn-vkpOqs8tgkuws/api';

// Set up Mustache as the template engine
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/templates');

// Root route - displays all artworks
app.get('/', async (req, res) => {
    try {
        const { data } = await axios.get(apiURL);
        res.render('index', { artworks: data });
    } catch (error) {
        res.status(500).send('Error fetching data');
    }
});

// Artwork route - displays details of a specific artwork by ID
app.get('/:id', async (req, res) => {
    try {
        const { data } = await axios.get(apiURL);
        const artwork = data.find(item => item.ID === req.params.id);
        if (artwork) {
            res.render('artwork', { artwork });
        } else {
            res.status(404).send('Artwork not found');
        }
    } catch (error) {
        res.status(500).send('Error fetching data');
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});

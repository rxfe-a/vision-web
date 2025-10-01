const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 8080;

let scripts = {};

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.get('/key/:id', (req, res) => {
    const gameId = req.params.id;
    const script = scripts[gameId] || '';
    res.send(script);
});

app.post('/key/:id', (req, res) => {
    const gameId = req.params.id;
    const script = req.body.script;

    if (!gameId) {
        res.status(400).send('No Game ID Specified');
        return;
    }

    scripts[gameId] = script;
    res.send('Succesfully Executed');
});

app.listen(port, () => {
    console.log('Warning Vision will be entirely rewritten soon from scratch please make sure to keep your repository updated to the latest version.')
    console.log(`Server is listening on port ${port}`);
});

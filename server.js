const express = require('express');
const app = express();

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('portal');
});

app.listen(8000, () => {
    console.log('Portal Tugas berjalan di http://localhost:8000');
});
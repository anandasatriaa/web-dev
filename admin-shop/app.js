const express = require('express');
const bodyParser = require('body-parser');
const { Product, Stock, Purchase } = require('./models');
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
    try {
        const products = await Product.findAll();
        const purchases = await Purchase.findAll({ 
            include: [Product],
            order: [['createdAt', 'DESC']] 
        });

        const inventoryData = await Product.findAll({
            include: [
                { model: Stock },
                { model: Purchase }
            ]
        });

        res.render('admin', { products, purchases, inventoryData });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.post('/purchase', async (req, res) => {
    const { product_id, qty } = req.body;
    await Purchase.create({ product_id, qty, status: 'success' });
    const stock = await Stock.findOne({ where: { product_id } });
    await stock.update({ qty: stock.qty - parseInt(qty) });
    res.redirect('/');
});

app.post('/cancel/:id', async (req, res) => {
    const purchase = await Purchase.findByPk(req.params.id);
    if (purchase && purchase.status !== 'cancelled') {
        await purchase.update({ status: 'cancelled' });
        const stock = await Stock.findOne({ where: { product_id: purchase.product_id } });
        await stock.update({ qty: stock.qty + purchase.qty });
    }
    res.redirect('/');
});

app.listen(3001, () => console.log('Server running on http://localhost:3001'));
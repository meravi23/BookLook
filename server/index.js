
const fs = require('fs').promises; // a node library that can access files
const bodyParser = require('body-parser'); // required in order to read the body of POST
const express = require('express'); // the express library enables creating a server
const port = 8000;
const fileName = 'sellersServer.json';

// with express framework:

const app = express(); // "create a server called 'express' / enable the 'express' library over varialble 'app' / create an application run by express"
app.use(bodyParser.json()); // called also express.js "middleware"


app.get('/sellers', async (req, res) => {
    // store.save();
    res.json(await store.read());
})

app.get('sellers/:id', async (req, res) => {
    const sellers = await store.read();
    const seller = sellers.find(seller => seller.id === parseInt(req.params.id));
    res.json(seller);
}); 

app.post('/sellers', async (req, res) => {
    const seller = req.body;
    seller.id = await store.getNextSellerId();
    store.sellers.push(seller);
    await store.save();
    //res.send('here\'s your post'); // do not use console.log for app.post - it'll get stuck
    res.json('item added');
});

// list of **params** can be extended this way: '/sellers/:id/:title/:address'
app.put('/sellers/:id', async (req, res) => {
    const index = await store.getIndexById(req.params.id);
    // destruction of variables פירוק:
    // const {name, city} = req.body;
    // const seller = store.sellers[index];
    // seller.name = name;
    // seller.city = city;
    store.sellers[index] = req.body;
    store.sellers[index].id = req.params.id;
    await store.save();
    res.json('item updated');
});

app.delete('/sellers/:id', async (req, res) => {
    const i = await store.getIndexById(req.params.id);
    store.sellers.splice(i, 1);
    await store.save();
    res.json('item deleted');
});

app.listen(port, () => {
    console.log('listening on port localhost:8000');
});

const initialSellers = [{
    "name": "Safranski",
    "city": "Rishon LeTsiyon",
    "address": "12 Allenby St.",
    "payment-options": ["מזומן", "כרטיסי אשראי"],
    "delivery-options": ["דואר רשום", "שליח"]
}]

const store = {
    async read() {
        try {
            // 'await' because it's an async order. 'async' and 'await' should always be paired.
            await fs.access(fileName); // await untill accessing file
            // fetching array from file:
            this.sellers = JSON.parse((await fs.readFile(fileName)).toString()); // without toString() it remains a buffer code
        } catch (e) {
            this.sellers = initialSellers;
        }
        return this.sellers;
    },

    async save() {
        await fs.writeFile(fileName, JSON.stringify(this.sellers)); // this.sellers == store.sellers
    },

    async getNextSellerId() {
        let maxId = 0;
        const sellers = await this.read();
        sellers.forEach(seller => {
            if (seller.id > maxId) {
                maxId = seller.id;
            }
        });
        return ++maxId;
    },

    async getIndexById(id) {
        try {
            const sellers = await this.read();
            return sellers.findIndex(sellers => sellers.id === +id);
        } catch (e) {
            console.log('error getting id');
        }
    },

    sellers: []
}
const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const connectDB = require('./server/config/db');

const mongoose = require('mongoose');
const { sampleUsers, sampleOrders, sampleUpdates } = require('./server/sample');
const User = require('./server/models/User');
const Order = require('./server/models/Order');
const Update = require('./server/models/Update');

const PORT = 3000;

connectDB();

async function createSample() {
    await User.deleteMany(); // Clear existing
    await Order.deleteMany();
    await Update.deleteMany();

    await User.insertMany(sampleUsers);
    await Order.insertMany(sampleOrders);
    await Update.insertMany(sampleUpdates);
}

createSample().catch(console.error);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.engine('hbs', engine({
    extname : '.hbs', 
    defaultLayout: 'main',
    partialsDir: path.join(__dirname, 'views/partials'),
    layoutsDir: path.join(__dirname, 'views/layouts'),
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    }
}));

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.set('view engine', 'hbs');

app.use('/', require('./server/routes/main.js'));
app.use('/tracker', require('./server/routes/tracking.js'));
app.use('/admin', require('./server/routes/admin.js'));

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}...`);
})

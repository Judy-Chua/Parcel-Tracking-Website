require('dotenv').config();
const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const connectDB = require('./server/config/db');

const mongoose = require('mongoose');
const { employeeUsers } = require('./server/user');
const User = require('./server/models/User');
const Order = require('./server/models/Order');
const Update = require('./server/models/Update');

const Sessions =  require('./server/models/Sessions.js');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');

const PORT = 3000;

//connectDB();
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://galaxymate77:rDRMxRMUzKNzX7NM@parcel-track.ajsas.mongodb.net/?retryWrites=true&w=majority&appName=Parcel-Track";


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

async function createSample() {
    const existingUsers = await User.countDocuments();

    if (existingUsers === 0) {
        await User.insertMany(employeeUsers);
    }
}

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl : process.env.MONGODB_URI,
        mongoOptions: {
            useNewUrlParser: true,
        },
        cookie : {
            maxAge: (req,res) => {
                if(req.user && req.user.rememberme){
                    console.log("inside")
                    return 24 * 60 * 60 * 1000
                } else {
                    console.log("inside")
                    return null
                }
            },
            expires: false
        },
        collectionName:  'sessions'
    })
}))

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



require('./server/config/passport.js');
app.use(passport.initialize());
app.use(passport.session());

app.use('/', require('./server/routes/main.js'));
app.use('/search_parcel', require('./server/routes/tracking.js'));
app.use('/admin', require('./server/routes/admin.js'));

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}...`);
})

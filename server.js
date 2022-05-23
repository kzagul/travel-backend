const express = require("express");
const bodyParser = require("body-parser"); 
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));


app.use(express.json());  


app.use(express.urlencoded({ extended: true }));   
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
const Role = db.role;

db.sequelize.sync();



// routes
const TypeOfVisiting = require('./app/routes/typeofvisiting.routes.js')
const TypeOfExcursion = require('./app/routes/typeofexcursion.routes.js')
const Excursion = require('./app/routes/excursion.routes')

app.use('/api', TypeOfVisiting)
app.use('/api', TypeOfExcursion)
app.use('/api', Excursion)



//url links
app.use(cors())
app.use(express.json())





app.get("/", (req, res) => {
  res.json({ 
    message: "Travelblog application by K.Zagul, O.Savenko, A.Gushenko",
    Excursions: {
      getAll: "http://localhost:3002/api/excursions"
    },
    TypesOfVisitings: {
      getAll:  "http://localhost:3002/api/typevisiting"
    },
    TypesOfExcursions: {
      getAll:  "http://localhost:3002/api/typeexcursion"  
    }
  });
});



// // routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);



// set port, listen for requests
const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


function initial() {
  Role.create({
    id: 1,
    name: "user"
  });
 
  Role.create({
    id: 2,
    name: "moderator"
  });
 
  Role.create({
    id: 3,
    name: "admin"
  });
}
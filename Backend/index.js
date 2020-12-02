const express = require("express");
const app = express();
const port = 8000;
const cors = require("cors");
const { Sequelize, DataTypes, json } = require("sequelize");
app.use(express.json());
app.use(cors());
const db = new Sequelize("[RDBMS]://[USERNAME]:[PASSWORD]@localhost:[STANDARD DATABASE PORT]/[DATABASE NAME]");

const parts = db.define("parts", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  make: {
    type: DataTypes.STRING,
  },
  model: {
    type: DataTypes.STRING,
  },
  part: {
    type: DataTypes.STRING,
  },
  year: {
    type: DataTypes.INTEGER,
  },
  quantity: {
    type: DataTypes.INTEGER,
  },
});

const users = db.define("users", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },

  password: {
    type: DataTypes.STRING,
  },
});

let dbConnect = async function () {
  try {
    await db.authenticate().then(
      /*async*/ () => {
        db.sync();
        console.log(parts == db.models.parts);
        console.log(users == db.models.users);
        //await users.create({ id: 1, password: "password" });
      }
    );
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

dbConnect();

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

app.post("/login", async (req, res) => { // LOGIN END POINT
  let username = req.body.user + "";
  let pass = req.body.password + "";
  console.log(`Username: ${username}\nPassword: ${pass}`);
  account = await users.findOne({
    where: {
      id: username,
      password: pass,
    },
  });

  if (account == null) {
    res.end(JSON.stringify({ success: false, status: 401 }));
  } else {
    res.end(JSON.stringify({ success: true, status: 200 }));
  }
});

app.get("/getParts", async (req, res) => { // GET ALL PARTS
  console.log(req.body);
  Parts = await parts.findAll().then((parts) => {
    res.end(JSON.stringify({ success: true, status: 200, parts: parts }));
  });
});

app.get("/carMake", async (req, res) => { // GET CAR MAKERS
  await db.query("select distinct make from parts").then((makes) => {
    res.end(JSON.stringify({ success: true, status: 200, makes: makes[0] }));
  });
});

app.post("/getParts", async (req, res) => { // GET PARTS BY CAR MAKE
  carMake = req.body.make + "";
  carMake = carMake.toLowerCase();
  await db
    .query(
      `select make, model, part, year, quantity from parts where make = '${carMake}'`
    )
    .then((Parts) => {
      res.end(JSON.stringify({ success: true, status: 200, parts: Parts[0] }));
    });
});

app.get("/getPart", async (req, res) => { // GET ONE PART BY MAKE, MODEL, PART
  console.log(req.body);
  let make = req.body.make + "";
  let model = req.body.model + "";
  let part = req.body.part + "";
  carParts = await parts.findAll({
    where: {
      make: make.toLowerCase(),
      model: model.toLowerCase(),
      part: part.toLowerCase(),
    },
  });

  res.end(
    JSON.stringify({
      success: true,
      code: 200,
      carParts: carParts,
    })
  );
});


app.post("/addPart", async (req, res) => { // ADD PART
  let make = req.body.make + "";
  let model = req.body.model + "";
  let part = req.body.part + "";
  let year = req.body.year + "";
  let quantity = req.body.quantity + "";
  Part = {
    make: make.toLowerCase(),
    model: model.toLowerCase(),
    part: part.toLowerCase(),
    year: year.toLowerCase(),
    quantity: quantity.toLowerCase(),
  };

  parts.create(Part);
  console.log(
    `Make: ${make}\nModel: ${model}\nYear: ${year}\nPart: ${part}\nQuantity: ${quantity}`
  );
  console.log("HEADERS: " + req.header("Content-Type"));
  res.end(JSON.stringify({ success: true, status: 200, part: Part }));
});

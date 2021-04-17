const express = require('express');
//init the express js

const bodyParser = require('body-parser');
//init the body-parser

const app = express();
//assign a variable to express()

app.use(bodyParser.urlencoded({
  extended: true
}))
// made my app use the bodyParser;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html") // sending our HTML file  to the first page of web app
})
// make the app get the refrences and send the refrences from server
//in line 13 the "/" means the root and the home page

app.post("/", function(req, res) {

  var num1 = Number(req.body.num1); // req the value of entered by user on the app
  var num2 = Number(req.body.num2); // same as above
  var opteration = req.body.operator; // req the operation that entered by user
  console.log(req.body.operator) // just for make sure our Func. works fine

  var result = calculate(num1, num2, operation); //put details on the function
  res.send("The Result is : " + result);

})
//in answering the user request


app.get("/bmicalculator", function(req, res) {
  res.sendFile(__dirname + "/bmiCalculator.html")
})
// get refrences from user and send the exacr page for /bmiCalculator


app.post("/bmicalculator", function(req, res) {

  var weight = req.body.weight;
  var height = req.body.height;
  var bmi = BMI(weight, height);
  var situate = situation(bmi);
  var normal = toBeNormal(bmi, height);
  res.send("your BMI is : " + bmi +
    "it means you're : " + situate +
    " if you wanna be normal " + normal);
})
// answering the result of BMI


app.listen(3000, () => {
  console.log('Calculator App at http://localhost:3000')
}) // its about domain and localhost that we set on 3000


function calculate(a, b, c) {
  switch (c) {

    case "sum":
      return a + b;
      break;

    case "sub":
      return a - b;
      break;

    case "mul":
      return a * b;
      break;

    case "div":
      return a / b;
      break;
  }
}
// this is our calculator function


function BMI(weight, height) {
  var calcBmi = (weight / (height ** 2));
  return Math.floor(calcBmi * 10) / 10;
}
//Calculating the BMI


function situation(bmi) {
  switch (true) {

    case bmi < 18.5:
      return "Under Weight";
      break;

    case bmi >= 18.5 && bmi <= 24.9:
      return "Normal Weight";
      break;

    case bmi >= 25 && bmi <= 29.9:
      return "Over Weight";
      break;

    case bmi >= 30:
      return "Obesity";
      break;
  }
}
//Checking the Situation of the BMI


function toBeNormal(bmi1, height1) {
  if (bmi1 < 18.5) {
    var gainWeight = Math.floor((18.5 - bmi1) * 10) / 10;

    gainWeight = Math.floor((gainWeight * (height1 ** 2)) * 10) / 10;

    return " You must gain " + gainWeight + "Kg to be normal";
  }

  if (bmi1 >= 18.5 && bmi1 <= 24.9) {
    return " Keep your body ;-)";
  }

  if (bmi1 >= 25) {
    var looseWeight = Math.floor((bmi1 - 25) * 10) / 10;

    looseWeight = Math.floor((looseWeight * (height1 ** 2)) * 10) / 10;

    return " You must loose " + looseWeight + "Kg to be normal"
  }
}
//the Weight should be loss or gain

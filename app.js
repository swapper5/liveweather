

const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html")

});
app.post("/", function(req, res) {

  const query = req.body.cityName
  const apiKey = "e0ad9a8677aa92e4d9f172dc4ae4a1e2"
  const unit = "metric"
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + ",india&appid=" + apiKey + "&units=" + unit;
  https.get(url, function(response) {
    console.log(response);

    response.on("data", function(data) {
      const weatherData = JSON.parse(data)
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageUrl = "http://openweathermap.org/img/wn/02d@2x.png"
      const imageUrl2 = "https://i2.wp.com/www.techgrapple.com/wp-content/uploads/2016/08/nature-evening-sunset-wallpaper.jpg?fit=1920%2C1080&ssl=1"

      console.log(weatherDescription);
      console.log(temp);
      res.write("<h1>the temperature in " + query + " is " +  temp  + " Degree Celcius</h1>")
      res.write("<p>the weather is" + weatherDescription + "</p>")
      res.write("<img src=" + imageUrl + ">")
      res.write("<img src="+ imageUrl2 + ">")

      res.send()
    })
  });
})


app.listen(3000, function(req, res) {
  console.log("server is running on 3000");

})

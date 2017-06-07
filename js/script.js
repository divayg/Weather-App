var weather = {
  city: document.querySelector("#city"),
  temp: document.querySelector(".temp"),
  weather: document.querySelector(".weather"),
  units: "C",
  tempValue: 0,
  button: "F",
  lat: 0,
  lon: 0
};

function tempToggle() {
  if (weather.units == "C") {
    weather.units = "F";
    weather.tempValue = Math.round(9 / 5 * weather.tempValue + 32);
    weather.button = "C";
  } else {
    weather.units = "C";
    weather.tempValue = Math.round((weather.tempValue - 32) * 5 / 9);
    weather.button = "F";
  }

  weather.temp.innerHTML = weather.tempValue + " '" + weather.units;
  document.querySelector(".button").innerHTML = "' " + weather.button;
}

function getLocationAndWeather() {
  if (window.XMLHttpRequest) {
    var xhr = new XMLHttpRequest();
    xhr.addEventListener(
      "load",
      function() {
        var response = JSON.parse(xhr.responseText);

        console.log(response);
        var position = {
          latitude: response.latitude,
          longitude: response.longitude
        };
        var cityName = response.city;

        var weatherSimpleDescription = response.weather.simple;
        var weatherDescription = response.weather.description;
        var weatherTemperature = Math.round(response.weather.temperature);

        weather.tempValue = weatherTemperature;

        weather.city.innerHTML = cityName;
        weather.weather.innerHTML = weatherDescription;
        weather.temp.innerHTML = weatherTemperature + " '" + weather.units;
        getImage(weatherSimpleDescription);
      },
      false
    );

    xhr.addEventListener(
      "error",
      function(err) {
        alert("Could not complete the request");
      },
      false
    );

    xhr.open(
      "GET",
      "https://fourtonfish.com/tutorials/weather-web-app/getlocationandweather.php?owapikey=2f8fde11e4c5c469d0914db67e16a21b&units=metric",
      true
    );
    xhr.send();
  } else {
    alert("Unable to fetch the location and weather data.");
  }
}
function getImage(imgDes) {
  var html = "";
  switch (imgDes) {
    case "Sunny":
      html =
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoABAk8lRmckrIrtY3YwPdwGMDgyW8QplKn6IrjMlWv_KgYtuhlXrgkg";
      break;
    case "Rain":
      html =
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUigmM7eaN_ZPXfRa0gmlCCXB-sJsR069t4tQzwbXl7l6ntRnD";
      break;
    case "Clear":
      html =
        "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQeGTIyz0DkEwNqS0LjSAXOFoHoh2bGjlIVDr7FtPMuG80wwoqD5A";
      break;
    case "Snow":
      html =
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6ZHUs7kQzvJzw_Grne510krOMSIpUUCElIgEJKkEhCpIct9FwEQ";
      break;
    default:
      html =
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSN6RJSs_DMcFiOqQBiwlxWPB77GPP_r-aO1Tq1T2Nww8Poj410WA";
  }
  document.querySelector(".weather-img").innerHTML = "<img src=" + html + " />";
}

$(document).ready(function() {
  getLocationAndWeather();
});

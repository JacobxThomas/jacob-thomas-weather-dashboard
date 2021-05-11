var searchButton = document.querySelector(".searchButton");
var apiKey = "1de82ef4fc7c78999ed3baa696fd52ce"

searchButton.addEventListener("click", userSearch);

function userSearch() {

    var searchInput = document.querySelector(".searchInput").value
    var urlCurrent = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput + "&Appid=" + apiKey + "&units=imperial";

    $.ajax({
        url: urlCurrent,
        method: "GET"
    }).then(function (response) {

        var currentData = $(".currentData")
        var currentTime = new Date(response.dt * 1000);

        currentData.append(response.name + " Date: " + currentTime.toLocaleDateString("en-AU"));
        currentData.append(`<img src="https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png">`)
        currentData.append("<p>" + "Temperature: " + response.main.temp + "</p>");
        currentData.append("<p>" + "Humidity: " + response.main.humidity + "</p>");
        currentData.append("<p>" + "Wind Speed: " + response.wind.speed + "</p>");
    })
}

const searchButton = document.querySelector(".searchButton");
const apiKey = "1de82ef4fc7c78999ed3baa696fd52ce"

searchButton.addEventListener("click", userSearch);

function userSearch() {

    const searchInput = document.querySelector(".searchInput").value
    const urlCurrent = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput + "&Appid=" + apiKey + "&units=metric";
    var urlFiveDayForcast = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchInput + "&Appid=" + apiKey + "&units=metric";

    $.ajax({
        url: urlCurrent,
        method: "GET"
    }).then(function (response) {

        const citySearch = $(".list").addClass("list-item");
        citySearch.append("<button>" + response.name + "</button>");


        const currentData = $(".currentData");
        currentData.empty();
        const currentTime = new Date(response.dt * 1000);

        currentData.append("<p>" + response.name + " Date: " + currentTime.toLocaleDateString("en-AU") + "</p>");
        currentData.append(`<img src="https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png">`)
        currentData.append("<p>" + "Temperature: " + response.main.temp + " °C" + "</p>");
        currentData.append("<p>" + "Humidity: " + response.main.humidity + " %" + "</p>");
        currentData.append("<p>" + "Wind Speed: " + response.wind.speed + " m/sec" + "</p>");

        const urlUV = `https://api.openweathermap.org/data/2.5/uvi?appid=b8ecb570e32c2e5042581abd004b71bb&lat=${response.coord.lat}&lon=${response.coord.lon}`;

        $.ajax({
            url: urlUV,
            method: "GET"
        }).then(function (response) {

            currentData.append("<p>" + "UV Index: " + response.value + " nm" + "</p>")

        });

        $.ajax({
            url: urlFiveDayForcast,
            method: "GET"
        }).then(function (response) {
            var day = [0, 8, 16, 24, 32];
            var fiveDayData = $(".fiveDayData");

            fiveDayData.empty();

            day.forEach(function (i) {
                var FiveDayTimeUTC1 = new Date(response.list[i].dt * 1000);
                FiveDayTimeUTC1 = FiveDayTimeUTC1.toLocaleDateString("en-AU");
                fiveDayData.append("<div>" + "<p>" + "Date: " + FiveDayTimeUTC1 + "</p>" + `<img src="https://openweathermap.org/img/wn/${response.list[i].weather[0].icon}@2x.png">` + "<p>" + "Temperature: " + response.list[i].main.temp + " °C" + "</p>" + "<p>" + "Humidity: " + response.list[i].main.humidity + "%" + "</p>" + "</div>")
            })
        });
    })
}

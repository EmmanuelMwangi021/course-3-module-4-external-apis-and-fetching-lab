// index.js
// Your code here!

const stateInput = document.getElementById("state-input");
const submitButton = document.getElementById("fetch-alerts");
const errorMessage = document.getElementById("error-message");
const alertDisplay = document.getElementById("alerts-display");

const weatherApi = "https://api.weather.gov/alerts/active?area=";


submitButton.addEventListener("click", function () {
    const state = stateInput.value.trim().toUpperCase();

    fetchWeatherAlerts(state);
})

function fetchWeatherAlerts(state) {
    if (state === "") {
        errorMessage.textContent = "Please enter a state abbreviation"
        errorMessage.classList.remove("hidden");
        return;
    }

    fetch(`${weatherApi}${state}`)
        .then (response => response.json())
        .then(data => {
            console.log(data);
            displayAlerts(data);

            stateInput.value = "";
        })
        .catch(error => {
            console.log(error.message);
            errorMessage.textContent = error.message;
            errorMessage.classList.remove("hidden"); 
        });
}

function displayAlerts(data) {
    errorMessage.textContent = ""
    errorMessage.classList.add("hidden");

    alertDisplay.innerHTML = "";

    alertDisplay.innerHTML =
        `<h2>${data.title}: ${data.features.length}</h2>`
    data.features.forEach(function (alert) {
            const p = document.createElement("p");
            p.textContent = alert.properties.headline;
            alertDisplay.appendChild(p);
    })
}






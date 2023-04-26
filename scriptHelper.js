// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
    let missionTarget = document.getElementById("missionTarget");
    missionTarget.innerHTML = `
                <h2>Mission Destination</h2>
                <ol>
                    <li>Name: ${name}</li>
                    <li>Diameter: ${diameter}</li>
                    <li>Star: ${star}</li>
                    <li>Distance from Earth: ${distance}</li>
                    <li>Number of Moons: ${moons}</li>
                </ol>
                <img src="${imageUrl}">
                `
   
}

function validateInput(testInput) {
    if (testInput === "") {
        return "Empty"
    } else if (isNaN(testInput)) {
        return "Not a Number"
    } else {
        return "Is a Number"
    }
   
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
   
    let pilotStatus = document.getElementById("pilotStatus");
    let copilotStatus = document.getElementById("copilotStatus");
    let fuelStatus = document.getElementById("fuelStatus");
    let launchStatus = document.getElementById("launchStatus");
    let cargoStatus = document.getElementById("cargoStatus");

    //validate something entered for every field
    if (validateInput(pilot) === "Empty" || validateInput(copilot) === "Empty" || validateInput(fuelLevel) === "Empty" || validateInput(cargoLevel) === "Empty") {
        alert ("All fields are required");
    } else if (validateInput(fuelLevel) === "Not a Number" || validateInput(cargoLevel) === "Not a Number") {
        alert ("Enter only numerical values for Fuel Level and Cargo Mass");
    } else if (validateInput(pilot) === "Is a Number" || validateInput(copilot) === "Is a Number") {
        alert ("Be sure to enter valid information for each field");
    } else {
        //update status (pilot and copilot)
        pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;
        copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`;
        list.style.visibility = "hidden";
    }
    //fuel levels/faulty items
    if (Number(fuelLevel) < 10000) {
        fuelStatus.innerHTML = "Not enough fuel";
        list.style.visibility = "Visible";
        launchStatus.innerHTML = "Shuttle not ready";
        launchStatus.style.color = "red";
    } else if (Number(cargoLevel) > 10000) {
        cargoStatus.innerHTML = "Cargo too heavy";
        list.style.visibility = "Visible";
        launchStatus.innerHTML = "Shuttle not ready";
        launchStatus.style.color = "red";
    } else if (Number(cargoLevel) < 10000 && Number(fuelLevel) > 10000) {
        cargoStatus.innerHTML = "Cargo light enough for launch"
        fuelStatus.innerHTML = "Enough fuel for launch";
        list.style.visibility = "Visible";
        launchStatus.innerHTML = "Shuttle ready for launch";
        launchStatus.style.color = "green";
    }

}

async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then (function(response) {

        return response.json();
    });

    return planetsReturned;
}

function pickPlanet(planets) {
    let index = Math.floor(Math.random() * planets.length);
    return planets[index];
}


module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;

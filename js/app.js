/* ====================================================
   Variables
   ==================================================== */

/* IP address
/* ==================================================== */
const apiKey = "at_uFtj0rIWm2RpBWtn3WeMPPcIZqvbo";
const ipAddressInput = document.querySelector("#ip-address");
const ip = document.querySelector("[data-ip]");
const ipLocation = document.querySelector("[data-location]");
const utc = document.querySelector("[data-utc]");
const isp = document.querySelector("[data-isp]");
const regex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
const errorContainer = document.querySelector(".validate");
/* Maps
/* ==================================================== */
const mymap = L.map("mapid", { zoomControl: false }).setView([37.419857, -122.078827], 10);
const mapIcon = L.icon({ iconUrl: "./../images/icon-location.svg" });

/* ====================================================
   Functions
   ==================================================== */

/**
 * Render the fetched data to HTML
 * @param      {Array}  data    The array of fetched data
 */
function renderDataIP(data) {
	ip.textContent = `${data.ip}`;
	ipLocation.textContent = `${data.location.city}, ${data.location.region}, ${data.location.country}`;
	utc.textContent = `UTC ${data.location.timezone}`;
	isp.textContent = `${data.isp}`;
}

/**
 * Update the map tiles and marker location based on fetched data
 * @param      {Array}  data    The array of fetched data
 */
function updateMap(data) {
	mymap.setView([data.location.lat, data.location.lng], 14);
	L.tileLayer(
		"https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZGF2ZWhlbnNvbiIsImEiOiJja29pd2xucWEwMHhsMnZsOGppem1jcGhiIn0.KUpHE-81tcvykVbJvej1KA",
		{
			attribution:
				'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
			maxZoom: 18,
			id: "mapbox/streets-v11",
			tileSize: 512,
			zoomOffset: -1,
			accessToken: "pk.eyJ1IjoiZGF2ZWhlbnNvbiIsImEiOiJja29pd2xucWEwMHhsMnZsOGppem1jcGhiIn0.KUpHE-81tcvykVbJvej1KA",
		}
	).addTo(mymap);
	L.marker([data.location.lat, data.location.lng], { icon: mapIcon }).addTo(mymap);
}

/**
 * Fetches the data on the IP address
 * @param      {String}   endpoint  The url endpoint
 * @return     {Array}		data 			The parse array of data
 */
async function fetchData(endpoint) {
	const response = await fetch(endpoint);
	const data = await response.json();
	renderDataIP(data);
	updateMap(data);
}

/* Handlers
/* ==================================================== */

/**
 * Handle the input event to update the IP being searched
 * @param      {Object}  event   The event object
 */
function inputHandler(event) {
	event.preventDefault();
	if (!event.target.closest("form")) return;
	// Check if IP address is valid
	if (regex.test(event.target.querySelector("input").value)) {
		if (errorContainer.classList.contains("error")) {
			errorContainer.classList.remove("error");
		}
		fetchData(
			`https://cors-anywhere.herokuapp.com/https://geo.ipify.org/api/v1?apiKey=${apiKey}&ipAddress=${ipAddressInput.value}`
		);
	} else {
		errorContainer.classList.add("error");
	}
}

/*  ==================================================
	Inits and Event Listeners
	================================================== */

/* IP address
   ---------------- */
document.addEventListener("submit", inputHandler);
fetchData(`https://cors-anywhere.herokuapp.com/https://geo.ipify.org/api/v1?apiKey=${apiKey}&ipAddress=`);

/* Maps
   ---------------- */
// Initiate map
L.tileLayer(
	"https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZGF2ZWhlbnNvbiIsImEiOiJja29pd2xucWEwMHhsMnZsOGppem1jcGhiIn0.KUpHE-81tcvykVbJvej1KA",
	{
		attribution:
			'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		maxZoom: 18,
		id: "mapbox/streets-v11",
		tileSize: 512,
		zoomOffset: -1,
		accessToken: "pk.eyJ1IjoiZGF2ZWhlbnNvbiIsImEiOiJja29pd2xucWEwMHhsMnZsOGppem1jcGhiIn0.KUpHE-81tcvykVbJvej1KA",
	}
).addTo(mymap);
// Position controls
L.control.zoom({ position: "bottomright" }).addTo(mymap);

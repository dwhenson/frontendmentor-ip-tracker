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
		"https://tile.thunderforest.com/neighbourhood/{z}/{x}/{y}.png?apikey=1078500321124a708f0fa546fff421f0"
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
	// TODO: add check of below against regex, and fetch only if true
	console.log(event.target.querySelector("input").value);
	fetchData(`https://geo.ipify.org/api/v1?apiKey=${apiKey}&ipAddress=${ipAddressInput.value}`);
}

/*  ==================================================
	Inits and Event Listeners
	================================================== */

/* IP address
   ---------------- */
document.addEventListener("submit", inputHandler);
fetchData(`https://geo.ipify.org/api/v1?apiKey=${apiKey}&ipAddress=`);

/* Maps
   ---------------- */
// Initiate map
L.tileLayer(
	"https://tile.thunderforest.com/neighbourhood/{z}/{x}/{y}.png?apikey=1078500321124a708f0fa546fff421f0"
).addTo(mymap);
// Position controls
L.control.zoom({ position: "bottomright" }).addTo(mymap);

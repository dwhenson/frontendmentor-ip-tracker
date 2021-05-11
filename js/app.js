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

/* Maps
/* ==================================================== */
const mymap = L.map("mapid", { zoomControl: false }).setView([37.419857, -122.078827], 10);
const popup = L.popup();

/* ====================================================
   Functions
   ==================================================== */

function renderDataIP(data) {
	ip.textContent = `${data.ip}`;
	ipLocation.textContent = `${data.location.city}, ${data.location.region}, ${data.location.country}`;
	utc.textContent = `UTC ${data.location.timezone}`;
	isp.textContent = `${data.isp}`;
}

function updateMap(data) {
	mymap.setView([data.location.lat, data.location.lng], 14);
	L.tileLayer(
		"https://tile.thunderforest.com/neighbourhood/{z}/{x}/{y}.png?apikey=1078500321124a708f0fa546fff421f0"
	).addTo(mymap);
	L.marker([data.location.lat, data.location.lng]).addTo(mymap);
}

async function fetchData(endpoint) {
	const response = await fetch(endpoint);
	const data = await response.json();
	renderDataIP(data);
	updateMap(data);
}

/* Handlers
/* ==================================================== */
function inputHandler(event) {
	event.preventDefault();
	if (!event.target.closest("form")) return;
	fetchData(`https://geo.ipify.org/api/v1?apiKey=${apiKey}&ipAddress=${ipAddressInput.value}`);
}

/*  ==================================================
	Inits and Event Listeners
	================================================== */

/* IP address
   ---------------- */
document.addEventListener("submit", inputHandler);
fetchData(`https://geo.ipify.org/api/v1?apiKey=${apiKey}&ipAddress=8.8.8.8`);

/* Maps
   ---------------- */
// Initiate map
L.tileLayer(
	"https://tile.thunderforest.com/neighbourhood/{z}/{x}/{y}.png?apikey=1078500321124a708f0fa546fff421f0"
).addTo(mymap);
// Position controls
L.control.zoom({ position: "bottomright" }).addTo(mymap);

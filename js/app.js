const apiKey = "at_uFtj0rIWm2RpBWtn3WeMPPcIZqvbo";
const ipAddressInput = document.querySelector("#ip-address");
const ip = document.querySelector("[data-ip]");
const ipLocation = document.querySelector("[data-location]");
const utc = document.querySelector("[data-utc]");
const isp = document.querySelector("[data-isp]");

function renderData(data) {
	ip.textContent = `${data.ip}`;
	ipLocation.textContent = `${data.location.city}, ${data.location.region}, ${data.location.country}`;
	utc.textContent = `UTC ${data.location.timezone}`;
	isp.textContent = `${data.isp}`;
}

async function fetchData(endpoint) {
	const response = await fetch(endpoint);
	const data = await response.json();
	renderData(data);
}

function inputHandler(event) {
	event.preventDefault();
	if (!event.target.closest("form")) return;
	fetchData(`https://geo.ipify.org/api/v1?apiKey=${apiKey}&ipAddress=${ipAddressInput.value}`);
}

document.addEventListener("submit", inputHandler);
fetchData(`https://geo.ipify.org/api/v1?apiKey=${apiKey}&ipAddress=8.8.8.8`);

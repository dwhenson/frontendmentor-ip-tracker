const apiKey = "at_uFtj0rIWm2RpBWtn3WeMPPcIZqvbo";
const ipAddressInput = document.querySelector("#ip-address");

async function fetchData(endpoint) {
	const response = await fetch(endpoint);
	const data = await response.json();
	console.log(data);
}

function inputHandler(event) {
	event.preventDefault();
	if (!event.target.closest("form")) return;
	fetchData(`https://geo.ipify.org/api/v1?apiKey=${apiKey}&ipAddress=${ipAddressInput.value}`);
}

document.addEventListener("submit", inputHandler);

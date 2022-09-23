const container = document.querySelector(".container");

const beaches = [
  {
    name: "Atlantic City",
    lat: "39.35509",
    lon: "-74.429796",
  },
  {
    name: "Avalon",
    lat: "39.093731",
    lon: "-74.716779",
  },
  {
    name: "Avon-By-The-Sea",
    lat: "40.190581",
    lon: "-74.008856",
  }
];
// const showCoffees = () => {
//   let output = "";
//   coffees.forEach(
//     ({ name, image }) =>
//       (output += `
//               <div class="card">
//                 <img class="card--avatar" src=${image} />
//                 <h1 class="card--title">${name}</h1>
//                 <a class="card--link" href="#">Taste</a>
//               </div>
//               `)
//   );
//   container.innerHTML = output;
// };

// document.addEventListener("DOMContentLoaded", showCoffees);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register("/serviceWorker.js")
      .then((res) => console.log("service worker registered"))
      .catch((err) => console.log("service worker not registered", err));
  });
}

// script for getting users current position
var x = document.getElementById("location");

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

function success(pos) {
  const crd = pos.coords;

  console.log("Your current position is: ");
  console.log(`Latitude : ${crd.latitude}`);
  console.log(`Longitude : ${crd.longitude}`);
  console.log(`More of less ${crd.accuracy} meters.`);

  let api = "8988ce4587b71b5353869d036e2f9471";

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=${api}`
  )
    .then((response) => {
      // handle the response
      console.log("response work");
      console.log(response)
    })
    .catch((error) => {
      console.log("Is broken");
    });
}

function getBeaches() {
  console.log(beaches);
  

  let api = "8988ce4587b71b5353869d036e2f9471";

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${beaches[0].lat}&lon=${beaches[0].lon}&appid=${api}`
  )
    .then((response) => {
      // handle the response
      console.log("response work");
      console.log(response)
    })
    .catch((error) => {
      console.log("Is broken");
    });

}


async function getLocation() {
  navigator.geolocation.getCurrentPosition(success, error);
}

function showPosition(position) {
  x.innerHTML =
    "Latitude: " +
    position.coords.latitude +
    "<br>Longitude: " +
    position.coords.longitude;
}

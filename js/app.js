const container = document.querySelector(".container");

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

// Load beaches into array 'beaches' from NJ Beach Coordinate file on page //load
let beaches = [];

function loadBeaches() {
  fetch('./NJ Beach Coordinate List.txt')
  .then(response => response.text())
  .then((text) => {
      let textArrayRows = text.split(/\r?\n/);
      for(let i=0; i<textArrayRows.length;i++) {
          let locationArr = textArrayRows[i].split("\t");
          beaches.push({
                  name: locationArr[0],
                  lat: locationArr[1],
                  lon: locationArr[2]
              });
      }
      return beaches;
  })
  .then(() => getBeaches());
}

// populate the dropdown with the list of beaches in our array
function getBeaches() {

  let beachesDropdown = document.querySelector(".form-select")
  let beachList = beaches.map((beach) => {
    let beachItem = document.createElement("option");
    beachItem.addEventListener('click', () => console.log('test'))

    beachItem.value = beach.name;
    beachItem.textContent = beach.name;
    
    return beachItem;
  })

  beachesDropdown.append(...beachList);

}

// search the openweather api for the lat / lon based on what beach the user selected in the dropdown
function getBeachData() {
  let api = "8988ce4587b71b5353869d036e2f9471";
  console.log("beaches: ", beaches);

  // Validate that the user selection matches a beach in our array, if so run an api query with its lat and lon
  
  let dropdownValue = document.querySelector(".form-select").value;
  for (let i=0; i<beaches.length; i++) {
    if (beaches[i].name == dropdownValue) {
      console.log("succcess: " + beaches[i].name + " : " + dropdownValue);

      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${beaches[i].lat}&lon=${beaches[i].lon}&appid=${api}`
      )
         // convert the response body to json
        .then((response) => response.json())
        .then((data) => {
          // handle the response
          console.log("response work");
          console.log(data);
          populateWeatherFields(data);
        })
        .catch((error) => {
          console.log(error);
        });
        break;
    } 
  }
}

function populateWeatherFields(data) {
  //const lat = document.querySelector('.beachLat');
  //const lon = document.querySelector('.beachLon');
  const image = document.querySelector('.weather-box img');
  const temperature = document.querySelector('.weather-box .temperature');
  const description = document.querySelector('.weather-box .description');
  const humidity = document.querySelector('.weather-details .humidity span');
  const wind = document.querySelector('.weather-details .wind span');

  const container = document.querySelector('.container');
  const dropdownBox = document.querySelector('.dropdown-box');
  const weatherBox = document.querySelector('.weather-box');
  const weatherDetails = document.querySelector('.weather-details');

  //console.log ('data:', data)
  //lat.textContent = data.coord.lat;
  //lon.textContent = data.coord.lon;
  switch (data.weather[0].main) {
    case 'Clear':
      image.src = 'images/clear.png';
      break;
    
    case 'Rain':
      image.src = 'images/rain.png';
      break;
    
    case 'Snow':
      image.src = 'images/snow.png';
      break;

    case 'Clouds':
      image.src = 'images/clouds.png';
      break;

    case 'Haze':
      image.src = 'images/haze.png';
      break;

    default:
      image.src = '';
  }
  const kToF = (data.main.temp-273.15)*(9/5)+32;
  temperature.innerHTML = `${parseInt(kToF)}<span>°F</span>`;
  humidity.innerHTML = `${data.main.humidity}%`;
  description.innerHTML = data.weather[0].description;
  wind.innerHTML = `${parseInt(data.wind.speed)}Km/h`;

  weatherBox.style.display = '';
  weatherDetails.style.display = '';
  weatherBox.classList.add('fadeIn');
  container.style.height = '590px';
}
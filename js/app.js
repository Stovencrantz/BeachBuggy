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

let beaches = [];
// Load beaches from NJ Beach Coordinate file on page load

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


function getBeaches() {

  let beachesDropdown = document.querySelector(".form-select")
  console.log(beaches)
  let beachList = beaches.map((beach) => {
    let beachItem = document.createElement("option");
    beachItem.addEventListener('click', () => console.log('test'))

    beachItem.value = beach.name;
    beachItem.textContent = beach.name;
    
    return beachItem;
  })

  beachesDropdown.append(...beachList);

}

function getBeachData() {
  let api = "8988ce4587b71b5353869d036e2f9471";

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${beaches[0].lat}&lon=${beaches[0].lon}&appid=${api}`
  )
    .then((response) => {
      // handle the response
      console.log("response work");
      console.log(response);
    })
    .catch((error) => {
      console.log("Is broken");
    });
}


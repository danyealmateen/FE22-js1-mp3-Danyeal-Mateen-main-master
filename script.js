let errorMessage = document.getElementById("errorMessage");
let lang = document.getElementById("input").value;
let button = document.getElementById("button");

button.addEventListener("click", (event) => {
  event.preventDefault();
  getApi();
  createContainer();
});

function getApi() {
  const inputValue = document.getElementById("input").value;

  const errorMessage = document.getElementById("errorMessage");
  errorMessage.innerText = "";
  const resultContainer = document.getElementById("resultContainer");
  resultContainer.innerHTML = "";
  fetch(`https://restcountries.com/v3.1/lang/${inputValue}`)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      errorMessage.innerText = `Language does not exist!`;
      throw new Error("there is a problem");
    })
    .then((data) => {
      const sortedData = data.sort((a, b) => b.population - a.population);
      console.log(sortedData);

      sortedData.forEach((data, index) => {
        let result = createContainer(data, index);
        let resultContainer = document.getElementById("resultContainer");
        resultContainer.appendChild(result);
      });
    })
    .catch((error) => console.log(error));
}
function createContainer(data, index) {
  let parent = document.createElement("div");
  let countryParagraph = document.createElement("p");
  let subRegionParagraph = document.createElement("p");
  let capitalCity = document.createElement("p");
  let population = document.createElement("p");
  let imgFlag = document.createElement("img");

  if (index === 0) {
    parent.setAttribute("id", "country-highest-population-container");
    population.setAttribute("id", "country-highest-population");
  }

  imgFlag.setAttribute("src", data.flags.png);
  countryParagraph.innerText += `Country: ${data.name.common}`;
  subRegionParagraph.innerText += `Subregion: ${data.subregion}`;
  capitalCity.innerText += `CapitalCity: ${data.capital}`;
  population.innerText += `Population: ${data.population}`;

  parent.appendChild(imgFlag);
  parent.appendChild(countryParagraph);
  parent.appendChild(subRegionParagraph);
  parent.appendChild(capitalCity);
  parent.appendChild(population);

  return parent;
}

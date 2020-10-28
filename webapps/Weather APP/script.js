const searchBtn = document.querySelector(".search");
const locationInput = document.querySelector(".location");
const apiKey = "uloQsJtN1luGKVtBy18PTYLkk2w0AsdG";
const tempShow = document.querySelector(".temp");
const localShow = document.querySelector(".local");
const textIsDay = document.querySelector(".textIsDay");
const imgIsDay = document.querySelector(".imgIsDay");
const getTime = document.querySelector(".getTime");
const getDate = document.querySelector(".getDate");
const getCityLocalStorage = localStorage.getItem("city");
if (localStorage.getItem("city") != null) {
  api(getCityLocalStorage);
}
searchBtn.addEventListener("click", function () {
  let input = locationInput.value;
  input = input.toLowerCase();
  api(input);
});

function api(city) {
  const URL = `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apiKey}&q=${city}&details=true`;
  const promise = fetch(URL);
  promise
    .then(function (response) {
      const processingResponse = response.json();
      return processingResponse;
    })
    .then(function (processedResponse) {
      fora(processedResponse);
    });
  locationInput.value = null;
  //   fetch(
  //     `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apiKey}&q=${city}`
  //   )
  //     .then((result) => {
  //       return result.json();
  //     })
  //     .then((result) => {
  //       fora(result);
  //     });
}

function fora(respo) {
  let cityName = respo[0].EnglishName;
  let cityState = respo[0].AdministrativeArea.EnglishName;
  let cityCountry = respo[0].Country.ID;
  let cityDetailsKey = respo[0].Details.CanonicalLocationKey;
  const URL_TEMP = `http://dataservice.accuweather.com/currentconditions/v1/${cityDetailsKey}?apikey=${apiKey}`;
  fetch(URL_TEMP)
    .then((result) => {
      return result.json();
    })
    .then((result) => {
      let cityTemp = returnTemp(result);
      let isDay = result[0].IsDayTime;
      // let time = result[0].LocalObservationDateTime;
      // let timeDate = time.substr(0, 8);
      // let timeHour = time.substring(11, time.length - 6);
      // alert(timeTime);
      if (!isDay) {
        textIsDay.innerText = "It is night time!";
        imgIsDay.src = "./icons/icons8-moon-50.png";
        // getTime.innerText = timeTime;
        // getDate.innerText = timeDate;
      } else if (isDay) {
        textIsDay.innerText = "It is day time!";
        imgIsDay.src = "./icons/icons8-sun-50.png";
        // getTime.innerText = timeTime;
        // getDate.innerText = timeDate;
      }
      tempShow.innerText = cityTemp;
      localShow.innerText = `${cityName} - ${cityState} - ${cityCountry}`;
      setItemsLocalStorage(cityName);
    });
  //   console.log(`${cityName} ${cityState} ${cityCountry} ${cityDetailsKey}`);
}
function preventSubmit(e) {
  e.preventDefault();
}

function returnTemp(result) {
  return `${result[0].Temperature.Metric.Value}°C`;
}

function setItemsLocalStorage(item) {
  localStorage.clear();
  localStorage.setItem("city", item);
}

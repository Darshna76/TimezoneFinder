const container = document.querySelector(".container");
const address = document.getElementById("input-address");
const submitBtn = document.getElementById("submit-btn");
const addressCon = document.querySelector(".address-con")
const error = document.querySelector(".error");
const blankErr = document.querySelector(".error1")
const loader = document.querySelector(".loader");
const addressDetails = document.getElementById("address-details");

const ApiKey = "9246c29abcdb46e0ba4b7603b0de939e";

container.style.display = "none"
addressDetails.style.display = "none";
loader.style.display = "block"


if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(showPosition);
} else {
  x.innerHTML = "Geolocation is not supported by this browser.";
}

function showPosition(position) {
  let cod = {
    latitude: position.coords.latitude,
    longitude: position.coords.longitude
  }





  console.log("latitude and longitude", cod);
  fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${cod.latitude}&lon=${cod.longitude}&format=json&apiKey=${ApiKey}`)
    .then(resp => resp.json())
    .then((result) => {
      loader.style.display = "none";
      container.style.display = "block"
      addressDetails.style.display = "flex";
      console.log("result", result)
      if (result.results.length) {
        let data = result.results[0].timezone;
        console.log(data)
        container.innerHTML = `<div class="time-zone">
        <h3>TimeZone API: <span class="api-key">${ApiKey}</span></h3>
         <h3 class="current">Your Current Time Zone:</h3>
         </div>
    <div class="details">
    <div>Name Of Time Zone :${data.name}</div>
    <div class="lat-long">
      <div>Lat: ${cod.latitude}</div>
      <div>Long: ${cod.longitude}</div>
    </div>
    
    <div>Offset STD: ${data.offset_STD}</div>
    <div>Offset STD Seconds: ${data.offset_STD_seconds}</div>
    <div>Offset DST: ${data.offset_DST}</div>
    <div>Offset DST Seconds: ${data.offset_DST_seconds}</div>
    <div>Country: ${result.results[0].country}</div>
    <div>Postcode: ${result.results[0].postcode}</div>
    <div>City: ${result.results[0].city}<div>
    </div>`

      } else {
        alert("No location found");

      }
    });
};




submitBtn.addEventListener("click", () => {
  const addressVal = address.value;
  if (addressVal === "") {
    blankErr.style.display = "block";
    error.style.display = "none";
  } else {
    fetch(`https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(addressVal)}&format=json&apiKey=9246c29abcdb46e0ba4b7603b0de939e`)
      .then(resp => resp.json())
      .then((result) => {
        console.log("geocodingresult", result);
        if (result.results.length) {
          let data = result.results[0].timezone;
          addressCon.style.display = "block";
          blankErr.style.display = "none";
          error.style.display = "none";
          addressCon.innerHTML = `<div class="time-zone">
       <h3 class="result">Your Result</h3>
       </div>
       <div class="detail">
       <div>Name Of Time Zone: ${data.name}</div>
        <div class="lat-long">
         <div>Lat: ${result.results[0].lat}</div>
         <div>Long: ${result.results[0].lon}</div>
       </div>
       
       <div>Offset STD: ${data.offset_STD}</div>
       <div>Offset STD Seconds: ${data.offset_STD_seconds}</div>
       <div>Offset DST : ${data.offset_DST}</div>
       <div>Offset DST Seconds: ${data.offset_DST_seconds}</div>
       <div>Country: ${result.results[0].country}</div>
       <div>Postcode: ${result.results[0].postcode}</div>
       <div>City: ${result.results[0].city}<div>
       </div>`
        } else {
          error.style.display = "block";
          blankErr.style.display = "none";

        }


      });
    address.value = "";
    addressCon.innerHTML = "";

  }
});




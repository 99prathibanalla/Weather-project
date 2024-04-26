const apikey="c07a7974a700f83fb2b7ba8d3ca33bdc";
const weatherData = document.querySelector(".inner");


const cityinput=document.getElementById("input");

const formele=document.querySelector("form");

formele.addEventListener("submit",(event)=>{
     event.preventDefault();//not to load on another page
     const cityValue=cityinput.value;
     console.log(cityValue);
     getWeatherData(cityValue);
});

//
async function getWeatherData(cityValue){
    try{
        //await:wait until the response comes
       const response=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&units=metric`);
       const data=await response.json()//response to data
       console.log(data);
       if(!response.ok){
        throw new Error("Network response was not ok")
       }
       const temperature=Math.round(data.main.temp)
       const description=data.weather[0].description
       const icon=data.weather[0].icon
       const details=[
        `Feels like:${Math.round(data.main.feels_like)}`,
        `Humidity:${data.main.humidity}%`,
        `Wind Speed:${data.wind.speed} m/s`,
       ]
       weatherData.querySelector(".icon").innerHTML=`<img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">`;
       weatherData.querySelector(".temp").textContent=`${temperature}°C`;
       weatherData.querySelector(".desc").textContent=description;
       weatherData.querySelector(".details").innerHTML=details.map((detail)=>`
       <div>${detail}</div>`).join("");
    }
    catch(error){
        weatherData.querySelector(".icon").innerHTML="";
        weatherData.querySelector(".temp").textContent="";
        weatherData.querySelector(".desc").textContent="An Error happened, please try again later...";
        weatherData.querySelector(".details").innerHTML=""
    }
}
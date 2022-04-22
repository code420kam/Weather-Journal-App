/* Global Variables */
const appID = "cdc7d0975942a1e1d7b8e77671c096f2"
const url = "https://api.openweathermap.org/data/2.5/weather?q="
let testZip = ""
let userData = {}
const btn = document.getElementById("generate");
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getDate()+"." +d.getMonth()+'.'+ d.getFullYear();

//add Eventlistener for Clicking the Generate button
btn.addEventListener("click", function() {
    testZip = document.getElementById("zip").value;
    const feelings = document.getElementById("feelings").value;
    onPageLoad()
})

//add Function that get the user data after the user input
async function onPageLoad()
{
    try
    {
		await getData()
    }
    catch(error)
    {
        console.log(`${error.message} at Function onPageLoad`)
    }
}

//adding default fetch options
function defaultFetchOpts() {
	return {
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin' : url,
		},
	}
}

//async function to get the Data from the API
async function getData()
{
    defaultFetchOpts()
    try{
        fetch(`${url}${testZip}&appid=${appID}&units=metric`)
        .then((response) => response.json())
        .then((user) => {
            //post response of Data to web page
            user.feeling = feelings.value;
            postData(`/all`, {temperature:user.main.temp, date: newDate, feeling: feelings.value, name: user.name})
            //rendering the Data
           renderEntry({temperatur:user.main.temp, date: newDate, resp: feelings, name:user.name})         
        });
    }
    catch(error){
        console.log(`${error.message} Error at getData()`)
    }
}
const postData = async(url, data)=>{
    let body = data;
    const res = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    });
    try{
        const newData = await res.json();
        return newData
    } catch(error){
        console.log(error);
    }
}

//rendering the response
function renderEntry(userData)
{

    
    fetch("/all")
    .then((data) => data.json())
    .then((data) => {
        //get the Html Elements from DOM
        const actualDate = document.getElementById("date");
        const temperatur = document.getElementById("temp");
        const content = document.getElementById("content");
        const city = document.getElementById("location")
        //set the Element attributes
        city.innerHTML = `Your Location is in the ${userData.name} area`
        temperatur.innerHTML = `Temperature: ${userData.temperatur} °C`;
        actualDate.innerHTML = `Current Date: ${userData.date}`;
        content.innerHTML = `Your mood are: ${feelings.value}`;
    })
   
}

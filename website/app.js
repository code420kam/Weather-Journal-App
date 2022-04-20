/* Global Variables */
const appID = "cdc7d0975942a1e1d7b8e77671c096f2"
const url = "https://api.openweathermap.org/data/2.5/weather?q="
let testZip = ""
let userData = {}
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

const btn = document.getElementById("generate");

btn.addEventListener("click", function() {
    testZip = document.getElementById("zip").value;
    const feelings = document.getElementById("feelings").value;
    console.log(`${testZip} ${feelings}`)

onPageLoad()
})

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

function defaultFetchOpts() {
	return {
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin' : url,
		},
	}
}

async function getData()
{
    defaultFetchOpts()
    try{
        fetch(`${url}${testZip}&appid=${appID}&units=metric`)
        .then((response) => response.json())
        .then((user) => {
            postData(`/test`, {temperature:user.main.temp, date: newDate, resp: feelings})
            renderEntry({temperatur:user.main.temp, date: newDate, resp: feelings})         
         console.log(JSON.stringify(user));});
    }
    catch(error){
        console.log(`${error.message} Error at getData()`)
    }
}

const postData = async(url, data)=>{
    let body = data;
    //console.log(data);
    console.log(body);
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
        console.log(newData)
        return newData
    } catch(error){
        console.log(error);
    }
}

function renderEntry(userData)
{
    const actualDate = document.getElementById("date");
    const temperatur = document.getElementById("temp");
    const content = document.getElementById("content");
    
    temperatur.innerHTML = `Temperature: ${userData.temperatur} °C`;
    actualDate.innerHTML = `Current Date: ${userData.date}`;
    content.innerHTML = `Your Feelings are: ${userData.feelings}`;
}

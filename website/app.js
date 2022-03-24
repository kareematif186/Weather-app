
const apiKey = "&appid=66aece9685b85440c591f90d06c78da2&units=imperial";
const apiUrl = "http://localhost:4800/";

//_____________________________________________________________________________________________________

document.getElementById('generate').addEventListener('click', ()=>{
    
    const zipCodeElement = document.getElementById('zip');
    const feelingsCodeElement = document.getElementById('feelings');

    let data = {
        zipCode: zipCodeElement.value,
        content: feelingsCodeElement.value,
        date: new Date()
    }

    getZipCodeInformation(data.zipCode).then(zipInfo => {
        if (zipInfo.cod != 200)
            return alert(zipInfo.message)
        data.temp = zipInfo.list[0].main.temp;
        postDateToServer(data);
    })
})

//_____________________________________________________________________________________________________


async function getZipCodeInformation(zipCode) {
    return await (await fetch(`http://api.openweathermap.org/data/2.5/forecast?zip=${zipCode}${apiKey}`)).json()
}


//_________________________________________________________________________________________________________

async function postDateToServer(data) {
    let res = await fetch(`${apiUrl}postData`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    try {
        if (!res.ok) {
            alert('Process Not Successfuly');
            return;
        }

        res.json().then(data => {
            if (res.ok)
                updateUI();//Update UI Now
            else
                alert('Process Not Successfuly');
        })

    } catch (error) {
        console.log(error);
        }
}



//_______________________________________________________________________________________________________

async function updateUI() {
    let res = await fetch(`${apiUrl}getAll`);
    const dateEl = document.getElementById('date');
    const tempEl = document.getElementById('temp'); 
    const contentEl = document.getElementById('content');

    try {
        res.json().then(data => {
            dateEl.innerHTML = `Date Is: ${data.date}`;
            tempEl.innerHTML = `Temp Is: ${data.temp}`;
            contentEl.innerHTML = `My Feelings Is: ${data.content}`;
        }).catch(catchError);
    } catch (error) {
        console.log(error);
        }
}
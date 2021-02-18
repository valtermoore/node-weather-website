
//console.log('Client side JS file');

//Fetch the data
// axios('http://localhost:3000/weather?address=maputo')
//     .then((response) => {

//         console.log(response.data.location);
//         console.log(response.data.forecast);
//     })




const weatherForm = document.querySelector('form');
const search = document.getElementById('input');

const messageOne = document.getElementById('message-1');
const messageTwo = document.getElementById('message-2');



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = search.value;

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';


    fetch(`/weather?address=${location}`).then(response => {
        response.json().then(data => {
            if (data.error) {
                messageOne.textContent = data.error;
            } else {
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
            }
        })
    });
});
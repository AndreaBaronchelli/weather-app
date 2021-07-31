const weatherForm = document.getElementById('searchform');

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const search = document.getElementById('search').value;
    const messageOne = document.getElementById('message-1');
    const messageTwo = document.getElementById('message');

    fetch(`http://localhost:3000/weather?search=${search}`).then((response) => {
        response.json().then((data) => {
            if (data.code) {
                messageOne.textContent = `Error: ${data.info}`;
            } else {
                messageOne.textContent = `In ${data.location}`;
                messageTwo.textContent = `There is now ${data.temperature}°`;
            }
        });
    });
});

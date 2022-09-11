console.log("Client side JS is loaded.")

const weatherForm = document.querySelector("form");
const locationBox = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (event) => {

    event.preventDefault();
    console.log("Yeah it worked.");

    const address = locationBox.value;

    fetch("http://localhost:3000/weather?address=" + address).then((r) => {

        messageOne.innerHTML = "Loading";
        r.json().then((data) => {

            if (data.error) {
                messageOne.innerHTML = data.error;
                messageTwo.innerHTML = "";
                return;
            }

            messageOne.innerHTML = data.address;
            messageTwo.innerHTML = data.forecast;
        })
    });


})
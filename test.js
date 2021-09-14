const fetch = require("node-fetch");

let uri = "https://8ball.delegator.com/magic/JSON/a";
async function a() {
    fetch(uri)
        .then((response) => response.json())
        .then((json) => {
            console.log(json);
        });
}

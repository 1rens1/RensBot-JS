let url = "https://8ball.delegator.com/magic/JSON/question";
fetch(url)
    .then(response => response.json())
    .then(json => {
    console.log(json);
});
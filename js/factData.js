const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'c78fb667a3msh7d7e2fb02212684p19c0a3jsn6c1847f46e85',
        'X-RapidAPI-Host': 'facts-by-api-ninjas.p.rapidapi.com'
    }
};

const displayQuote = document.getElementById('displayQuote')
const defaultQuote = "The way to get started is to quit talking and begin doing."

function changeFact() {

    fetch('https://facts-by-api-ninjas.p.rapidapi.com/v1/facts', options)
        .then(response => response.json())
        .then((response) => {
            let quote = response[0].fact

            if (quote.length > 90) {
                displayQuote.innerHTML = defaultQuote
            }
            else {
                displayQuote.innerHTML = quote
            }
        })
        .catch(err => console.error(err));

}
changeFact();
setInterval(changeFact, 15000);
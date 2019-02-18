// API
const endpoint = 'https://en.wikipedia.org/w/api.php?origin=*&action=query&format=json&prop=extracts&generator=search&utf8=1&exsentences=1&exintro=1&explaintext=1&gsrlimit=10&gsrwhat=text&gsrinfo=totalhits%7Csuggestion%7Crewrittenquery&gsrprop=size%7Cwordcount%7Ctimestamp&gsrsort=relevance&gsrsearch=';

let entries = [];

const searchInput = document.getElementById('search');
const suggestions = document.getElementById('suggestions');

searchInput.addEventListener('change', function(event) {
    getEntries();
});
searchInput.addEventListener('keyup', function(event) {
    getEntries();
});

function getEntries() {
    const searchQuery = event.target.value;
    const url = endpoint + searchQuery;

    fetch(url)
        .then((response) => response.json())
        .then(json => {
            entries = json.query.pages;
            displaySuggestions(entries);
        })
        .catch(error => {
            console.log(error.message);
        })
}

function displaySuggestions(entries) {
    const list = Object.entries(entries).map(([key, value]) => {
        const listItem = `
            <li>
                <article>
                    <h3>${value.title}</h3>
                    <p>${value.extract}</p>
                </article>
                <footer>
                    <a href="https://en.wikipedia.org/?curid=${value.pageid}" target="_blank">View on Wikipedia</a>
                </footer>
            </li>
        `;
        return listItem;
    }).join('');

    suggestions.innerHTML = list;
}
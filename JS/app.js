let searchButton = document.getElementById("searchButton").addEventListener('click', Search);
let loadingSpot = document.getElementById("loading")
let loadingIndicator = `<div class="d-flex justify-content-center"><div class="spinner-grow text-info" role="status">
<span class="sr-only">Loading...</span>
</div></div>`;

function Search(e) {
    e.preventDefault();
    let searchTerm = document.getElementById("searchTerm").value;
    getInstruments(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${searchTerm}&limit=10&exchange=NASDAQ`);
}

async function getInstruments(url) {
    showResults();
    let searchResults = document.getElementById("searchResults");
    loadingSpot.innerHTML = loadingIndicator;
    try {
        const response = await fetch(url);
        const result = await response.json();
        loadingSpot.innerHTML = "";
        result.forEach(item => {
            let name = item.name;
            let symbol = item.symbol;

            searchResults.innerHTML += `<li><a href=company.html?symbol=${symbol} target="popup" onclick="window.open('company.html?symbol=${symbol}','popup','width=800,height=600')">${name} (${symbol})</a></li>`;
        });
    }
    catch (err) {
        throw new Error("ERROR: server error", err);
    }
}

function showResults() {
    let resultsTemplate = document.getElementsByTagName("template")[0];
    let resultsclon = resultsTemplate.content.cloneNode(true);
    document.body.appendChild(resultsclon, resultsclon);
    document.getElementById("searchResults").innerHTML = "";
}


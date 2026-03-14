// Task 6: Fetch Data
async function getRecommendations() {
    try {
        const response = await fetch('travel_recommendation_api.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

const btnSearch = document.getElementById('btnSearch');
const btnReset = document.getElementById('btnReset');
const searchInput = document.getElementById('searchInput');
const popup = document.getElementById('resultPopup');
const resultsContainer = document.getElementById('resultsContainer');
const closeBtn = document.getElementById('closePopup');

// Task 7 & 8: Search Logic
async function performSearch() {
    const keyword = searchInput.value.toLowerCase().trim();
    const data = await getRecommendations();

    resultsContainer.innerHTML = '';
    let results = [];

    // Keyword variations logic
    if (keyword === 'beach' || keyword === 'beaches') {
        results = data.beaches;

    } else if (keyword === 'temple' || keyword === 'temples') {
        results = data.temples;

    } else if (keyword === 'country' || keyword === 'countries') {
        // Flatten countries → cities
        data.countries.forEach(country =>
            results.push(...country.cities)
        );

    } else {
        results = [
            "No results found. Try searching for 'beach', 'temple', or 'country'."
        ];
    }

    if (results.length > 0) {
        displayResults(results);
    }
}


// 🧠 Search while typing
searchInput.addEventListener('input', performSearch);


// 🖱️ Search on button click
btnSearch.addEventListener('click', performSearch);

// Task 8: Display in Popup
function displayResults(results) {

    if (typeof results[0] === 'string') {
        resultsContainer.innerHTML = `<p>${results[0]}</p>`;
        popup.style.display = 'block';
        return;
    }

    results.forEach(item => {
        const card = document.createElement('div');
        card.className = 'result-card';

        // Task 10: Country Time (Optional)
        const options = { hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric' };
        const localTime = new Date().toLocaleTimeString('en-US', options);

        card.innerHTML = `
            <img src="${item.imageUrl}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            <span class="time-tag">Current Time: ${localTime}</span>
            <button style="margin: 10px; width: calc(100% - 20px);">Visit</button>
        `;
        resultsContainer.appendChild(card);
    });

    popup.style.display = 'block'; // Show popup with animation
}

// Task 9: Clear Button
btnReset.addEventListener('click', () => {
    searchInput.value = '';
    resultsContainer.innerHTML = '';
    popup.style.display = 'none';
});

// Close popup manually
closeBtn.addEventListener('click', () => {
    popup.style.display = 'none';
});
document.addEventListener('click', (event) => {
    if(event.target !== popup && !popup.contains(event.target) && event.target !== btnSearch) {
        popup.style.display = 'none';
    }
});
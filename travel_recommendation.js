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
btnSearch.addEventListener('click', async () => {
    const keyword = searchInput.value.toLowerCase().trim();
    const data = await getRecommendations();

    resultsContainer.innerHTML = ''; // Clear old results
    let results = [];

    // Keyword variations logic
    if (keyword === 'beach' || keyword === 'beaches') {
        results = data.beaches;
    } else if (keyword === 'temple' || keyword === 'temples') {
        results = data.temples;
    } else if (keyword === 'country' || keyword === 'countries') {
        // Flattening countries to show cities
        data.countries.forEach(country => results.push(...country.cities));
    }

    if (results.length > 0) {
        displayResults(results);
    } else {
        alert("Try searching for 'beach', 'temple', or 'country'");
    }
});

// Task 8: Display in Popup
function displayResults(results) {
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
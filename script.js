async function searchCountry(countryName) {
    try {
        // Show loading spinner
        document.getElementById('loading-spinner').classList.remove('hidden');
        // Fetch country data
        const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
        const data = await response.json();
        
        // Update DOM
        const country = data[0];
        document.getElementById('country-info').innerHTML = `
            <h2>${country.name.common}</h2>
            <p><strong>Capital:</strong> ${country.capital[0]}</p>
            <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
            <p><strong>Region:</strong> ${country.region}</p>
            <img src="${country.flags.svg}" alt="${country.name.common} flag">
        `;
        
        // Fetch bordering countries
        let bordersHtml = '';
        if (country.borders && country.borders.length > 0){
            for (let i = 0; i < country.borders.length; i++) {
            const code = country.borders[i];
            const responseBorders = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
            const borderData = await responseBorders.json();
            const borderCountry = Array.isArray(borderData) ? borderData[0] : borderData;
            bordersHtml += `
                <div class="border-country">
                    <p><strong>${borderCountry.name.common}</strong></p>
                    <img src="${borderCountry.flags.svg}" alt="${borderCountry.name.common} flag">
                </div>
            `;
        }
        }
        
        // Update bordering countries section
        document.getElementById('bordering-countries').innerHTML = bordersHtml;
        
    } catch (error) {
        // Show error message
        document.getElementById('error-message').innerHTML = `
            <h3>Error</h3>
            <p>${error.message}</p>
        `;
    } finally {
        // Hide loading spinner
        document.getElementById('loading-spinner').classList.add('hidden');
    }
}

// Event listeners
document.getElementById('search-btn').addEventListener('click', () => {
    const country = document.getElementById('country-input').value;
    searchCountry(country);
});

document.getElementById('country-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const country = document.getElementById('country-input').value;
        searchCountry(country);
    }
});


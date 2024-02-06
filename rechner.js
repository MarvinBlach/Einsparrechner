// Global variables
let category;
let baujahr;
let zustand;
let flaeche;

// Function to get the category
function getCategory() {
    // Select the radio buttons with hs-form-category attribute
    let radioButtons = document.querySelectorAll('input[hs-form-category]');

    // Attach the function to the click event of the radio buttons
    radioButtons.forEach(function(radioButton) {
        radioButton.addEventListener('click', function() {
            setTimeout(() => {
                // Get the hs-form-category attribute of the clicked radio button
                category = radioButton.getAttribute('hs-form-category');

                console.log(category); // This will log either 'wohn' or 'misch' depending on the clicked radio button
            }, 0);
        });
    });
}

// Call the getCategory function
getCategory();

// Function to get the baujahr
function getBaujahr() {
    // Select the element with hs-form attribute
    let baujahrElement = document.querySelector('[hs-form="baujahr"]');

    // Attach a change event listener to the baujahrElement
    baujahrElement.addEventListener('change', function() {
        // Get the value of the baujahr element
        baujahr = parseInt(baujahrElement.value);

        // Get the data for the selected year
        let data = getDataForYear(baujahr);
        console.log(data); // This will log the data for the selected year
    });
}

// Call the getBaujahr function
getBaujahr();

// Function to get the zustand
function getZustand() {
    // Select the element with hs-form attribute
    let zustandElement = document.querySelector('[hs-form="zustand"]');

    // Attach a change event listener to the zustandElement
    zustandElement.addEventListener('change', function() {
        // Get the value of the zustand element
        zustand = zustandElement.value;

        console.log(zustand); // This will log the value of the zustand element
    });
}

// Call the getZustand function
getZustand();


// Function to get the flaeche
function getFlaeche() {
    // Select the element with hs-form attribute
    let flaecheElement = document.querySelector('[hs-form="flaeche"]');

    // Attach a change event listener to the flaecheElement
    flaecheElement.addEventListener('change', function() {
        // Get the value of the flaeche element
        flaeche = flaecheElement.value;

        console.log(flaeche); // This will log the value of the flaeche element
    });
}

// Call the getFlaeche function
getFlaeche();


// First, the table data would be represented in a JavaScript object like this:
const mergedData = {
    'bis 1859': { 'unsaniert': { energy: 167.3, condition: 'sehr schlecht' }, 'teilsaniert': { energy: 93.0, condition: 'mittel' }, 'ambitioniert saniert': 54.3 },
    '1860 - 1918': { 'unsaniert': { energy: 164.5, condition: 'sehr schlecht' }, 'teilsaniert': { energy: 95.9, condition: 'mittel' }, 'ambitioniert saniert': 63.1 },
    '1919 - 1948': { 'unsaniert': { energy: 148.9, condition: 'schlecht' }, 'teilsaniert': { energy: 83.7, condition: 'mittel' }, 'ambitioniert saniert': 56 },
    '1949 - 1957': { 'unsaniert': { energy: 165.3, condition: 'sehr schlecht' }, 'teilsaniert': { energy: 111.5, condition: 'mittel' }, 'ambitioniert saniert': 67.2 },
    '1958 - 1968': { 'unsaniert': { energy: 163.4, condition: 'sehr schlecht' }, 'teilsaniert': { energy: 117.4, condition: 'mittel' }, 'ambitioniert saniert': 76.2 },
    '1969 - 1978': { 'unsaniert': { energy: 139.5, condition: 'schlecht' }, 'teilsaniert': { energy: 90.4, condition: 'mittel' }, 'ambitioniert saniert': 64.2 },
    '1979 - 1983': { 'unsaniert': { energy: 108.9, condition: 'mittel' }, 'teilsaniert': { energy: 74.9, condition: 'gut' }, 'ambitioniert saniert': 50.5 },
    '1984 - 1994': { 'unsaniert': { energy: 120.4, condition: 'mittel' }, 'teilsaniert': { energy: 94.4, condition: 'mittel' }, 'ambitioniert saniert': 38.1 },
    '1995 - 2001': { 'unsaniert': { energy: 110.5, condition: 'mittel' }, 'teilsaniert': { energy: 97.6, condition: 'mittel' }, 'ambitioniert saniert': 63.8 },
    '2002 - 2009': { 'unsaniert': { energy: 78.7, condition: 'mittel' }, 'teilsaniert': { energy: 72.9, condition: 'gut' }, 'ambitioniert saniert': 60.9 },
    '2010 - 2015': { 'unsaniert': { energy: 82.7, condition: 'mittel' }, 'teilsaniert': { energy: 70.5, condition: 'gut' }, 'ambitioniert saniert': 44.9 },
    '2016 - heute': { 'unsaniert': { energy: 70.8, condition: 'gut' }, 'teilsaniert': { energy: 64.2, condition: 'gut' }, 'ambitioniert saniert': 44.9 },
};


// Function to get data for a single year
function getDataForYear(year) {
    const ranges = Object.keys(mergedData);
    for (let range of ranges) {
        let [start, end] = range.split(' - ');
        if (range === 'bis 1859') {
            if (year <= 1859) return mergedData[range];
        } else if (range === '2016 - heute') {
            if (year >= 2016) return mergedData[range];
        } else if (year >= parseInt(start) && year <= parseInt(end)) {
            return mergedData[range];
        }
    }
    return null; // return null if no range found
}


function calculateDifference() {
    // Select the trigger element
    let triggerElement = document.querySelector('[hs-form="trigger"]');

    // Attach a click event listener to the triggerElement
    triggerElement.addEventListener('click', function() {
        // Get the data for the selected year
        let data = getDataForYear(baujahr);

        // Get the energy consumption for 'unsaniert', 'teilsaniert', and 'ambitioniert saniert'
        let unsaniertEnergy = data['unsaniert'] ? data['unsaniert']['energy'] : null; // Safeguarding in case 'unsaniert' data does not exist
        let teilsaniertEnergy = data['teilsaniert']['energy'];
        let ambitioniertSaniertEnergy = data['ambitioniert saniert'];

        // Calculate the difference between each sanierung condition and 'ambitioniert saniert'
        let differenceUnsaniertAmbitioniert = unsaniertEnergy !== null ? unsaniertEnergy - ambitioniertSaniertEnergy : 'N/A';
        let differenceTeilsaniertAmbitioniert = teilsaniertEnergy - ambitioniertSaniertEnergy;

        // Log the differences
        if (unsaniertEnergy !== null) {
            console.log(`Difference between Unsaniert and Ambitioniert Saniert: ${differenceUnsaniertAmbitioniert}`);
        }
        console.log(`Difference between Teilsaniert and Ambitioniert Saniert: ${differenceTeilsaniertAmbitioniert}`);
    });
}

// Call the calculateDifference function
calculateDifference();


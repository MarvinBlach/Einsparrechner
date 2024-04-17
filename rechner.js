// Global variables
let category;
let baujahr;
let selectedZustand = 'Unsaniert'; // Set default zustand to 'Unsaniert'
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

// Adjust the getFlaeche function if necessary to ensure flaeche is globally accessible
function getFlaeche() {
    let flaecheElement = document.querySelector('[hs-form="flaeche"]');
    flaecheElement.addEventListener('change', function() {
        flaeche = flaecheElement.value; // This will update the global flaeche variable
        console.log(flaeche); // Log the value of flaeche element
    });
}

// Function to get the selected zustand
// Declare selectedZustand globally

// Function to get the selected zustand
function getZustand() {
    let zustandElement = document.querySelector('[hs-form="zustand"]');
    
    zustandElement.value = selectedZustand; // Set the default value in the UI

    console.log('Default Zustand:', selectedZustand); // Log the default zustand

    zustandElement.addEventListener('change', function() {
        selectedZustand = zustandElement.value;
        console.log('Selected Zustand:', selectedZustand); // Confirm selected zustand is logged
    });
}

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


/*
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
getFlaeche();  */


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
    let triggerElement = document.querySelector('[hs-form="trigger"]');
    triggerElement.addEventListener('click', function() {
        console.log('Trigger clicked');

        let data = getDataForYear(baujahr); // Assuming 'baujahr' is defined correctly elsewhere
        console.log('Data retrieved:', data);

        let parsedFlaeche = parseFloat(flaeche);
        if (isNaN(parsedFlaeche)) {
            console.log('Flaeche is not a valid number');
            return; // Exit the function if flaeche is not a valid number
        }

        let unsaniertEnergy = data['unsaniert'] ? data['unsaniert']['energy'] : null;
        let teilsaniertEnergy = data['teilsaniert'] ? data['teilsaniert']['energy'] : null;
        let ambitioniertSaniertEnergy = data['ambitioniert saniert'];

        function roundToNearestHundred(value) {
            return Math.round(value / 100) * 100;
        }

        let result;
        if (selectedZustand === 'Unsaniert' && unsaniertEnergy !== null) {
            result = (unsaniertEnergy - ambitioniertSaniertEnergy) * parsedFlaeche * 0.1;
            result = roundToNearestHundred(result);
        } else if (selectedZustand === 'Teilsaniert' && teilsaniertEnergy !== null) {
            result = (teilsaniertEnergy - ambitioniertSaniertEnergy) * parsedFlaeche * 0.1;
            result = roundToNearestHundred(result);
        } else {
            console.log('No valid zustand selected or missing data for calculation.');
            return; // Exit the function if no valid zustand is selected
        }

        // Select the element with hs-result attribute and update its content
        let resultElement = document.querySelector('[hs-result="value"]');
        if (resultElement) {
            resultElement.textContent = result; // Or use .innerHTML if you need to insert HTML content
            console.log(`Result updated to: ${result}`);
        } else {
            console.log('Result element not found.');
        }
    });
}



function updateSkalaIndicatorPosition() {
    let triggerElement = document.querySelector('[hs-form="trigger"]');
    triggerElement.addEventListener('click', function() {
        console.log('Trigger clicked for updating skala indicator');

        let data = getDataForYear(baujahr); // Assuming 'baujahr' is defined correctly elsewhere
        console.log('Data for Skala Indicator:', data);

        // Retrieve condition based on the selected 'zustand'
        let condition;
        if (selectedZustand === 'Unsaniert') {
            condition = data['unsaniert'] ? data['unsaniert']['condition'] : 'mittel';
        } else if (selectedZustand === 'Teilsaniert') {
            condition = data['teilsaniert'] ? data['teilsaniert']['condition'] : 'mittel';
        } else {
            console.log('No valid zustand selected for skala indicator update.');
            return; // Exit the function if no valid zustand is selected
        }

        // Map condition to percentage for the skala indicator
        const conditionToPercentage = {
            'sehr schlecht': 0,
            'schlecht': 25,
            'mittel': 50,
            'gut': 75,
            'sehr gut': 100
        };

        let percentage = conditionToPercentage[condition.toLowerCase()];
        console.log(`Condition: ${condition}, Percentage: ${percentage}%`);

        // Find the .step-form_skala-indicator element and update its margin-left style
        let indicator = document.querySelector('.step-form_skala-indicator');
        if (indicator) {
            indicator.style.marginLeft = `${percentage}%`;
            console.log(`Skala indicator position updated to: ${percentage}%`);
        } else {
            console.log('Skala indicator element not found.');
        }

        // Find the hs-zustand element and update its text content with the calculated condition
        let zustandElement = document.querySelector('[hs-zustand]');
        if (zustandElement) {
            // Capitalize the first letter and add 'er' at the end before 'Zustand'
            let displayCondition = `${condition.charAt(0).toUpperCase() + condition.slice(1)}er Zustand`;
            zustandElement.textContent = displayCondition;
            console.log(`Zustand element updated to: ${displayCondition}`);
        } else {
            console.log('Zustand element not found.');
        }
    });
}

// Make sure to call both getZustand() and getFlaeche() as needed before this function
getZustand();
getFlaeche();
calculateDifference();
updateSkalaIndicatorPosition();



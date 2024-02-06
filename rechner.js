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
        baujahr = baujahrElement.value;

        console.log(baujahr); // This will log the value of the baujahr element
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
const { SearchMoonPhase } = require("astronomy-engine");

function calculateSankashti(givenDate) {
    try {
        // Make sure the input is a valid Date object
        const inputDate = new Date(givenDate);
        if (isNaN(inputDate)) {
            throw new Error("Invalid date provided");
        }

        // Search for the full moon (Purnima) closest to the given date
        const fullMoon = SearchMoonPhase(180, inputDate, 0);  // Full moon search

        if (!fullMoon) {
            throw new Error("Full moon not found for the given date.");
        }

        const fullMoonDate = new Date(fullMoon.date);
        
        // Sankashti Chaturthi typically happens 4 days after the full moon (Krishna Paksha)
        let sankashtiDate = new Date(fullMoonDate);
        sankashtiDate.setDate(sankashtiDate.getDate() + 4); // Add 4 days for Sankashti

        // If Sankashti falls in the next month, adjust the date accordingly
        if (sankashtiDate.getMonth() !== fullMoonDate.getMonth()) {
            sankashtiDate.setMonth(sankashtiDate.getMonth() + 1);
        }

        return sankashtiDate;
    } catch (error) {
        console.error("Error calculating Sankashti Chaturthi date: ", error.message);
        return null;
    }
}

module.exports = { calculateSankashti };



// Example call to calculate Sankashti
const sankashtiDate = calculateSankashti("2025-02-01");  // Calculate for January 2025
console.log("Calculated Sankashti Chaturthi Date:", sankashtiDate);

// Get the navbar balance element
const navbarBalanceElement = document.getElementById('navbar-balance');
let navbarBalance = 5500; // Initial balance in the navbar

// Function to update navbar balance
function updateNavbarBalance(amount) {
    navbarBalance -= amount;
    navbarBalanceElement.innerHTML = `<img src="/assets/coin.png" alt="">${navbarBalance} BDT`;
}

// Function to handle donations for each section
function handleDonation(sectionBalanceId, amountInputId, causeDescription) {
    const donationInput = document.getElementById(amountInputId);
    const donationAmount = parseFloat(donationInput.value);
    const sectionBalanceElement = document.getElementById(sectionBalanceId);
    let sectionBalance = parseFloat(sectionBalanceElement.textContent.replace('BDT', '').trim());

    // Validate the donation amount
    if (isNaN(donationAmount) || donationAmount <= 0) {
        alert("Please enter a valid donation amount (a positive number).");
        return;
    }

    // Check if the donation exceeds available balance
    if (donationAmount > navbarBalance) {
        alert("You don't have enough balance to donate this amount.");
        return;
    }

    // Deduct from navbar balance
    updateNavbarBalance(donationAmount);

    // Add to section balance
    sectionBalance += donationAmount;
    sectionBalanceElement.innerHTML = `<img src="/assets/coin.png" alt="">${sectionBalance} BDT`;

    // Save donation history in localStorage
    let donationHistory = JSON.parse(localStorage.getItem('donationHistory')) || [];
    const currentDate = new Date().toString();
    donationHistory.push({
        amount: donationAmount,
        description: `${donationAmount} Taka is Donated for ${causeDescription}`,
        date: currentDate
    });
    localStorage.setItem('donationHistory', JSON.stringify(donationHistory));

    // Clear the input field after donation
    donationInput.value = '';

    // Show the modal after a successful donation
    modal.style.display = 'flex';
}

// Event listeners for donation buttons
document.getElementById('noakhali-donate').addEventListener('click', () => {
    handleDonation('noakhali-balance', 'noakhali-amount', 'Flood Relief at Noakhali, Bangladesh');
});

document.getElementById('feni-donate').addEventListener('click', () => {
    handleDonation('feni-balance', 'feni-amount', 'Flood Relief at Feni, Bangladesh');
});

document.getElementById('quota-donate').addEventListener('click', () => {
    handleDonation('quota-balance', 'quota-amount', 'Aid for Injured in the Quota Movement');
});

// Select all donate buttons
const donateButtons = document.querySelectorAll('.donate-btn'); 
const modal = document.getElementById('donation-popup');
const closeModalButton = document.getElementById('close-popup');

// Close modal on clicking the "Close" button
closeModalButton.addEventListener('click', () => {
    modal.style.display = 'none';
});

const navbarBalanceElement = document.getElementById('navbar-balance');
let navbarBalance = 5500;

function updateNavbarBalance(amount) {
    navbarBalance -= amount;
    navbarBalanceElement.innerHTML = `<img src="/assets/coin.png" alt="">${navbarBalance} BDT`;
}

function handleDonation(sectionBalanceId, amountInputId, causeDescription) {
    const donationInput = document.getElementById(amountInputId);
    const donationAmount = parseFloat(donationInput.value);
    const sectionBalanceElement = document.getElementById(sectionBalanceId);
    let sectionBalance = parseFloat(sectionBalanceElement.textContent.replace('BDT', '').trim());

    if (isNaN(donationAmount) || donationAmount <= 0) {
        alert("Please enter a valid donation amount (a positive number).");
        return;
    }

    if (donationAmount > navbarBalance) {
        alert("You don't have enough balance to donate this amount.");
        return;
    }

    updateNavbarBalance(donationAmount);

    sectionBalance += donationAmount;
    sectionBalanceElement.innerHTML = `<img src="/assets/coin.png" alt="">${sectionBalance} BDT`;

    let donationHistory = JSON.parse(localStorage.getItem('donationHistory')) || [];
    const currentDate = new Date().toString();
    donationHistory.push({
        amount: donationAmount,
        description: `${donationAmount} Taka is Donated for ${causeDescription}`,
        date: currentDate
    });
    localStorage.setItem('donationHistory', JSON.stringify(donationHistory));


    donationInput.value = '';

    modal.style.display = 'flex';
}

document.getElementById('noakhali-donate').addEventListener('click', () => {
    handleDonation('noakhali-balance', 'noakhali-amount', 'Flood Relief at Noakhali, Bangladesh');
});

document.getElementById('feni-donate').addEventListener('click', () => {
    handleDonation('feni-balance', 'feni-amount', 'Flood Relief at Feni, Bangladesh');
});

document.getElementById('quota-donate').addEventListener('click', () => {
    handleDonation('quota-balance', 'quota-amount', 'Aid for Injured in the Quota Movement');
});


const donateButtons = document.querySelectorAll('.donate-btn'); 
const modal = document.getElementById('donation-popup');
const closeModalButton = document.getElementById('close-popup');

closeModalButton.addEventListener('click', () => {
    modal.style.display = 'none';
});
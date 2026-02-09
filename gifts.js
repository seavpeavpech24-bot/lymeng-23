let giftChosen = false;
const giftAmounts = ['$19.99', '$23.00', '$29.26'];
let shuffledAmounts = [];

// Shuffle the gift amounts when page loads
function shuffleGifts() {
    shuffledAmounts = [...giftAmounts];
    for (let i = shuffledAmounts.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledAmounts[i], shuffledAmounts[j]] = [shuffledAmounts[j], shuffledAmounts[i]];
    }
    
    // Update the gift amounts in the HTML
    for (let i = 1; i <= 3; i++) {
        const amountElement = document.getElementById(`amount-${i}`);
        if (amountElement) {
            amountElement.textContent = shuffledAmounts[i - 1];
        }
    }
}

// Call shuffle on page load
window.addEventListener('DOMContentLoaded', shuffleGifts);

function openGift(giftNumber) {
    // If a gift has already been chosen, don't allow opening another
    if (giftChosen) {
        return;
    }
    
    const giftBox = document.getElementById(`gift-${giftNumber}`);
    const closedState = document.getElementById(`closed-${giftNumber}`);
    const openedState = document.getElementById(`content-${giftNumber}`);
    
    // Check if already opened
    if (closedState.classList.contains('hidden')) {
        return;
    }
    
    // Mark that a gift has been chosen
    giftChosen = true;
    
    // Hide closed state and show opened state
    closedState.classList.add('hidden');
    openedState.classList.remove('hidden');
    openedState.classList.add('revealed');
    
    // Add opened class for animation
    giftBox.classList.add('opened');
    
    // Disable other gift boxes
    for (let i = 1; i <= 3; i++) {
        if (i !== giftNumber) {
            const otherBox = document.getElementById(`gift-${i}`);
            otherBox.style.opacity = '0.5';
            otherBox.style.cursor = 'not-allowed';
            otherBox.style.pointerEvents = 'none';
        }
    }
    
    // Show congratulations message
    setTimeout(() => {
        const chosenMessage = document.getElementById('chosen-message');
        chosenMessage.classList.remove('hidden');
        
        // Create celebration effect
        createCelebration();
    }, 500);
}

function createCelebration() {
    // Create floating emojis
    const emojis = ['🎉', '🎊', '✨', '🎈', '🎁', '💝'];
    const body = document.body;
    
    for (let i = 0; i < 20; i++) {
        const emoji = document.createElement('div');
        emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        emoji.style.position = 'fixed';
        emoji.style.left = Math.random() * 100 + '%';
        emoji.style.top = '-50px';
        emoji.style.fontSize = '2rem';
        emoji.style.zIndex = '1000';
        emoji.style.pointerEvents = 'none';
        emoji.style.animation = `fall ${Math.random() * 2 + 3}s linear`;
        
        body.appendChild(emoji);
        
        setTimeout(() => {
            emoji.remove();
        }, 5000);
    }
}

// Add fall animation dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes fall {
        to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

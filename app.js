document.addEventListener('DOMContentLoaded', () => {
    const bookingForm = document.getElementById('bookingForm');
    const payBtn = document.getElementById('payBtn');

    // UPI Configuration
    const upiId = "jithinck2000-1@okhdfcbank";
    const payeeName = "AstroVision";
    const amount = "250";
    const currency = "INR";
    const transactionNote = "AstroVision Consultation";

    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent page reload

        // Get form values
        const name = document.getElementById('name').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const dob = document.getElementById('dob').value;

        // Basic Validation
        if (!name || !phone || !dob) {
            alert("Please fill all the details.");
            return;
        }

        if (phone.length !== 10) {
            alert("Please enter a valid 10-digit phone number.");
            return;
        }

        // Change button text to indicate processing
        payBtn.textContent = "Redirecting to Payment...";
        payBtn.disabled = true;

        // Construct UPI Deep Link
        const upiUrl = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(payeeName)}&am=${amount}&cu=${currency}&tn=${encodeURIComponent(transactionNote)}`;

        // Try to open the UPI app
        window.location.href = upiUrl;

        // Fallback: Reset button after a few seconds
        setTimeout(() => {
            payBtn.textContent = "Make Payment & Book Slot";
            payBtn.disabled = false;
        }, 5000);
    });

    // --- SERVICE WORKER REGISTRATION ---
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('./sw.js')
                .then((registration) => {
                    console.log('ServiceWorker registration successful with scope: ', registration.scope);
                })
                .catch((error) => {
                    console.log('ServiceWorker registration failed: ', error);
                });
        });
    }
});
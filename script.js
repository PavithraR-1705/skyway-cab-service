// ==========================================
// 1. BOOKING LOGIC (User input-ah save panna)
// ==========================================
const bookingForm = document.getElementById('bookingForm');

if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Page refresh aaguradha thadukkum
        
        // Form-la irundhu values-ah edukkurom
        const newBooking = {
            name: document.getElementById('name').value,
            pickup: document.getElementById('pickup').value,
            drop: document.getElementById('drop').value,
            phone: document.getElementById('phone').value,
            car: document.getElementById('carType').value,
            rideDate: document.getElementById('rideDate').value, // User choose panna date
            rideTime: document.getElementById('rideTime').value, // User choose panna time
            bookedAt: new Date().toLocaleString()               // Booking panna neram
        };

        // LocalStorage-la irundhu pazhaya data-va edukkurom (array-ah)
        let bookings = JSON.parse(localStorage.getItem('skyway_data')) || [];
        
        // Pudhu booking-ah array-kulla thallurom
        bookings.push(newBooking);
        
        // Update panna array-va thirumba LocalStorage-la save panrom
        localStorage.setItem('skyway_data', JSON.stringify(bookings));

        // User-ku confirmation alert
        alert(`🚕 Ride Confirmed!\nDate: ${newBooking.rideDate}\nTime: ${newBooking.rideTime}`);
        
        // Booking mudinjadhum Admin page-ku kooti porom
        window.location.href = "customers-list.html"; 
    });
}

// ==========================================
// 2. ADMIN TABLE LOGIC (Data-va display panna)
// ==========================================
const customerTable = document.querySelector("#customer-table tbody");

if (customerTable) {
    // LocalStorage-la irundhu real user bookings-ah edukkurom
    const savedBookings = JSON.parse(localStorage.getItem('skyway_data')) || [];
    
    // Data illana "No Bookings" message kaatuvom
    if (savedBookings.length === 0) {
        customerTable.innerHTML = `
            <tr>
                <td colspan="6" style="text-align:center; padding: 20px; color: #888;">
                    🚫 No bookings received yet.
                </td>
            </tr>`;
    } else {
        // User kudutha input-ah matum table rows-ah maathrom
        customerTable.innerHTML = savedBookings.map((booking, index) => `
            <tr>
                <td>${index + 1}</td>
                <td>${booking.name}</td>
                <td style="font-weight:bold; color:#007BFF;">${booking.car}</td>
                <td>${booking.pickup} ➔ ${booking.drop}</td>
                <td style="color: #28a745; font-weight: 500;">
                    ${booking.rideDate} <br> <small>${booking.rideTime}</small>
                </td>
                <td>${booking.phone}</td>
            </tr>
        `).join('');
    }
}
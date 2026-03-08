// --- 1. DRIVERS LIST (Idhu admin-ku theriyum) ---
const drivers = [
  { name: "Raj", contact: "9876543210" },
  { name: "Arun", contact: "9123456780" }
];

// --- 2. POPULATE DRIVERS TABLE ---
const driversTable = document.querySelector("#drivers-table tbody");
if (driversTable) {
    driversTable.innerHTML = drivers.map((driver, index) => `
        <tr>
            <td>${index + 1}</td>
            <td>${driver.name}</td>
            <td>${driver.contact}</td>
        </tr>
    `).join('');
}

// admin.js - customerTable logic-la idhai update pannunga
customerTable.innerHTML = savedBookings.map((booking, index) => `
    <tr>
        <td>${index + 1}</td>
        <td>${booking.name}</td>
        <td><strong>${booking.car}</strong></td>
        <td>${booking.pickup} ➔ ${booking.drop}</td>
        <td>${booking.rideDate} | ${booking.rideTime}</td> <td>${booking.phone}</td>
    </tr>
`).join('');

if (customerTable) {
    // LocalStorage-la irundhu user panna bookings-ah edukkurom
    const savedBookings = JSON.parse(localStorage.getItem('skyway_data')) || [];
    
    // Check: User innum booking pannala-na "No Bookings" nu kaatum
    if (savedBookings.length === 0) {
        customerTable.innerHTML = `
            <tr>
                <td colspan="5" style="text-align:center; padding: 20px; color: #888;">
                    🚫 No bookings received yet.
                </td>
            </tr>`;
    } else {
        // User inputs-ah matum loop panni table-la kottuvom
        customerTable.innerHTML = savedBookings.map((booking, index) => `
            <tr>
                <td>${index + 1}</td>
                <td>${booking.name}</td>
                <td style="font-weight:bold; color:#007BFF;">${booking.car}</td>
                <td>${booking.pickup} ➔ ${booking.drop}</td>
                <td>${booking.phone}</td>
            </tr>
        `).join('');
    }
}

// --- 4. CLEAR ALL BOOKINGS (Optional feature) ---
// Admin-ku ellaathaaiyum clear panna button venum-na idhai use pannalam
function clearAllBookings() {
    if(confirm("Are you sure you want to clear all booking data?")) {
        localStorage.removeItem('skyway_data');
        location.reload(); // Page-ah refresh panna
    }
}
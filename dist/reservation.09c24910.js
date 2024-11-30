document.getElementById("reservation-form").addEventListener("submit", async function(e) {
    e.preventDefault(); // Запобігає перезавантаженню сторінки
    const reservation = {
        date: document.getElementById("date").value,
        time: document.getElementById("time").value,
        people: document.getElementById("people").value,
        name: document.getElementById("name").value,
        phone: document.getElementById("phone").value
    };
    try {
        const response = await fetch("http://localhost:3000/reservations", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(reservation)
        });
        if (response.ok) alert("Reservation confirmed!");
        else alert("Failed to reserve a table. Please try again.");
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred. Please try again later.");
    }
});

//# sourceMappingURL=reservation.09c24910.js.map

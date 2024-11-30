document.addEventListener("DOMContentLoaded", ()=>{
    const dateInput = document.getElementById("date");
    const timeSelect = document.getElementById("time");
    const reservationForm = document.getElementById("reservation-form");
    if (!dateInput || !timeSelect || !reservationForm) {
        console.error("One or more elements were not found in the DOM.");
        return;
    }
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];
    dateInput.min = formattedDate;
    function clearTimeSelect() {
        timeSelect.innerHTML = "";
        const placeholderOption = document.createElement("option");
        placeholderOption.value = "";
        placeholderOption.disabled = true;
        placeholderOption.selected = true;
        placeholderOption.textContent = "";
        timeSelect.appendChild(placeholderOption);
    }
    async function loadAvailableTimeSlots(selectedDate) {
        clearTimeSelect();
        if (!selectedDate) return;
        try {
            const response = await fetch("http://localhost:3000/unavailableTimeSlots");
            if (!response.ok) throw new Error("Failed to fetch unavailable time slots");
            const unavailableTimeSlots = await response.json();
            const allTimeSlots = [];
            for(let hour = 10; hour <= 23; hour++)for(let minute = 0; minute < 60; minute += 30){
                const timeString = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
                allTimeSlots.push(timeString);
            }
            const unavailableForDate = unavailableTimeSlots.find((slot)=>slot.date === selectedDate);
            const availableTimeSlots = unavailableForDate ? allTimeSlots.filter((time)=>!unavailableForDate.timeslots.includes(time)) : allTimeSlots;
            if (availableTimeSlots.length > 0) availableTimeSlots.forEach((time)=>{
                const option = document.createElement("option");
                option.value = time;
                option.textContent = time;
                timeSelect.appendChild(option);
            });
            else {
                const noOption = document.createElement("option");
                noOption.textContent = "No available times";
                noOption.disabled = true;
                timeSelect.appendChild(noOption);
            }
        } catch (error) {
            console.error("Error fetching or processing time slots:", error);
            alert("Failed to load available time slots. Please try again later.");
        }
    }
    dateInput.addEventListener("change", ()=>{
        loadAvailableTimeSlots(dateInput.value);
    });
    function resetForm() {
        reservationForm.reset();
        clearTimeSelect();
    }
    reservationForm.addEventListener("submit", async (event)=>{
        event.preventDefault();
        const date = dateInput.value;
        const time = timeSelect.value;
        const people = parseInt(document.getElementById("people").value, 10);
        const name = document.getElementById("name").value.trim();
        const phone = document.getElementById("phone").value.trim();
        if (!date || !time) {
            alert("Please select a valid date and time.");
            return;
        }
        try {
            const reservation = {
                date,
                time,
                people,
                name,
                phone
            };
            const reservationResponse = await fetch("http://localhost:3000/reservations", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(reservation)
            });
            if (!reservationResponse.ok) {
                const errorText = await reservationResponse.text();
                console.error("Reservation POST error:", errorText);
                throw new Error("Failed to create reservation");
            }
            const unavailableResponse = await fetch("http://localhost:3000/unavailableTimeSlots");
            if (!unavailableResponse.ok) throw new Error("Failed to fetch unavailable time slots");
            const unavailableTimeSlots = await unavailableResponse.json();
            let unavailableForDate = unavailableTimeSlots.find((slot)=>slot.date === date);
            if (!unavailableForDate) {
                unavailableForDate = {
                    date,
                    timeslots: [
                        time
                    ],
                    id: Date.now().toString()
                };
                const createResponse = await fetch("http://localhost:3000/unavailableTimeSlots", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(unavailableForDate)
                });
                if (!createResponse.ok) {
                    console.error("Failed to create new unavailable slot:", await createResponse.text());
                    throw new Error("Failed to create unavailable time slot");
                }
            } else if (!unavailableForDate.timeslots.includes(time)) {
                unavailableForDate.timeslots.push(time);
                const updateResponse = await fetch(`http://localhost:3000/unavailableTimeSlots/${unavailableForDate.id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(unavailableForDate)
                });
                if (!updateResponse.ok) {
                    console.error("Failed to update unavailable slot:", await updateResponse.text());
                    throw new Error("Failed to update unavailable time slot");
                }
            }
            resetForm();
            alert(`Reservation confirmed for ${time} on ${date}.`);
        } catch (error) {
            console.error("Detailed error:", error.message, error);
            alert("An error occurred while processing your reservation.");
        }
    });
});

//# sourceMappingURL=reservation.6bde8595.js.map

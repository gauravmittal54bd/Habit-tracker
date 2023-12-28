// script.js

document.addEventListener("DOMContentLoaded", function() {
    const habitInput = document.getElementById("habit-input");
    const addHabitButton = document.getElementById("add-habit-btn");
    const habitList = document.getElementById("habit-list");

    addHabitButton.addEventListener("click", async function(event) {
        event.preventDefault();

        const habitText = habitInput.value.trim();
        if (habitText !== "") {
            const habitItem = document.createElement("div");
            habitItem.classList.add("habit-item");
            habitItem.innerHTML = `
                <i class="fas fa-check-circle"></i>
                <span>${habitText}</span>
            `;
            habitList.appendChild(habitItem);
            habitInput.value = "";

            // Show the habit list container
            habitList.style.display = "block";

            // Send the habit data to the server
            const response = await fetch('/addHabit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title: habitText }),
            });

            // Handle the response from the server
            const responseData = await response.text();
            console.log(responseData);

            // Display temporary message
            const message = document.createElement("div");
            message.classList.add("message");
            message.textContent = responseData;
            document.body.appendChild(message);

            // Remove the message after 4 seconds
            setTimeout(() => {
                document.body.removeChild(message);
            }, 4000);
        }
    });

    habitInput.addEventListener("input", function() {
        // Hide the habit list container if no text is entered
        if (habitInput.value.trim() === "") {
            habitList.style.display = "none";
        }
    });
});











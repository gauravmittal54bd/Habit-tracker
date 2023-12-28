
  document.addEventListener('DOMContentLoaded', function () {
    // Get the "Open Calendar" links
    const openCalendarLinks = document.querySelectorAll('.open-calendar-btn');
    
    // Add click event listeners to open the calendar in a new window
    openCalendarLinks.forEach(link => {
      link.addEventListener('click', function (event) {
        event.preventDefault();
        const habitName = link.getAttribute('href').split('/')[1];
        // Open the calendar page for the specific habit in a new window
        const calendarWindow = window.open(`/${habitName}/calendar`, '_blank', 'width=460,height=500');
        calendarWindow.focus();
      });
    });
  });

  // view-script.js

  document.addEventListener('DOMContentLoaded', () => {
    const checkboxes = document.querySelectorAll('.status-toggle');
    
    checkboxes.forEach(checkbox => {
        const customCheckboxMark = checkbox.nextElementSibling; // Get the next sibling span element
        const initialStatus = checkbox.getAttribute('data-status') === 'true';
  
        // Set the initial content of the custom-checkbox-mark span based on initialStatus
        customCheckboxMark.textContent = initialStatus ? 'Completed' : 'Pending';
  
        checkbox.addEventListener('change', async () => {
            const habitId = checkbox.getAttribute('data-habit-id');
            const newStatus = checkbox.checked;
        
            try {
                const response = await fetch(`/updateStatus/${habitId}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ status: newStatus })
                });
  
                if (response.ok) {
                    console.log('Completion status updated successfully.');
                    // Update the content of the custom-checkbox-mark span
                    customCheckboxMark.textContent = newStatus ? 'Completed' : 'Pending';
                    // Update the data-status attribute to reflect the new status
                    checkbox.setAttribute('data-status', newStatus);
                } else {
                    console.error('Error updating completion status.');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        });
    });
});
  

  document.addEventListener("DOMContentLoaded", () => {
    const deleteButtons = document.querySelectorAll(".delete-button");
  
    deleteButtons.forEach(button => {
      button.addEventListener("click", async () => {
        const habitId = button.getAttribute("data-habit-id");
        try {
          const response = await fetch(`/deleteHabit/${habitId}`, {
            method: "DELETE",
          });
  
          if (response.ok) {
            // Remove the habit row from the UI
            const habitRow = button.closest("tr");
            habitRow.remove();
          } else {
            console.error("Error deleting habit");
          }
        } catch (error) {
          console.error("Error:", error);
        }
      });
    });
  });

//Add this script to your viewAllHabits.hbs or view-script.js
document.addEventListener('DOMContentLoaded', function () {
    const dropdowns = document.querySelectorAll('.habit-Status');

    dropdowns.forEach((dropdown) => {
        dropdown.addEventListener('change', function () {
            const habitId = this.getAttribute('data-habit-id');
            const selectedStatus = this.value;

            // Send the updated value to the server
            updateHabitStatus(habitId, selectedStatus);
        });
    });

    function updateHabitStatus(habitId, selectedStatus) {
        // Send an AJAX request to the server to update the habit's status
        // You can use fetch or any other library like Axios for this
        console.log(habitId,selectedStatus,"dsd")
        fetch(`/updateHabitStatus/${habitId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: selectedStatus }),
        })
            .then((response) => {
                if (response.ok) {
                    console.log('Status updated successfully');
                } else {
                    console.error('Failed to update status');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
});


document.addEventListener("DOMContentLoaded", function() {
  // ... Other code ...

  // Add an event listener for changes to the checkboxes
  const favoriteCheckboxes = document.querySelectorAll(".favorite-checkbox");
  favoriteCheckboxes.forEach(checkbox => {
    checkbox.addEventListener("change", async function(event) {
      const habitId = event.target.getAttribute("data-habit-id");
      const isFavorite = event.target.checked;

      // Send an HTTP request to update the database
      const response = await fetch(`/updateFavorite/${habitId}`, {
        method: 'PATCH', // Use the appropriate HTTP method (e.g., PATCH)
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ favorite: isFavorite }),
      });

      if (response.ok) {
        console.log(`Favorite status updated for habit with ID ${habitId}`);
      } else {
        console.error(`Failed to update favorite status for habit with ID ${habitId}`);
      }
    });
  });
});



  


  

  

  


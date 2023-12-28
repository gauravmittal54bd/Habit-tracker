function getDayOfWeek(dateString) {
    // Create a Date object from the input date string
    const date = new Date(dateString);

    // Define an array of weekday names
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // Get the day of the week (0 = Sunday, 1 = Monday, etc.)
    const dayOfWeek = date.getDay();

    // Return the corresponding weekday name
    return weekdays[dayOfWeek];
}

module.exports = getDayOfWeek;
function formatDate(inputDate) {
    const today = new Date();
    const todayDate = today.toISOString().split('T')[0];
    
    if (inputDate === todayDate) {
      return "Today's habit";
    }
  
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const [year, month, day] = inputDate.split('-');
    
    if (month < 1 || month > 12 || day < 1 || day > 31) {
      return "Invalid date";
    }
  
    return `${day} ${months[month - 1]} ${year}`;
  }

  module.exports = formatDate;
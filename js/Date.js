let dateAndTime = document.getElementById('dateAndTime')

function getFormattedDateTime() {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    const now = new Date();
    const dayOfWeek = daysOfWeek[now.getDay()];
    const dayOfMonth = now.getDate();
    const month = months[now.getMonth()];
    const year = now.getFullYear();

    // Function to get the correct ordinal suffix for the day of the month
    function getOrdinalSuffix(day) {
        if (day > 3 && day < 21) return 'th';
        switch (day % 10) {
            case 1: return 'st';
            case 2: return 'nd';
            case 3: return 'rd';
            default: return 'th';
        }
    }

    const ordinalSuffix = getOrdinalSuffix(dayOfMonth);
    dateAndTime.innerText = dayOfWeek + ", " + dayOfMonth + ordinalSuffix + " " + month + " " + year
}
getFormattedDateTime();


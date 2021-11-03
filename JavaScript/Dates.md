# Dates

```javascript
const today = new Date();     // Creates new date object
today                         // Wed Nov 03 2021 12:05:58 GMT-0400 (Eastern Daylight Time)

today.getDate();              // 3; Day of the month as a number
today.getFullYear();          // 2021
today.getYear();              // 121; 100 is 2000
today.getMonth();             // 11; Month as a number
today.getDay();               // 4; Day of week as a number
today.getHours();             // 12; Hours
today.getMinutes();           // 5; Minutes
today.getSeconds();           // 58; Seconds
today.getMilliseconds();      // Milliseconds since Jan 01, 1970

Date.parse('03 Nov 2021');    // Converts string to milliseconds since Jan 01, 1970

today.setDate();              // Set the day (accepts negative values)
today.setFullYear();          // Set the year
today.setHours();             // Set the hours (0 to 23)
today.setMilliseconds();      // Set the milliseconds (0 to 999)
today.setMonth();             // Set the month (0 to 11)
today.setSeconds();           // Set the seconds (0 to 59)
today.setTime();              // Set the time as milliseconds since Jan 01, 1970
```
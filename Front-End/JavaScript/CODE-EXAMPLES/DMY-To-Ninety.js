
const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

const calculateRemaining = (born) => {
	const dateBorn = new Date(born);
  const now = new Date();
  
  let result = {};
  
  const toYear = dateBorn.getFullYear() + 90;
  const toMonth = dateBorn.getMonth();
  const toDay = dateBorn.getDate();
  const dateAt90 = new Date(toYear, toMonth, toDay);

  const nowYear = now.getFullYear();
  const nowMonth = now.getMonth();
  const nowDay = now.getDate();

  const inYears = toYear - nowYear;
  result.totalYearsLeft = inYears;
  
  const inMonths = (toMonth + 12 * toYear) - (nowMonth + 12 * nowYear);
  result.totalMonthsLeft = inMonths;
  
  const inDays = Math.floor((dateAt90 - now) / day);
  result.totalDaysLeft = inDays;
  
  result.to90YearsOld = dateAt90.toLocaleDateString();
    
  return result;
};

console.log(calculateRemaining('13 Apr 1968'));

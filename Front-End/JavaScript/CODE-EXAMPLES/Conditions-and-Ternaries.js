
const runner = 'demi';
const age = 20;

const canRun = (age >= 16 && age <= 65);
const innerMessage = canRun ? `is registered for` : `can't run in`;

const message = `${ runner } ${ innerMessage } the race`;
console.log(message);


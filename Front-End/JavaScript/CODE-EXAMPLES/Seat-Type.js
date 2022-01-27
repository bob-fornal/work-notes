
const checkSeat = (seat) => {
  const seatSlice = seat.slice(-1);
  let type = '';
  switch (true) {
    case (['B', 'E'].includes(seatSlice) === true):
      type = 'This is a middle seat';
      break;
    case (['A', 'F'].includes(seatSlice) === true):
      type = 'This is a window seat';
      break;
    default:
      type = 'This is an aisle seat';
      break;
  }
  alert(`${ seat }: ${ type }`);
};

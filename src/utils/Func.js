const month = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

export const getNowDateTime = () => {
  const todayDate = new Date();
  return ("0"+todayDate.getDate()).slice(-2) + ' ' + month[todayDate.getMonth()] + ' ' + todayDate.getFullYear()
    + ' ' + ("0"+todayDate.getHours()).slice(-2) + ':' + ("0"+todayDate.getMinutes()).slice(-2) + ':' + ("0"+todayDate.getSeconds()).slice(-2);
};

export const getNowTimestamp = () => {
  const todayDate = new Date();
  return todayDate.getTime();
};

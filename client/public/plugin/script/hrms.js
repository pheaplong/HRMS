const checkTime = (i) => {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}
const startTime = () => {
  var today = new Date();
  var h = today.getHours();
  var m = today.getMinutes();
  var s = today.getSeconds();
  // add a zero in front of numbers<10
  m = checkTime(m);
  s = checkTime(s);
//   $('#time').text(h + ":" + m + ":" + s)
  let t = setTimeout(function () {
    startTime()
  }, 500);
}
$(document).ready(() => {
   startTime();
})


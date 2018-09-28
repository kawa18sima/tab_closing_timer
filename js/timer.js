function returnTime(){
  let d = new Date();
  return timer([d.getHours(), d.getMinutes(), d.getSeconds()]);
}


function timer(array){
  const second = [3600, 60, 1];
  let sum = 0;
  for (let i = 0; i<array.length; i++){
    sum += second[i] * array[i];
  }
  return sum;
}

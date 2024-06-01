const bubleSort = (array) => {
  let temp;
  let count = 0;
  for (i = 0; i < array.length; i++) {
    for (j = 0; j < array.length - i; j++) {
      console.log(j, i);
      if (array[j] > array[j + 1]) {
        temp = array[j + 1];
        array[j + 1] = array[j];
        array[j] = temp;
      }
      count++;
    }
  }
  return array;
};

let arr = [3, 2, 5, 1];

bubleSort(arr);

const bubleSort1 = (array) => {
  let temp;
  let count = 0;
  for (i = 0; i < array.length; i++) {
    for (j = 0; j < array.length - i; j++) {
      if (array[j] > array[j + 1]) {
        temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
      }
      count++;
    }
  }
  console.log(count);
  return array;
};

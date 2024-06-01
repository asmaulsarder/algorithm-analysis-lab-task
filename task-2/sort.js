const chose_sort_algorithm = document.getElementById(
  "chosen_sort_algorithm_element"
);

let order_of_sort = "ascending_order";
let selected_sort_algoright = "";
let sorting_number_of_n = 0;
let is_show_sorting_button = false;
chose_sort_algorithm.addEventListener("change", function (e) {
  e.preventDefault();

  if (e.target.value) {
    selected_sort_algoright = e.target.value;
  } else {
    selected_sort_algoright = "";
    sorting_number_of_n = 0;
    sorting_elements_container.innerHTML = "";
    document.getElementById("sorting_number_of_n").value = "";
  }
  stepTwoForSort();
  stepThreeForSort();
});

document
  .getElementById("sort_order_element")
  .addEventListener("change", function (e) {
    e.preventDefault();
    if (e.target.value) {
      order_of_sort = e.target.value;
      startSortingAlgorithm();
    }
  });

const show_sort_order_element = document.querySelector(
  ".show_sort_order_element"
);
const show_sort_step_two = document.querySelector(".sort-step-two");

function stepTwoForSort() {
  if (selected_sort_algoright) {
    show_sort_order_element.style.display = "inline-block";
    show_sort_step_two.style.display = "inline-block";
  } else {
    show_sort_order_element.style.display = "none";
    show_sort_step_two.style.display = "none";
  }
}

const show_sorting_step_three = document.querySelector(".sorting-step-three");
const sorting_step_three_title = document.querySelector(
  "#sorting_step_three_title"
);

function stepThreeForSort() {
  if (selected_sort_algoright == "buble_sort") {
    sorting_step_three_title.innerHTML = "Enter the elements of Buble Sort:";
  } else if (selected_sort_algoright == "insertion_sort") {
    sorting_step_three_title.innerHTML =
      "Enter the elements of Insertion Sort:";
  } else if (selected_sort_algoright == "selection_sort") {
    sorting_step_three_title.innerHTML =
      "Enter the elements of Selection Sort:";
  } else {
    show_sorting_step_three.style.display = "none";
    sorting_step_three_title.innerHTML = "";
  }
  stepFourForSort();
  if (sorting_number_of_n > 0 && selected_sort_algoright) {
    show_sorting_step_three.style.display = "block";
  } else {
    show_sorting_step_three.style.display = "none";
  }
}

const sorting_elements_container = document.getElementById(
  "sorting_elements_container"
);
function stepFourForSort() {
  sorting_elements_container.innerHTML = "";
  if (sorting_number_of_n > 0) {
    for (let i = 0; i < sorting_number_of_n; i++) {
      const element = `<input onInput="itemChangeHandaler(event)" class="array_item" type="number" id="${i}" placeholder="${
        i + 1
      }">`;
      sorting_elements_container.innerHTML += element;
    }
  }
  //   is_show_search_button = false;
}

document
  .getElementById("sorting_number_of_n")
  .addEventListener("input", function (e) {
    if (e.target.value) {
      sorting_number_of_n = Number(e.target.value);
    } else {
      sorting_number_of_n = 0;
    }
    stepThreeForSort();
  });

//   file functionality

// file reader
let sorting_file_element = document.getElementById("sorting_data_file");
sorting_file_element.addEventListener("change", function (e) {
  let file = e.target.files[0];
  let reader = new FileReader();
  sorting_file_element.value = null;
  reader.onload = function () {
    let array_data = JSON.parse(reader.result).data;

    const elements_container = document.getElementById(
      "sorting_elements_container"
    );
    elements_container.innerHTML = "";
    if (array_data && array_data.length > 0) {
      show_sorting_step_three.style.display = "block";
      sorting_number_of_n = array_data.length;
      document.getElementById("sorting_number_of_n").value =
        sorting_number_of_n;
      for (let i = 0; i < sorting_number_of_n; i++) {
        const element = `<input value="${
          array_data[i]
        }" onInput="sortingItemChangeHandaler(event)" class="sorting_array_item" type="number" id="${i}" placeholder="${
          i + 1
        }">`;
        elements_container.innerHTML += element;
      }
    } else {
      sorting_number_of_n = 0;
    }
    is_show_sorting_button = true;

    showSortingButton();
  };

  reader.readAsText(file);
});
// download file example
function fileFormat() {
  let array = generateUniqueRandoms(1, 1000, 42);

  let storageObj = {
    data: array,
  };
  var dataStr =
    "data:text/json;charset=utf-8," +
    encodeURIComponent(JSON.stringify(storageObj));
  var dlAnchorElem = document.getElementById("sorting_download_file_format");
  dlAnchorElem.setAttribute("href", dataStr);
  dlAnchorElem.setAttribute("download", "data-format.json");
}

fileFormat();

// unique random number generator
function generateUniqueRandoms(min, max, count) {
  if (count > max - min + 1) {
    console.error(
      "Cannot generate more unique random numbers than available in the range."
    );
    return [];
  }

  let generatedNumbers = new Set();

  function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  let uniqueNumbers = [];
  while (generatedNumbers.size < count) {
    let randomNumber;
    do {
      randomNumber = getRandom(min, max);
    } while (generatedNumbers.has(randomNumber));

    generatedNumbers.add(randomNumber);
    uniqueNumbers.push(randomNumber);
  }

  return uniqueNumbers;
}
// sorting item change handaler

function sortingItemChangeHandaler(e) {
  const elements = document.querySelectorAll(".sorting_array_item");
  let count = 0;
  elements.forEach((item) => {
    if (!item.value) {
      count++;
    }
  });
  if (count > 0) {
    is_show_sorting_button = false;
    showSortingButton();
  } else {
    is_show_sorting_button = true;
    showSortingButton();
  }
}

// show sorting button
let start_sorting = document.getElementById("start_sorting");
function showSortingButton() {
  if (
    is_show_sorting_button &&
    sorting_number_of_n > 0 &&
    selected_sort_algoright
  ) {
    start_sorting.style.display = "inline-block";
  } else {
    start_sorting.style.display = "none";
  }
}

// start sorting
start_sorting.addEventListener("click", function (e) {
  e.preventDefault();
  startSortingAlgorithm();
});

function startSortingAlgorithm() {
  if (selected_sort_algoright == "buble_sort") {
    bubleSort();
  } else if (selected_sort_algoright == "insertion_sort") {
    insertionSort();
  } else {
    selectionSort();
  }
}
// sorting functionality

function bubleSort() {
  let temp;
  let count = 0;
  for (i = 0; i < array.length; i++) {
    for (j = 0; j < array.length - i; j++) {
      let is_ascending_order =
        order_of_sort == "ascending_order"
          ? array[j] > array[j + 1]
          : array[j] < array[j + 1];
      if (is_ascending_order) {
        temp = array[j + 1];
        array[j + 1] = array[j];
        array[j] = temp;
      }
      count++;
    }
  }
  showResult(array);
}

function insertionSort() {
  let array = getUnsortingArray();
  let i, key, j;
  for (i = 1; i < array.length; i++) {
    key = array[i];
    j = i - 1;

    // Move elements of array[0..i-1],
    // that are greater than key,
    // to one position ahead of their
    // current position

    if (order_of_sort == "ascending_order") {
      while (j >= 0 && array[j] > key) {
        array[j + 1] = array[j];
        j = j - 1;
      }
    } else {
      while (j >= 0 && array[j] < key) {
        array[j + 1] = array[j];
        j = j - 1;
      }
    }

    array[j + 1] = key;
  }
  showResult(array);
}
function selectionSort() {
  let array = getUnsortingArray();
  let i, j, small;

  for (
    i = 0;
    i < array.length - 1;
    i++ // One by one move boundary of unsorted subarray
  ) {
    small = i; //minimum element in unsorted array

    for (j = i + 1; j < array.length; j++) {
      let is_ascending_order =
        order_of_sort == "ascending_order"
          ? array[j] < array[small]
          : array[j] > array[small];

      if (is_ascending_order) {
        small = j;
      }
    }
    // Swap the minimum element with the first element
    let temp = array[small];
    array[small] = array[i];
    array[i] = temp;
  }
  showResult(array);
}

function getUnsortingArray() {
  let items = [];
  const elements = document.querySelectorAll(".sorting_array_item");
  elements.forEach(function (item) {
    items.push(Number(item.value));
  });
  return items;
}
const sorting_step_four = document.querySelector(".sorting_step_four");
const show_sorting_result = document.getElementById("show_sorting_result");
const result_title = document.getElementById("result_title");

function showResult(array) {
  show_sorting_result.innerHTML = "";
  result_title.innerHTML = order_of_sort.replace("_", " ");

  if (array.length > 0) {
    sorting_step_four.style.display = "block";
    array.forEach(function (item) {
      const element = `<input value="${item}" class="result_items" type="number" disabled>`;
      show_sorting_result.innerHTML += element;
    });
  }
}

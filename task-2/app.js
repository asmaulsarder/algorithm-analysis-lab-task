const choosen_algorithm = document.getElementById("choosen_algorithm");
const show_chosen_item = document.getElementById("show_chosen_item");
const number_of_n = document.getElementById("number_of_n");
const start_search = document.getElementById("start_search");
const search_key = document.getElementById("search_key");

let n = 0;
let selected_algoright = 0;
let key = null;

let is_step_two = false;
let is_step_three = false;
let is_step_four = false;
let order_of_search = 1;

choosen_algorithm.addEventListener("change", function (e) {
  const step_three_title = document.getElementById("step_three_title");
  if (e.target.value == "1") {
    selected_algoright = 1;
    step_three_title.innerHTML = "Enter elements of the Linear Search:";
    linearSearch();
  } else if (e.target.value == "2") {
    selected_algoright = 2;
    step_three_title.innerHTML = "Enter elements of the Binary Search:";
    binarySearch();
  } else {
    selected_algoright = 0;
    show_chosen_item.innerHTML = "";
  }

  stepTwo();
});

function stepTwo() {
  if (selected_algoright > 0) {
    const step_two = document.querySelector(".step-two");
    step_two.style.display = "block";
    number_of_n.value = null;

    is_step_two = true;
  } else {
    const step_two = document.querySelector(".step-two");
    step_two.style.display = "none";
    number_of_n.value = null;
    is_step_two = false;
  }
  n = 0;
  stepThree();
}

function stepThree() {
  if (selected_algoright > 0 && is_step_two && n > 0) {
    const step_three = document.querySelector(".step-three");
    step_three.style.display = "block";
    //   number_of_n.value = null;
    is_step_three = true;
  } else {
    const step_three = document.querySelector(".step-three");
    step_three.style.display = "none";
    //   number_of_n.value = null;
    is_step_three = false;
  }

  stepFour();
}

function stepFour() {
  if (
    selected_algoright > 0 &&
    is_step_two &&
    is_step_three &&
    n > 0 &&
    is_show_search_button
  ) {
    const step_four = document.querySelector(".step-four");
    step_four.style.display = "block";
    is_step_four = true;
    search_key.value = null;
    key = null;
  } else {
    const step_four = document.querySelector(".step-four");
    step_four.style.display = "none";
    is_step_four = false;
    search_key.value = null;
    key = null;
  }
  showSearchButton();
}

const binary_search_order = document.getElementById("binary_search_order");

binary_search_order.addEventListener("change", function (e) {
  order_of_search = e.target.value;
});

const order = document.querySelector(".asc-or-desc");
function linearSearch() {
  show_chosen_item.innerHTML =
    'You have chosen the <span class="active">Linear Search Algorithm</span>';
  order.style.display = "none";
  order_of_search = 1;
}

function binarySearch() {
  show_chosen_item.innerHTML =
    'You have chosen the <span class="active">Binary Search Algorithm</span>';
  order.style.display = "inline-block";
}

let items = [];
number_of_n.addEventListener("input", function (e) {
  const elements_container = document.getElementById("elements_container");
  elements_container.innerHTML = "";
  if (e.target.value) {
    n = e.target.value;
    for (let i = 0; i < n; i++) {
      const element = `<input onInput="itemChangeHandaler(event)" class="array_item" type="number" id="${i}" placeholder="${
        i + 1
      }">`;
      elements_container.innerHTML += element;
    }
  } else {
    n = 0;
  }
  is_show_search_button = false;
  stepThree();
});

let is_show_search_button = false;
function itemChangeHandaler(e) {
  const elements = document.querySelectorAll(".array_item");
  let count = 0;
  elements.forEach((item) => {
    if (!item.value) {
      count++;
    }
  });
  if (count > 0) {
    is_show_search_button = false;
    showSearchButton();
  } else {
    is_show_search_button = true;
    showSearchButton();
  }
  stepFour();
}

start_search.addEventListener("click", function (e) {
  e.preventDefault();
});

function showSearchButton() {
  if (is_show_search_button && key && n > 0 && selected_algoright > 0) {
    start_search.style.display = "inline-block";
  } else {
    start_search.style.display = "none";
  }
}

// search key
search_key.addEventListener("input", function (e) {
  if (e.target.value) {
    key = e.target.value;
    showSearchButton();
  } else {
    key = null;
    showSearchButton();
  }
});

function getArray() {
  let items = [];
  const elements = document.querySelectorAll(".array_item");
  elements.forEach(function (item) {
    items.push(Number(item.value));
  });
  return items;
}
const show_result = document.getElementById("show_result");
function linear() {
  let location = -1;
  const search_arry = getArray();
  for (let i = 1; i <= n; i++) {
    if (key == search_arry[i - 1]) {
      location = i;
      break;
    }
  }
  if (location > -1) {
    show_result.innerHTML = `<span style="color:#007bff">${key}</span> is found in position ${location}`;
    markPosition(location - 1);
  } else {
    show_result.innerHTML = `<span style="color:red">${key}</span> is not found in list items`;
    markPosition(location - 1);
  }
}

function binary() {
  let location = -1;
  const search_arry = getArray();
  if (order_of_search == 1) {
    if (!isAscending(search_arry)) {
      show_result.style.color = "red";
      show_result.innerHTML =
        "Your list items are not sorted in Ascending order !";
      return;
    }
  } else {
    if (!isDescending(search_arry)) {
      show_result.style.color = "red";
      show_result.innerHTML =
        "Your list items are not sorted in Descending order !";
      return;
    }
  }
  let beg = 0;
  let end = search_arry.length - 1;

  while (beg <= end) {
    let mid = Math.floor((beg + end) / 2);

    let compaire =
      order_of_search == 1 ? search_arry[mid] < key : search_arry[mid] > key;
    if (key == search_arry[mid]) {
      location = mid;
      break;
    } else if (compaire) {
      beg = mid + 1;
    } else {
      end = mid - 1;
    }
  }

  if (location > -1) {
    show_result.innerHTML = `<span style="color:#007bff">${key} </span> is found in position ${
      location + 1
    }`;
    markPosition(location - 1);
  } else {
    show_result.innerHTML = `<span style="color:red">${key} </span> is not found in list items`;
    markPosition(location - 1);
  }
}
start_search.addEventListener("click", function (e) {
  if (selected_algoright == 1) {
    linear();
  }
  if (selected_algoright == 2) {
    binary();
  }
});

// Ascending order checker
function isAscending(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] > arr[i + 1]) {
      return false;
    }
  }
  return true;
}

//Descending order checker
function isDescending(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] < arr[i + 1]) {
      return false;
    }
  }
  return true;
}

// file reader
let file_element = document.getElementById("data_file");
file_element.addEventListener("change", function (e) {
  let file = e.target.files[0];
  let reader = new FileReader();

  reader.onload = function () {
    let array_data = JSON.parse(reader.result).data;
    console.log(array_data);
    const elements_container = document.getElementById("elements_container");
    elements_container.innerHTML = "";
    if (array_data && array_data.length > 0) {
      n = array_data.length;
      number_of_n.value = n;
      for (let i = 0; i < n; i++) {
        const element = `<input value="${
          array_data[i]
        }" onInput="itemChangeHandaler(event)" class="array_item" type="number" id="${i}" placeholder="${
          i + 1
        }">`;
        elements_container.innerHTML += element;
      }
    } else {
      n = 0;
    }
    is_show_search_button = true;

    stepThree();
  };

  reader.readAsText(file);
});

function fileFormat() {
  let array = [];
  for (let i = 1; i <= 500; i++) {
    array.push(i);
  }
  let storageObj = {
    data: array,
  };
  var dataStr =
    "data:text/json;charset=utf-8," +
    encodeURIComponent(JSON.stringify(storageObj));
  var dlAnchorElem = document.getElementById("download_file_format");
  dlAnchorElem.setAttribute("href", dataStr);
  dlAnchorElem.setAttribute("download", "data-format.json");
}

fileFormat();

function markPosition(location) {
  const elements = document.querySelectorAll(".array_item");
  elements.forEach(function (item) {
    item.style.borderBottomColor = "black";
    item.style.color = "black";
  });
  const position_of_the_result = document.getElementById(location);
  position_of_the_result.style.borderBottomColor = "#007bff";
  position_of_the_result.style.color = "#007bff";
}

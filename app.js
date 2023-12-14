//inputs & labels
// the 4 inputs
const catg = document.querySelector("#catg");
const number = document.querySelector("#number");
const price = document.querySelector("#price");
const sellPrice = document.querySelector("#sellPrice");
//div container for price & sell price
// to mainpulate its
const priceWrap = document.querySelector(".priceWrap");
const sellPriceWrap = document.querySelector(".sellPriceWrap");
//buttons
const addToStackButton = document.querySelector("#addToStack");
const calcProfitButton = document.querySelector("#calcProfit");
const showProfitButton = document.querySelector("#showProfit");
const showDataButton = document.querySelector("#showData");
const hideDataButton = document.querySelector("#hideData");
const openSellsButton = document.querySelector("#openSells");
const closeSellsButton = document.querySelector("#closeSells");
const updateStack = document.querySelector("#updateStack");
const emptyStackButton = document.querySelector("h6");
const clearProfit = document.querySelector("#zero");
//divs to mainpulate its
const data = document.querySelector(".data");
const inputsHolder = document.querySelector(".inputsHolder");
const dateHolder = document.querySelector(".dateHolder");
const buttons = document.querySelector(".buttons");
//switch mode with its childern
const switchMode = document.querySelector(".switchMode");
const titleMode = document.querySelector(".titleMode");
const modes = document.querySelector(".modes");
const light = document.querySelector(".light");
const night = document.querySelector(".night");
const modeList = document.querySelectorAll(".modes li");

//store 4 inputs in array
let inputs = [catg, number, price, sellPrice];
//array of objects
let arrOfObj = [];
let oldInputs = getDataFromls("data");

//show date on the page
Datee(dateHolder);

//get data from local storage
getDataFromls("data");

//get "mode" data
getDataFromls("mode");

//default styles
calcProfitButton.style.display = "none";
hideDataButton.style.display = "none";
closeSellsButton.style.display = "none";
updateStack.style.display = "none";

//mainpulate body background and hadel check radio
if (getDataFromls("mode") == "light") {
  document.body.style.background = light.dataset.bg;
  document.body.style.color = light.dataset.color;
  light.firstElementChild.checked = "checked";
} else {
  document.body.style.background = night.dataset.bg;
  document.body.style.color = night.dataset.color;
  night.firstElementChild.checked = "checked";
}
//show and hide light and night
titleMode.onclick = function () {
  modes.classList.toggle("show");
};
//manipulate body color and background & set 'mode' data to local storage
switchMode.addEventListener("click", (e) => {
  //show the modes
  let checked = (e.target.parentElement.firstElementChild.checked = "true");
  if (checked) {
    document.body.style.background = e.target.parentElement.dataset.bg;
    document.body.style.color = e.target.parentElement.dataset.color;
  }
  if (
    e.target.parentElement.lastElementChild.parentElement.dataset.theme ==
      "light" ||
    e.target.parentElement.lastElementChild.parentElement.dataset.theme ==
      "night"
  ) {
    addDataTols(
      "mode",
      e.target.parentElement.lastElementChild.parentElement.dataset.theme
    );
  }
});

//remove the data from local storage
emptyStackButton.addEventListener("click", () => {
  popup();
});

//check if there is data on local storage,if it's exist then assingd it to arrOfobj
if (oldInputs) {
  arrOfObj = JSON.parse(localStorage.getItem("data"));
}

// event to handel the addToStack button which invoke handelInputs() & add Data to local storage function
addToStackButton.addEventListener("click", (e) => {
  // // creat regExp
  // let numberRegExp = /[0-9]/;
  let numberTest = false;
  let priceTest = false;
  let sellPriceTest = false;
  //if it's empty then it won't work
  if (
    catg.value != "" &&
    number.value != "" &&
    price.value != "" &&
    sellPrice.value != ""
  ) {
    // also check if the last three in puts must be numbers
    numberTest = checkIfItNum(number.value);
    priceTest = checkIfItNum(price.value);
    sellPriceTest = checkIfItNum(sellPrice.value);
    if (numberTest && priceTest && sellPriceTest) {
      //before that if show data was clicked then hide data would be in it's place which it must be show data
      if (hideDataButton.style.display === "block") {
        hideDataButton.style.display = "none";
        showDataButton.style.display = "block";
      }
    // if (checkIfItNum(number.value, price.value, sellPrice.value)) {
      handelInputs();
      emptyInputs(inputs);
      data.innerHTML = "";
      data.classList.add("addBorder");
      data.style.bordercolor = "rgb(3, 207, 214)";
      data.style.background = "#333";
      data.style.color = "white";
      data.appendChild(document.createTextNode("Added succefuly"));
    }
    // let index = findFalse(number.value, price.value, sellPrice.value)
    else{ 
    data.innerHTML = "";
    data.style.display = "block";
    data.classList.add("addBorder");
    data.appendChild(document.createTextNode(`Please Enter Numbers Instaed Of : {${findFalse(number.value,price.value,sellPrice.value)}}`));
  }
}
   else {
    data.innerHTML = "";
    data.style.display = "block";
    data.classList.add("addBorder");
    data.appendChild(document.createTextNode("Please fill all fields"));
  }
});

// function that handel inputs
function handelInputs() {
  // case 1 : no data on ls
  if (!oldInputs) {
    const obj = {
      catName: catg.value,
      number: number.value,
      price: price.value,
      sellPrice: sellPrice.value,
      profit: 0,
    };
    arrOfObj.push(obj);
  }
  //case 2 : there is data but they arn't same
  if (oldInputs) {
    let index = oldInputs.findIndex((e) => {
      return e.catName == catg.value;
    });
    if (index !== -1) {
      oldInputs[index].number = +oldInputs[index].number + +number.value;
      oldInputs[index].price = price.value;
      oldInputs[index].sellPrice = sellPrice.value;
      arrOfObj = oldInputs;
    } else {
      const obj = {
        catName: catg.value,
        number: number.value,
        price: price.value,
        sellPrice: sellPrice.value,
        profit: 0,
      };
      arrOfObj.push(obj);
    }
  }
  addDataTols("data", arrOfObj);
}

//function to empty inputs
function emptyInputs(inputs) {
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].value = "";
  }
}

//add data to local storge
function addDataTols(name, arr) {
  window.localStorage.setItem(name, JSON.stringify(arr));
}

//function to get data from ls
function getDataFromls(dataName) {
  let data = localStorage.getItem(dataName);
  if (data) {
    data = JSON.parse(data);
  }
  return data;
}

//function to clac profit
// profit = price - sell price
function calcProfit() {
  // let data = getDataFromls("data");
  let profit;
  profit = (sellPrice.value - price.value) * number.value;
  return profit;
}
//function to calc all profit for the data and show it with message on data's div
function calcAllProfits(message) {
  if (oldInputs) {
    let res = 0;
    for (let i = 0; i < oldInputs.length; i++) {
      res += oldInputs[i].profit;
    }
    data.innerHTML = "";
    data.style.display ="block"
    data.classList.add("addBorder");
    let span = document.createElement("span");
    let theProfit = document.createTextNode(`${message} : ${res} SDG`);
    span.appendChild(theProfit);
    data.appendChild(span);
  } else data.innerHTML = "";
}
showProfitButton.onclick = function () {
  if (hideDataButton.style.display === "block") {
    hideDataButton.style.display = "none";
    showDataButton.style.display = "block";
  }
  calcAllProfits("Your Profit is  ");
};
calcProfitButton.onclick = function () {
  if (hideDataButton.style.display === "block") {
    hideDataButton.style.display = "none";
    showDataButton.style.display = "block";
  }
  calcAllProfits("The profit for today is ");
};

//event to show data
showDataButton.onclick = function () {
  data.innerHTML = "";
  data.style.display = "block";
  data.classList.add("addBorder");
  if (getDataFromls("data")) {
    Datee(data);
    arrOfObj.forEach((obj, i) => {
      let item = document.createElement("div");
      item.className = "item";
      let itemIndex = document.createTextNode(`${i + 1}-`);
      // let itemIndex = i+1;
      let itemName = document.createTextNode(` Name : ${obj.catName} - `);
      let itemNumber = document.createTextNode(`Number ${obj.number} - `);
      let itemPrice = document.createTextNode(`Price : ${obj.price} - `);
      let itemSellPrice = document.createTextNode(
        `Sell Price : ${obj.sellPrice} - `
      );
      let itemProfit = document.createTextNode(`Profit : ${obj.profit}`);
      item.appendChild(itemIndex);
      item.appendChild(itemName);
      item.appendChild(itemNumber);
      item.appendChild(itemPrice);
      item.appendChild(itemSellPrice);
      item.appendChild(itemProfit);
      data.appendChild(item);
      showDataButton.style.display = "none";
      hideDataButton.style.display = "block";
    });
  } else {
    //make it block because when you remove the data with the red button it make it none
    data.style.display = "block";
    showDataButton.style.display = "none";
    hideDataButton.style.display = "block";
    data.appendChild(document.createTextNode("No Data To Show"));
  }
};
//event to hide data
hideDataButton.onclick = function () {
  data.style.display = "none";
  data.classList.remove("addBorder");
  showDataButton.style.display = "block";
  hideDataButton.style.display = "none";
};

//when click on open sells minpulate other buttons
openSellsButton.onclick = function () {
  priceWrap.classList.add("hide");
  sellPriceWrap.classList.add("hide");
  //mainpulate buttons
  buttons.classList.add("toUp");
  //hide buttons
  addToStackButton.style.display = "none";
  openSellsButton.style.display = "none";
  showProfitButton.style.display = "none";
  //show buttons
  closeSellsButton.style.display = "block";
  updateStack.style.display = "block";
  calcProfitButton.style.display = "block";
  //change poistion for one buttons
  updateStack.style.order = "-1";
};
//when click on close sells minpulate other buttons
closeSellsButton.onclick = function () {
  priceWrap.classList.remove("hide");
  sellPriceWrap.classList.remove("hide");
  buttons.classList.remove("toUp");
  //hide buttons
  calcProfitButton.style.display = "none";
  updateStack.style.display = "none";
  closeSellsButton.style.display = "none";
  //show buttons
  showProfitButton.style.display = "block";
  openSellsButton.style.display = "block";
  addToStackButton.style.display = "block";
};
//event for update stack
updateStack.onclick = function () {
  if (catg.value != "" && number.value != "") {
    //Show and hide data's buttons
    if (hideDataButton.style.display === "block") {
      hideDataButton.style.display = "none";
      showDataButton.style.display = "block";
    }
    //if one of items == zero then don't work
    if (zeroItem().catName != catg.value) {
        handelProfits();
        emptyInputs(inputs);
        data.innerHTML = "";
        data.style.display = "block";
        data.style.color = "rgb(3, 207, 214)";
        data.style.background = "#333";
        data.classList.add("addBorder");
        data.appendChild(document.createTextNode("Stack Updated !"));
      
    }
    else {
      data.innerHTML = "";
              data.style.display = "block";
              data.style.color = "rgb(3, 207, 214)";
              data.style.background = "#333";

      data.classList.add("addBorder");
      data.appendChild(document.createTextNode("The number of items you enterd in your stack is 0"))
    }
  } else {
    data.innerHTML = "";
    data.classList.add("addBorder");
    data.appendChild(document.createTextNode("Please fill all fields"));
  }
};

// function for show date with holder argument
function Datee(holder) {
  let now = Date.now();
  let date = new Date(now);
  date = date.toString();
  // the format would be like : 8-3-2023
  // the date output as : Thu Aug 03 2023 14:26
  let day = date.substring(8, 10); //03
  let month = date.substring(4, 7); // aug
  let year = date.substring(11, 15); // 2023
  // let time = date.substring(16, 21); // 14:26
  let span = document.createElement("span");
  span.appendChild(document.createTextNode(`${day}-${month}-${year}`));

  holder.appendChild(span);
}

//function to set profit to zero
function setprofitToZero() {
  if (oldInputs) {
    for (let i = 0; i < oldInputs.length; i++) {
      oldInputs[i].profit = 0;
    }
    arrOfObj = oldInputs;
    addDataTols("data", arrOfObj);
  }
}
clearProfit.onclick = function () {
  setprofitToZero();
};

// function to create pop up with over lay and yes and no
function popup() {
  let overlay = document.createElement("div");
  overlay.className = "overlay";
  document.body.appendChild(overlay);
  //create popup to set yes or not to remove locacl storge
  let popup = document.createElement("div");
  popup.className = "popup";
  let span = document.createElement("span");
  span.className = "popupTitle";
  span.appendChild(document.createTextNode("Are You Sure?"));
  popup.appendChild(span);
  let yes = document.createElement("span");
  yes.className = "yes";
  yes.appendChild(document.createTextNode("Yes"));
  let no = document.createElement("span");
  no.className = "no";
  no.appendChild(document.createTextNode("No"));
  //create holder for yes and no
  let holderYandNo = document.createElement("div");
  holderYandNo.className = "holderYandNo";
  holderYandNo.appendChild(yes);
  holderYandNo.appendChild(no);
  popup.appendChild(holderYandNo);
  document.body.appendChild(popup);
  holderYandNo.addEventListener("click", (e) => {
    if (e.target.classList.contains("yes")) {
      localStorage.removeItem("data");
      arrOfObj = [];
      data.style.display = "none";
      popup.style.display = "none";
      overlay.style.display = "none";
    } else {
      if (e.target.classList.contains("no")) {
        popup.style.display = "none";
        overlay.style.display = "none";
      }
    }
  });
}

//this function for developing in future
function handelProfits() {
  if (oldInputs) {
    let index = oldInputs.findIndex((e) => {
      return e.catName == catg.value;
    });
    if (index !== -1) {
      oldInputs[index].number = +oldInputs[index].number - +number.value;
      oldInputs[index].profit +=
        (+oldInputs[index].sellPrice - +oldInputs[index].price) * +number.value;
      arrOfObj = oldInputs;
    }
  }
  addDataTols("data", arrOfObj);
  // addDataTols("save", arrOfSav);
}
//function to check if it's number
function checkIfItNum(value) {
  let regExp = /^[0-9]+$/;
  if (! regExp.test(value)) {
    result = false;
  }
  else result = true;

  return result;
}
//function to filter and find the false one
function findFalse(val1, val2, val3) {
  let a = [val1, val2, val3];
  let regExp = /^[0-9]+$/;
  let falses = [];
  for (let i = 0; i < a.length; i++) {
    if (!regExp.test(a[i])) {
     falses.push(a[i]);
    }
  }
  return falses
}

//function to handel case : if the user has 0 item in catg and he is try to calc it's profit on sells window .. there sholud be an alert tell him sorry you have 0 in this item
function zeroItem() {
  if (oldInputs) {
    for (let i = 0; i < oldInputs.length; i++){
      if (oldInputs[i].number === 0) {
        res = oldInputs[i];
      }
    }
  }
  return res;
}

//register the service worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register("./serviceWorker.js")
      .then((res) => console.log(`service worker register`))
      .catch((err) => {
        console.log(`service worker is not registered:${err}`);
      });
  });
}

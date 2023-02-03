let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let TOTAL = document.getElementById("TOTAL");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");

let mood = "create";
// get Total

function getTotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;

    TOTAL.innerHTML = result;
    TOTAL.style.background = "#040";
  } else {
    TOTAL.innerHTML = "";
    TOTAL.style.background = "#fff";
  }
}

// create product

let dataPro;

if (localStorage.product != null) {
  dataPro = JSON.parse(localStorage.product);
} else {
  dataPro = [];
}

submit.onclick = function () {
  let newPro = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    TOTAL: TOTAL.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };

  if (mood === "create") {
    if (newPro.count > 1) {
      for (let i = 0; i < newPro.count; i++) {
        dataPro.push(newPro);
      }
    }
  } else {
    dataPro[tmp] = newPro;
    mood = "craete";
    submit.innerHTML = "create";
    count.style.display = "block";
  }

  dataPro.push(newPro);

  // save localStorage

  localStorage.setItem("product", JSON.stringify(dataPro));

  clearData();
  showData();
};

// clear Inputs

function clearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  TOTAL.innerHTML = "";
  count.value = "";
  category.value = "";
}

// read

function showData() {
  getTotal();
  let table = "";
  for (let i = 0; i < dataPro.length; i++) {
    table += `      
      <tr>
        <td>${i}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <th>${dataPro[i].TOTAL}</th>
        <td>${dataPro[i].category}</td>
        <td><button onclick = "updateData( ${i} )" id="update">Update</button></td>
        <td><button  onclick = "deleteData(  ${i}  )" id="delete">Delete</button></td>
      </tr> `;
  }

  document.getElementById("tbody").innerHTML = table;
  let btnDelete = document.getElementById("deleteAll");
  if (dataPro.length > 0) {
    btnDelete.innerHTML = `
  <button onclick = "deleteAll()">delete All (${dataPro.length})</delete>
  `;
  } else {
    btnDelete.innerHTML = "";
  }
}
showData();

// delete

function deleteData(i) {
  dataPro.splice(i, 1);
  localStorage.product = JSON.stringify(dataPro);

  showData();
}

function deleteAll() {
  localStorage.clear();
  dataPro.splice(0);
  showData();
}

// count

// update

function updateData(i) {
  title.value = dataPro[i].title;
  price.value = dataPro[i].price;
  taxes.value = dataPro[i].taxes;
  ads.value = dataPro[i];
  discount.value = dataPro[i].discount;
  getTotal();
  count.style.display = "none";
  category.value = dataPro[i].category;
  submit.innerHTML = "update";

  mood = "update";

  tmp = i;

  scroll({
    top: 0,
    behavior: "smooth",
  });
}

// search

let searchMood = "title";

function getSearchMood(id) {
  let search = document.getElementById("search");
  if (id == "searchTitle") {
    searchMood = "title";
    search.placeholder = "Search By Title";
  } else {
    searchMood = "category";
    search.placeholder = "Search By Category";
  }

  search.focus();
  search.value = "";
  showData();
}

function searchData(value) {
  let table = "";
  if (searchMood == "title") {
    for (let i = 0; i < dataPro.length; i++) {
      console.log(i);

      if (dataPro[i].title.includes(value.toLowerCase())) {
        table += `
        <tr>
           <td>${i}</td>
           <td>${dataPro[i].title}</td>
          <td>${dataPro[i].price}</td>
          <td>${dataPro[i].taxes}</td>
          <td>${dataPro[i].ads}</td>
           <td>${dataPro[i].discount}</td>
           <th>${dataPro[i].TOTAL}</th>
           <td>${dataPro[i].category}</td>
           <td><button onclick = "updateData( ${i} )" id="update">Update</button></td>
           <td><button  onclick = "deleteData(  ${i}  )" id="delete">Delete</button></td>
        </tr> `;
      }
    }
  } else {
    for (let i = 0; i < dataPro.length; i++) {
      if (dataPro[i].category.includes(value.toLowerCase())) {
        table += `
         <tr>
          <td>${i}</td>
           <td>${dataPro[i].title}</td>
           <td>${dataPro[i].price}</td>
          <td>${dataPro[i].taxes}</td>
          <td>${dataPro[i].ads}</td>
           <td>${dataPro[i].discount}</td>
           <th>${dataPro[i].TOTAL}</th>
          <td>${dataPro[i].category}</td>
         <td><button onclick = "updateData(${i})" id="update">Update</button></td>
           <td><button  onclick = "deleteData(${i})" id="delete">Delete</button></td>
         </tr> `;
      }
    }
  }
  document.getElementById("tbody").innerHTML = table;
}

// clean data

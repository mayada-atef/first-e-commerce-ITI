class Product {
    constructor(title,description,price,quantity,img,category,sale=0,rating=0,feature=0) {
        this.id = Date.now();
        this.title = title;
        this.description = description;
        this.price = price;
        this.quantity = quantity;
        this.img = img;
        this.category = category;
        this.sale=sale
        this.rating = rating;
        this.feature = feature;
    }
    getProduct() {
        return this
    }
}
var base64;
// var categories = ["Mobile-Phone", "Laptop", "Tablet", "Sart-watch"]
var addProductForm = document.getElementById("addProductForm");
var productsTable = document.getElementById("productsTable");
var tableBody = document.getElementsByTagName("tbody")[0];
var editProductForm = document.getElementById("editProductForm");
var productTable = document.getElementById("productTable");

//make productObject from form input
function makeProductObject(form) {
    var feature;
    (form.elements["feature"].checked) ? feature = 1 : feature = 0;
    console.log(form.elements["feature"].checked);
    var product = new Product(form.elements["title"].value,
        form.elements["description"].value,
        form.elements["price"].value,
        form.elements["quantity"].value,
        base64,
        form.elements["category"].value,
        form.elements["sale"].value,0,feature);

    return product;
}
// display ul products in sidebar 
// function displaySidebarProductDiv() {
//     sidebarProductUl.classList.toggle("d-none");      
// }
// function displaySidebarDiv(id) {
//     let element=document.getElementById(id)
//     element.classList.toggle("d-none");      
// }

// display category in select based on product category added
function displayCategory(key) {
    let categories = readDataFromLocalstorage("categories");
    categories.forEach(element => {
        if (key == element.categoryName) {
            return;}
    createHtmlElment(category,"option","",element.categoryName)});
}
// create html with text and classes 
function createHtmlElment(parent, child, classes, text) {
    var element = document.createElement(child);
    parent.append(element);
    if (classes) element.className=classes;
    if (text) element.innerText = text;
    return element;
}
// read from localstoarge
const readDataFromLocalstorage = (storageKey) => {
    try {
       var data = JSON.parse(localStorage.getItem(storageKey))||[];  
    }
    catch (e) { throw "error in read from local storage" }
    return data;
}
// function write in local storage
const writeDateInLocalstorage = (storageKey,data) => {
    localStorage.setItem(storageKey, JSON.stringify(data));
}


//  upload product photo and display it  
function loadImage(event) {
    const selectedFile = event.target.files[0];
    const reader = new FileReader();
    const img = document.querySelector(".inputDiv img");
    img.title = selectedFile.name; 
    reader.onload = (event) => {
        img.src = event.target.result;
        img.classList.remove("d-none");
        base64 = event.target.result;
    };
    reader.readAsDataURL(selectedFile);
}

/****************** add product *************************/

if (addProductForm) {
    displayCategory(""); 
    addProductForm.addEventListener("submit", addProduct);
}
function addProduct(e) { 
    e.preventDefault();
    let product=makeProductObject(addProductForm);
    var products = readDataFromLocalstorage("products");
    products.push(product);
    writeDateInLocalstorage("products", products);
    let img = document.querySelector(".inputDiv img");
    img.classList.add("d-none");
    addProductForm.reset();
}

/*********************************************************/
/******************   all products ***********************/
/*********************************************************/
if (productsTable) {
    showAllProducts();   
}
function showAllProducts() {
    tableBody.innerHTML = "";
    var index=0 
    let products = readDataFromLocalstorage("products");
    products.forEach((product ,index) => {
        var tr = createHtmlElment(tableBody, "tr", "", "");
        createHtmlElment(tr,"td","",index+1)
        createHtmlElment(tr, "td", "", product["id"])
        createHtmlElment(tr, "td", "", product["title"])
        createHtmlElment(tr, "td", "", product["category"])
        createHtmlElment(tr, "td", "", product["price"])
        createHtmlElment(tr, "td", "", product["quantity"])    
        let operationTd = createHtmlElment(tr, "td", "", "")
        let deleteButton=createHtmlElment(operationTd, "button", "btn btnRed", "Delete")
        let editButton=createHtmlElment(operationTd, "button", "btn btnYellow", "Edit")
        let showButton=createHtmlElment(operationTd, "button", "btn btnBlue", "Show")
        deleteButton.addEventListener("click", ()=>{deleteProduct(index,products)})
        editButton.addEventListener("click", () => { editEevent(index) })
        showButton.addEventListener("click", () => { showEvent(index) })
       
    })
}
/*********************************************************/
/******************   delete product ***********************/
/*********************************************************/
const deleteProduct = (index, products) => {
    products.splice(index, 1);
    writeDateInLocalstorage("products", products);
    showAllProducts(); 
}
/*********************************************************/
/******************   edit product ***********************/
/*********************************************************/
if (editProductForm) {
    displayProductValues();
    editProductForm.addEventListener("submit", editProduct);
}
function displayProductValues() {
    let index =JSON.parse(localStorage.getItem("editProductIndex"));
    let product = readDataFromLocalstorage("products")[index];
    for (const key in product) {
        if (key == "category") {
            createHtmlElment(category, "option", "", product[key]);
            displayCategory(product[key]);
        }
        if (key == "img") {
            document.getElementById("imgWillEdit").src=product[key];
            continue;
        }
        editProductForm.elements[key].value = product[key];     
    }
}
function editEevent(index) {
    writeDateInLocalstorage("editProductIndex",index);
    location.href = "../products/editproduct.html";
}
function editProduct(e) {
    e.preventDefault();
    let index =JSON.parse(localStorage.getItem("editProductIndex"));
    let products = readDataFromLocalstorage("products");
    let product = products[index];
    base64 = base64 || product["img"];
    product=makeProductObject(editProductForm);
    products[index] = product;
    writeDateInLocalstorage("products", products);
    editProductForm.reset();
    location.href = "../products/allproduct.html";
}
/*********************************************************/
/******************   show single product ***********************/
/*********************************************************/
function showEvent(index) {
      writeDateInLocalstorage("showedProductIndex",index);
    location.href = "../products/showproduct.html";
    
}
if (productTable) {
     let index =JSON.parse(localStorage.getItem("showedProductIndex"));
    let product = readDataFromLocalstorage("products")[index];
    console.log(product);
    for (const key in product) {
      
        let tr = createHtmlElment(productTable, "tr", "", "");
        let td1 = createHtmlElment(tr, "td", "", key);
        tr.append(td1);
        if (key == "img") {
            let tdImage = createHtmlElment(tr, "td", "", "");
            let img = createHtmlElment(tdImage, "img", "singleProductImage", "");
            img.src = product[key];
            continue;  
        }
        let td2 = createHtmlElment(tr, "td", "", product[key]);
        tr.append(td2);

    }
    
}


// =============================

function displayProductValues() {
    let index =JSON.parse(localStorage.getItem("editProductIndex"));
    let product = readDataFromLocalstorage("products")[index];
    for (const key in product) {
        console.log(key ,product[key]);
        if (key == "category") {
            createHtmlElment(category, "option", "", product[key]);
            displayCategory(product[key]);
            continue;
        }
        else if (key == "img") {
            document.getElementById("imgWillEdit").src=product[key];
            continue;
        }
        else if (key == "feature") { 
            if (product["feature"] == 1 ) {
                let feature = document.getElementById("feature");
                feature.checked = true;
            }
        }
        else if (key == "rating") { continue; }
        else {
        //  console.log(key,product[key],"else");
           editProductForm.elements[key].value = product[key]; 
        }
             
    }
}









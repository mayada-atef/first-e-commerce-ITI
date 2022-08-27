class Product {
    constructor(title,description,price,quantity,img,category,rating) {
        this.id = Date.now();
        this.title = title;
        this.description = description;
        this.price = price;
        this.quantity = quantity;
        this.img = img;
        this.category = category;
        this.rating = rating;
    }
    getProduct() {
        return this
    }
}
var base64;
var categories = ["electronics", "clothes", "jelewery", "drinks"]
var addProductForm = document.getElementById("addProductForm");
var productsTable = document.getElementById("productsTable");
var tableBody = document.getElementsByTagName("tbody")[0];
var editProductForm = document.getElementById("editProductForm");

//make productObject from form input
function makeProductObject(form) {
    var product = new Product(form.elements["title"].value,
        form.elements["description"].value,
        form.elements["price"].value,
        form.elements["quantity"].value,
        base64,
        form.elements["category"].value,
        form.elements["rating"].value);
    return product;
}
// display ul products in sidebar 
function displaySidebarProductDiv() {
    sidebarProductUl.classList.toggle("d-none");      
}
// display category in select based on product category added
function displayCategory(key) {
    categories.forEach(element => {
        if (key == element) {
            return;}
    createHtmlElment(category,"option","",element)});
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
    Location.href = "../products/allproduct.html";
}







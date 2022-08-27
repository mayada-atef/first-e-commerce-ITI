class Product {
    constructor(title,description,price,quantity,imgSrc,category,rating) {
        this.id = Date.now();
        this.title = title;
        this.description = description;
        this.price = price;
        this.quantity = quantity;
        this.imgSrc = imgSrc;
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
var tableBody=document.getElementsByTagName("tbody")[0]


// display ul products in sidebar 
function displaySidebarProductDiv() {
    sidebarProductUl.classList.toggle("d-none");      
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

/****************** add product *************************/

if (addProductForm) {
    // display category in select
    categories.forEach(element => {
    createHtmlElment(category,"option","",element)});
    
    addProductForm.addEventListener("submit", addProduct);
}
function addProduct() { 
    var product =new Product(addProductForm.elements["title"].value, addProductForm.elements["description"],
            addProductForm.elements["price"].value, addProductForm.elements["quantity"].value,base64,
            addProductForm.elements["category"].value,addProductForm.elements["rating"].value );
    var products = readDataFromLocalstorage("products");
    products.push(product);
    writeDateInLocalstorage("products",products);
}
//  upload product photo and display it in add product page 
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
        editButton.addEventListener("click", () => { editProduct(product) })
        showButton.addEventListener("click", () => { showProduct(product) })
       
    })
}
const deleteProduct = (index, products) => {
    products.splice(index, 1);
    writeDateInLocalstorage("products", products);
    showAllProducts(); 
}

/*********************************************************/
/******************   edit product ***********************/
/*********************************************************/
editProductForm = document.getElementById("editProductForm")

if (editProductForm) {

    var products = readDataFromLocalstorage("products");
    console.log(products[11]["imgSrc"]);   
    imgWillEdit.src = products[11]["imgSrc"];
}




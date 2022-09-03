class Category{
    // CategoryParentId
    constructor(categoryName,description,updatedAt="") {
        this.id = Date.now();
        this.createdAt = Date();
        this.categoryName = categoryName;
        this.updatedAt =updatedAt;
        this.description = description;
    }
}

var addCategoryForm = document.getElementById("addCategoryForm");
var categoriesTable = document.getElementById("categoriesTable");
var tableBody = document.getElementsByTagName("tbody")[0];
var editCategoryForm = document.getElementById("editCategoryForm");
var categoryTable = document.getElementById("categoryTable");
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
/*********************************************************/
/**********************add category***********************/
/*********************************************************/
if (addCategoryForm) {
    addCategoryForm.addEventListener("submit", addCategory);
    console.log(addCategoryForm.elements["category"].value);
}
function addCategory(e) {
    e.preventDefault();
    let category = new Category(addCategoryForm.elements["category"].value, addCategoryForm.elements["description"].value);
    let categories = readDataFromLocalstorage("categories");
    categories.push(category);
    writeDateInLocalstorage("categories", categories);
    addCategoryForm.reset()
}
// display categories

if (categoriesTable) {
   
    showAllCategories(); 
 
}
function showAllCategories() {
    tableBody.innerHTML = "";
    let categories = readDataFromLocalstorage("categories");
    // var index = 0;
    categories.forEach((category,index) => {
        console.log(category);
        let tr = createHtmlElment(tableBody, "tr", "", "");
        console.log(tr);
        createHtmlElment(tr,"td","",index+1)
        createHtmlElment(tr, "td", "",category["id"])
        createHtmlElment(tr, "td", "", category["categoryName"])
        createHtmlElment(tr, "td", "",category["createdAt"])   
        let operationTd = createHtmlElment(tr, "td", "", "")
        let deleteButton=createHtmlElment(operationTd, "button", "btn btnRed", "Delete")
        let editButton=createHtmlElment(operationTd, "button", "btn btnYellow", "Edit")
        let showButton=createHtmlElment(operationTd, "button", "btn btnBlue", "Show")
        deleteButton.addEventListener("click", ()=>{deleteProduct(index,categories)})
        editButton.addEventListener("click", () => { editEevent(index) })
        showButton.addEventListener("click", () => { showEvent(index) })
    });
}
// delete 
function deleteProduct(i, categories) {
    categories.splice(i, 1);
    writeDateInLocalstorage("categories", categories);
    showAllCategories();
}
// edit 
function editEevent(index) {
    writeDateInLocalstorage("editCategoryIndex",index);
    location.href = "../category/editcategory.html";
}
if (editCategoryForm) {
    let editedIndex = JSON.parse(localStorage.getItem("editCategoryIndex"));
    let category = readDataFromLocalstorage("categories")[editedIndex];
    editCategoryForm.elements["id"].value = category.id;
    editCategoryForm.elements["category"].value = category.categoryName;
    editCategoryForm.elements["description"].value = category.description;
    editCategoryForm.addEventListener("submit",editCategory)

    
}
function editCategory(e) {
    e.preventDefault();
    let editedIndex = JSON.parse(localStorage.getItem("editCategoryIndex"));
    let categories = readDataFromLocalstorage("categories");
    let  category = new Category(editCategoryForm.elements["category"].value,
        editCategoryForm.elements["description"].value, Date());
    console.log(category);
    categories[editedIndex] = category;
    writeDateInLocalstorage("categories", categories);
    editCategoryForm.reset();
    location.href = "../category/allcategory.html";
   
}
// show category details
function showEvent(index) {
      writeDateInLocalstorage("showedCategoryIndex",index);
    location.href = "../category/showcategory.html";
    
}
if (categoryTable) {
     let showIndex =JSON.parse(localStorage.getItem("showedCategoryIndex"));
    let category = readDataFromLocalstorage("categories")[showIndex];
    for (const key in category) {
        let tr = createHtmlElment(categoryTable, "tr", "", "");
        let td1 = createHtmlElment(tr, "td", "", key);
        tr.append(td1);
        let td2 = createHtmlElment(tr, "td", "", category[key]);
        tr.append(td2);

    }
    
}


// =======================

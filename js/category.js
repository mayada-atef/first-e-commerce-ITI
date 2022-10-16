
function fetch_data_from_storage(storage_get_item) {
    var arr_data=localStorage.getItem(storage_get_item)
    var parse_data=JSON.parse(arr_data)
    return parse_data
}
let filteredCategory = fetch_data_from_storage("filteredCategory") || "";
let productsData = fetch_data_from_storage("products");
function filterProduct(categoryName) {
    filteredCategory = fetch_data_from_storage("filteredCategory") || "";
    console.log("in filter");
    console.log(filteredCategory);
    var filterdProduct = productsData.filter(product => product.category == categoryName)
    console.log(filterdProduct);
    loop_on_products(filterdProduct, 'categoryProducts')
        
}
filterProduct(filteredCategory);

function creat_product_elements(productData,parentDiv){
    var productContainer = document.getElementById(parentDiv)
    let cardContainer = createHtmlElment(productContainer, "div", ["col-md-6", "col-lg-3", "mb-2"]);
    let card=createHtmlElment(cardContainer, "div", ["card"]);
    let singleProductLink= createHtmlElment(card, 'a',[])
    singleProductLink.setAttribute('href','../pages/singleproduct.html?id='+productData.id)
    createHtmlElment(singleProductLink, 'img',["card-img-top"]).setAttribute('src',productData.img)
    let cardBody = createHtmlElment(cardContainer, "div", ["card-body"]);
    let productTitle = createHtmlElment(cardBody, "h5", ["card-title"]);
    productTitle.innerText = productData.title
    let starsRate = createHtmlElment(cardBody, "div", ["stars", "my-2"]);
    let rateing = productData.rating;
    for (let index = 0; index < 5; index++) {  
        if (rateing > 0) {
            createHtmlElment(starsRate, "i", ["bi", "bi-star-fill","me-1"]);
            rateing =rateing - 1;
        }
        else{createHtmlElment(starsRate, "i", ["bi", "bi-star"]);}
    }
    let cardFooter=createHtmlElment(cardBody, "div", ["d-flex" ,"justify-content-start" ,"align-items-center"]);
    if (productData.sale > 0) {  
        createHtmlElment(cardFooter, 'h6',["text-decoration-line-through"]).innerText=productData.price+"$"
        createHtmlElment(cardFooter, 'h6',[]).innerText=productData.sale+"$"
     }else{
        createHtmlElment(cardFooter, 'h6', ['me-4']).innerText="$"+productData.price
    }
    cardBody.innerHTML+=`<a href="#" onclick='add_to_cart(${productData.id})'  class="btn btn-primary w-100 my-1"> Add To Cart </a>`
    console.log("product");
 }
function loop_on_products(objData,parentDiv){ 
   return objData.forEach(product=>{creat_product_elements(product,parentDiv)})
}


const categoriesData = fetch_data_from_storage('categories') || []

function createHtmlElment(parent, child,classes=[]) {
    var element = document.createElement(child);
    parent.append(element);
    classes.forEach(elementClass => {
        if (elementClass) element.classList.add(elementClass); 
    });
  
    return element;
}
function creatCategorieElement(category) {
    let categoriesUl = document.getElementById("categoryUl");
    let categoryLi = createHtmlElment(categoriesUl, "li", ["nav-item"]);
    categoryLi.innerHTML=`<span class="nav-link" href="3" onclick=changeCategory("${category.categoryName}")>${category.categoryName}</span>`     
}
// ======================================================================================
// ==============    show categorie Data                    ==================================
// ======================================================================================

function showCategorieData(categoriesData) {
    console.log(categoriesData);
    categoriesData.forEach(category=>creatCategorieElement(category) )                         
}
showCategorieData(categoriesData)

function changeCategory(categoryName) {
    store_data_in_storage("filteredCategory", categoryName);
    filterProduct(categoryName)

    
}
function store_data_in_storage(name,arr_data){ localStorage.setItem(name,JSON.stringify(arr_data)) }

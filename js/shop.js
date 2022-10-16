


// ======================================================================================
// ================== store Data in storage   ===========================================
// ======================================================================================

function store_data_in_storage(name,arr_data){ localStorage.setItem(name,JSON.stringify(arr_data)) }


// ======================================================================================
// ================== Get data from storage   ===========================================
// ======================================================================================

function fetch_data_from_storage(storage_get_item){
    var arr_data=localStorage.getItem(storage_get_item)
    var parse_data=JSON.parse(arr_data)
    return parse_data
}
// ==================== Const varaibls ===========================================

const products_data=fetch_data_from_storage('products')||[]
const categoriesData=fetch_data_from_storage('categories')||[]
const products_container =document.getElementById('products_container')

// ======================================================================================
// ==============    creat Html elements         ==================================
// ======================================================================================

function createHtmlElment(parent, child,classes=[]) {
    var element = document.createElement(child);
    parent.append(element);
    classes.forEach(elementClass => {
        if (elementClass) element.classList.add(elementClass); 
    });
  
    return element;
}
// =============================================================================
//  Creat product elements
// =============================================================================

function creat_product_elements(productData,parentDiv){
    var productContainer =document.getElementById(parentDiv)
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
    
 }
// ======================================================================================
// ================== show Data to user page  ===========================================
// ======================================================================================
function loop_on_products(objData,parentDiv){ 
   return objData.forEach(product=>{creat_product_elements(product,parentDiv)})
}
function show_products() {
            products_container.innerHTML=''
            loop_on_products(products_data,'products_container')

}
show_products()


// ======================================================================================
// ==============   creat categorie name list elements    ==================================
// ======================================================================================
function creatCategorieElement(category) {
    let categoriesUl = document.getElementById("categoryUl");
    let categoryLi = createHtmlElment(categoriesUl, "li", ["nav-item"]);
    categoryLi.innerHTML=`<span class="nav-link" href="" onclick=filter_product("${category.categoryName}")>${category.categoryName}</span>`     
}
// ======================================================================================
// ==============    show categorie Data                    ==================================
// ======================================================================================
function showCategorieData(categoriesData) {
    console.log(categoriesData);
    categoriesData.forEach(category=>creatCategorieElement(category) )                         
}
showCategorieData(categoriesData)
// ======================================================================================
// ==============   filter products by categorie Name                     ==================================
// ======================================================================================
function filter_product(categoryName) { 
    store_data_in_storage("filteredCategory", categoryName);
    location.href = "categoryproducts.html";
        
}


// ======================================================================================
//                  Add to cart            
// ======================================================================================
// function add_to_cart(product_id){
//     if(getCookie('userToken')||getAdminTokenCookie())
//         {
//         var qty=1;
//         var productCart;
//         var stored_cart_data=fetch_data_from_storage('carts')
//         // if(stored_cart_data){
//             stored_cart_data.forEach(cartProduct => {
//                 if(cartProduct.pro_id!=2){

//                     products_data.forEach(product => {

//                         if (product.id == product_id) {
//                                 productCart={
//                                             quntity:qty,
//                                             pro_id:product.id,
//                                             pro_name:product.title,
//                                             pro_img:product.img,
//                                             pro_price:product.price
//                                 }} });
//                         stored_cart_data.push(productCart)
//                         store_data_in_storage('carts',stored_cart_data)  
               
//           }  
//         })
//         // }
//     } else{
//         location.href = './login.html'
//     }        
// }

// ======================================================================================
// ==============       get cookie                 ==================================
// ======================================================================================
// function getCookie(name) {
//     var nameEQ = name + "=";

//     var ca = document.cookie.split(';');

//     for(var i=0;i < ca.length;i++) {

//         var c = ca[i];

//         while (c.charAt(0)==' ') c = c.substring(1,c.length);

//         if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        
//     }
//     return null;
// }


// ========================= search Page =====================
function searchPage(){

    let searchinput = document.getElementById("search");
    var inputString=searchinput.value;
    console.log(inputString);
    window.localStorage.setItem('search',JSON.stringify(inputString))
    window.location.href='searchproducts.html'
}

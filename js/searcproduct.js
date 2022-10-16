var result;
function searchInProducts() {

  let inputString = (JSON.parse(localStorage.getItem('search')));
  if (inputString == '') { result = [] }
  else {
    let searchedproducts = fetch_data_from_storage("products");  
   result= searchedproducts.filter((product) => { 
        return  product.title.startsWith(inputString.toUpperCase())
  });}
 
  
}
searchInProducts()
console.log(result);
// ==================================
function fetch_data_from_storage(storage_get_item){
  var arr_data=localStorage.getItem(storage_get_item)

  var parse_data=JSON.parse(arr_data)

  return parse_data
}



// ======================================================================================
// ================== show Data to user page  ===========================================
// ======================================================================================
function loop_on_products(objData,parentDiv){ 
   return objData.forEach(product=>{creat_product_elements(product,parentDiv)})
}
function show_products(searchContainer) {
           document.getElementById(searchContainer).innerHTML='';
           loop_on_products(result, 'searchResult');

}
function createHtmlElment(parent, child,classes=[]) {
    var element = document.createElement(child);
    parent.append(element);
    classes.forEach(elementClass => {
        if (elementClass) element.classList.add(elementClass); 
    });
  
    return element;
}
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
if (result.length == 0) {
  // console.log("no products found");
   var searchContainer = document.getElementById("searchResult");
  createHtmlElment(searchContainer, "div", ["text-danger", "text-center"]).innerText = "no products found";
}
else {show_products('searchResult')}




function searchPage(){
      let searchinput = document.getElementById("search");
      var inputString=searchinput.value;
      window.localStorage.setItem('search',JSON.stringify(inputString))
      window.location.href = 'searchproducts.html'

}
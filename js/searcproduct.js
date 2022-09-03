var result;
function searchInProducts() {

  let inputString = (JSON.parse(localStorage.getItem('search')));

  let searchedproducts = fetch_data_from_storage("products");
  

  // console.log(inputString);
  // console.log(searchedproducts);

  
   result= searchedproducts.filter((product) => { 
        return  product.title.startsWith(inputString.toLowerCase())
  });
  
}
searchInProducts()
console.log(result);
// ==================================
function fetch_data_from_storage(storage_get_item){
  var arr_data=localStorage.getItem(storage_get_item)

  var parse_data=JSON.parse(arr_data)

  return parse_data
}

// =================================================
function creat_product_elements(ele,ele_id){

  // creat div Elements for product 
  var div_products_container=document.getElementById(ele_id)
  // div_products_container.style.display='none'

  var siglepage=document.createElement('a')

  siglepage.setAttribute('href','../pages/singleproduct.html?id='+ele.id)

  var  div_fastfood=document.createElement('div')
  div_fastfood.setAttribute("id","fastfood");
  div_fastfood.setAttribute("class","fastfood");

  var  div_all_products=document.createElement('div')
  div_all_products.setAttribute("id","all_products");
  div_all_products.setAttribute("class","all_products");

  var div_product=document.createElement('div')
  div_product.setAttribute("id","product");

  var div_product_name=document.createElement('div')
  div_product_name.setAttribute("id","product_name");

  // creat element img & ul & li 
  var ele_img=document.createElement('img')
  // ele_img.style.display='none'
  var ele_ul_pro=document.createElement('ul')
  // ele_ul_pro.style.display='none'
  var ele_li_pro=document.createElement('li')

  // creat element h6 for product name & h5 for price name 
  var ele_h_six_pro_name=document.createElement('h6')
  var ele_a_pro_name=document.createElement('a')
  var ele_h_five_pro_price=document.createElement('h5')

  // ------------------------------------------------------
  var del_price=document.createElement('del')
  var ele_h_five_pro_sale=document.createElement('h5')


  // append elements
  div_products_container.append(div_fastfood)//append first child div

  div_fastfood.append(div_all_products)// append second child div

  div_all_products.append(div_product ,div_product_name)// append third & fourth child div

  div_product.append(siglepage,ele_ul_pro)// append element img & ul in child div product

  div_product_name.append(ele_h_six_pro_name ,del_price,ele_h_five_pro_price ,ele_h_five_pro_sale)

  ele_ul_pro.append(ele_li_pro)

  ele_h_six_pro_name.append(ele_a_pro_name)

  ele_h_six_pro_name.append(ele_a_pro_name)

  siglepage.append(ele_img)
  
   ele_li_pro.innerHTML=`<i onclick='add_to_cart(${ele.id})' class="fa fa-shopping-cart shoppingCart "></i>`

  ele_a_pro_name.innerText=ele.title

  if(ele.sale>0){
      del_price.append(ele_h_five_pro_price)
      ele_h_five_pro_price.innerText='$ '+ele.price
      ele_h_five_pro_sale.innerText='$ '+ele.sale

  }else{
      ele_h_five_pro_price.innerText='$ '+ele.price
  }
  
  ele_h_five_pro_price.innerText='$ '+ele.price
  ele_img.setAttribute("src",ele.img);

}

// ======================================================================================
// ================== show Data to user page  ===========================================
// ======================================================================================
function show_products_data(id){

     var div_products_container =document.getElementById(id)   
      div_products_container.innerHTML=''
 
    
   
 
  result.forEach(elett=>{
          creat_product_elements(elett,id)
            
      })
     

}//end function
if (result.length == 0) {
  // console.log("no products found");
   var products_container = document.getElementById("products_container");
    createHtmlElment(products_container,"div","", "no products found")
  //  console.log(products_container);  
}
else {show_products_data('products_container')}


function createHtmlElment(parent, child, classes, text) {
    var element = document.createElement(child);
    parent.append(element);
    if (classes) element.className=classes;
    if (text) element.innerText = text;
    return element;
}

function searchPage(){


  let searchinput = document.getElementById("search");
var inputString=searchinput.value;
console.log(inputString);

window.localStorage.setItem('search',JSON.stringify(inputString))
 
  window.location.href = 'searchproducts.html'

}
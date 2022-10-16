

var index=-1;
var total_price_td;
// ====================================================================================
    //  Creat Elements 
// ====================================================================================
function createHtmlElment(parent, child_element, classes) {
  var element = document.createElement(child_element);
  parent.append(element);
  if (classes) element.className=classes;
  return element;
}
// ====================================================================================
    //  Creat Cart Element 
// ====================================================================================
function cartElements(product){
  index++

  var tabl_tbody=document.getElementById('t_body')
  var tableTr=createHtmlElment(tabl_tbody,'tr', '')
  var img_name_td =createHtmlElment(tableTr,'td', '')
  var img_ele=createHtmlElment(img_name_td,'img', 'cart-img')
  img_ele.setAttribute('src',product.pro_img)
  createHtmlElment(img_name_td,'h5', '')
  createHtmlElment(tabl_tbody,'td', '')
  createHtmlElment(tableTr,'td', '').innerHTML=product.pro_name
  createHtmlElment(tableTr,'td', '').innerHTML='$'+product.pro_price
  createHtmlElment(tabl_tbody,'div', 'quantity')
  var qty_td=createHtmlElment(tableTr,'td', '')
  createHtmlElment(qty_td,'div', 'product-qty').innerHTML=`<div class="product-qty">
                         <span onclick="decrement_qty(${index},${product.pro_id})" style="cursor:pointer">-</span>
                          <input class="qtyinput" name='${index}' disabled type="number" value="${product.quntity}">
                          <span onclick="inrement_qty(${index},${product.pro_id})" style="cursor:pointer">+</span>`
                                
 createHtmlElment(tableTr,'td', 'productTotalPrice').innerHTML='$'+product.pro_price*product.quntity
  createHtmlElment(tableTr,'td', 'del-product') .innerHTML=`<span class="delelement"  onclick='del_element_from_cart(${index})'>X</span>`
}

// ====================================================================================
//    fetch Data from storage     
// ====================================================================================

function fetch_data_from_storage(storageItem){
      try{
        var arr_data=localStorage.getItem(storageItem)||[]

        var parse_data=JSON.parse(arr_data)

      }catch(e){
        throw "Data Not Found !" 
      }
      
      return parse_data
}

// ====================================================================================
//      fetch Data from storage     
// ====================================================================================
function store_data_in_storage(name,arr_data){

  localStorage.setItem(name,JSON.stringify(arr_data))

}
// ====================================================================================
// ========    show data of cart     ============================
// ====================================================================================
function show_cart_data(){
  try{
    var cart_data= fetch_data_from_storage('carts')||[]
    // if(cart_data)
        cart_data.forEach(product=>cartElements(product))
  }catch(e){
     throw (e+'No Data in cart !');
  }
  


}
show_cart_data()

// ====================================================================================
// ======== increment qty of element in cart      ============================
// ====================================================================================
var computerScore;
var productTotalPrice ;
var qty;
function inrement_qty(index,ele_id){

          computerScore = document.getElementsByClassName('qtyinput')[index];
          productTotalPrice = document.getElementsByClassName('productTotalPrice')[index];


              qty= computerScore.value++

          var cart =fetch_data_from_storage('carts')

           var nData;
            for(var i=0;i<=cart.length;i++){
                    if(ele_id==cart[i].pro_id){
                      nData={
                        pro_id:cart[i].pro_id,
                        pro_img:cart[i].pro_img,
                        pro_name:cart[i].pro_name,
                        pro_price:cart[i].pro_price,
                        quntity:qty+1
                      }
                      cart.splice(index,1)
                      cart.push(nData)
                      productTotalPrice.innerHTML=`$ ${(qty+1)*cart[i].pro_price}`
                      
                       break;
                      
                    }
            }
            store_data_in_storage('carts',cart)
            sum_total()


}
// ====================================================================================
// ======== decrement qty of element in cart      ============================
// ====================================================================================

function decrement_qty(index,ele_id){

  computerScore = document.getElementsByClassName('qtyinput')[index];
  productTotalPrice = document.getElementsByClassName('productTotalPrice')[index];
  if(computerScore.value!=1){

              qty= computerScore.value--

          var cart =fetch_data_from_storage('carts')

           var nData;
            for(var i=0;i<=cart.length;i++){
                    if(ele_id==cart[i].pro_id){
                      nData={
                        pro_id:cart[i].pro_id,
                        pro_img:cart[i].pro_img,
                        pro_name:cart[i].pro_name,
                        pro_price:cart[i].pro_price,
                        quntity:qty-1
                      }
                      cart.splice(index,1)
                      cart.push(nData)
                      productTotalPrice.innerHTML=`$ ${(qty-1)*cart[i].pro_price}`
                      sum_total()
                       break;
                      
                    }
            }
          }
          store_data_in_storage('carts',cart)
          sum_total()
}

// ====================================================================================
// ======== decrement qty of element in cart      ============================
// ====================================================================================
function del_element_from_cart(index){

    var cart =fetch_data_from_storage('carts')
   
    cart.splice(index,1)
    
    localStorage.setItem('carts',JSON.stringify(cart))

    window.location.reload()
}
// ====================================================================================
// ========   sum total  cart     ============================
// ====================================================================================


function sum_total(){
  
  var sum_cart=document.getElementById('totalCart')
  
var cart=fetch_data_from_storage('carts')||[]
var sum=0;

cart.forEach(ele=>sum+=ele.pro_price*ele.quntity)

sum_cart.innerText='$ '+sum

}
sum_total()
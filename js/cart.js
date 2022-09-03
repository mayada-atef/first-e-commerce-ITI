var index=-1;
var total_price_td;
function creat_cart_elem(ele){
              index++
            var tabl_tbody=document.getElementById('t_body')//get parent table ele

            var tabl_tr=document.createElement('tr')//creat evert row of table

            var img_name_td=document.createElement('td')
            var img_ele=document.createElement('img')
            img_ele.style.width='100px'

            var h_five_ele=document.createElement('h5')
            var name_td=document.createElement('td')

            var price_td=document.createElement('td')
            var qty_td=document.createElement('td')
            var qty_div=document.createElement('div')
                qty_div.setAttribute('class','quantity')

             total_price_td=document.createElement('td')
            total_price_td.setAttribute('class','productTotalPrice')
            var close_td=document.createElement('td')
            /// append data to parent element
            img_name_td.append(img_ele,h_five_ele)
            tabl_tbody.append(tabl_tr)
            tabl_tr.append(img_name_td,name_td,price_td,qty_td,total_price_td,close_td)

            // put data to every element
            img_ele.setAttribute('src',ele.pro_img)
            name_td.innerHTML=ele.pro_name
            price_td.innerHTML='$'+ele.pro_price
            qty_td.innerHTML=`<div class="product-qty">
                                      <span onclick="decrement_qty(${index},${ele.pro_id})" style="cursor:pointer">-</span>
                                    <input class="qtyinput" name='${index}' disabled type="number" value="${ele.quntity}">
                                    <span onclick="inrement_qty(${index},${ele.pro_id})" style="cursor:pointer">+</span>
                                  </div>`

                                
            total_price_td.innerHTML='$'+ele.pro_price*ele.quntity
              close_td.innerHTML=`<span class="delelement"  onclick='del_element_from_cart(${index})'>X</span>`
              close_td.style.cursor='pointer'

              // console.log(index);
 
}
// ====================================================================================
// ========    fetch Data from storage      ============================
// ====================================================================================

function fetch_data_from_storage(storage_get_item){
      try{
        var arr_data=localStorage.getItem(storage_get_item)||[]

        var parse_data=JSON.parse(arr_data)

      }catch(e){
        throw "Data Not Found !" 
      }
      
      return parse_data
}

// ====================================================================================
// ========    fetch Data from storage      ============================
// ====================================================================================
function store_data_in_storage(name,arr_data){

  localStorage.setItem(name,JSON.stringify(arr_data))

}
// ====================================================================================
// ========    show data of cart     ============================
// ====================================================================================
function show_cart_data(){

  var cart_data= fetch_data_from_storage('carts')||[]

  cart_data.forEach(product=>creat_cart_elem(product))


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
                      sum_total()
                       break;
                      
                    }
            }

            store_data_in_storage('carts',cart)

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

            store_data_in_storage('carts',cart)
          }
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
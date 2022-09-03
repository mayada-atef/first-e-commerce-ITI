
var id =window.location.search.substring(4)
// console.log(id);

function showSingleProduct(){

      var products=fetch_data_from_storage('products')
      var pro_img =document.getElementById('sigle-imge')
      var pro_title =document.getElementById('name')
      var pro_rate =document.getElementById('rate')
      var pro_price =document.getElementById('price')
      var pro_sale =document.getElementById('sale')
      var pro_quntity =document.getElementById('quntity')
      var pro_categorie =document.getElementById('categorie')
      var pro_descr =document.getElementById('descr')
      // var star=document.getElementsByClassName('starrr')
      var sigle_product=products.filter(product=>product.id==id)
      
      console.log(sigle_product);
      
      sigle_product.forEach(s_product=>{ 
             
                    pro_img.setAttribute('src',s_product.img)
                    pro_title.innerHTML=s_product.title
                    pro_rate.innerHTML=`<i class="starrr" style="color:rgb(251, 255, 0)" class="fa-solid fa-star"></i>`
                    pro_price.innerHTML=s_product.price
                    pro_sale.innerHTML=s_product.sale
                    pro_quntity.innerHTML=s_product.quantity
                    pro_categorie.innerHTML=s_product.category
                    pro_descr.innerHTML=s_product.description
                    // pro_name.innerHTML=s_product.title
                  })

}

showSingleProduct()

               

// =======================================================================================================
            // fetch data from storage 
// =======================================================================================================

function fetch_data_from_storage(storage_get_item){
  var arr_data=localStorage.getItem(storage_get_item)

  var parse_data=JSON.parse(arr_data)

  return parse_data
}
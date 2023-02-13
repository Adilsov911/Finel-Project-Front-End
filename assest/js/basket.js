
function GetItemsfromBasket() {
    let basket = JSON.parse(localStorage.getItem('baskett'));
    console.log(basket);    
    let item = '';
  
    basket.forEach(x => {
        item += ` <div class="col-lg-4 d-flex">
                      <div class="img col-lg-6">
  
                        <a href="product-detail.html"> <img src="${x.Image}" alt=""></a> 
                      </div>
                      <div class="title col">
                          <h5> <a href=""> ${x.Name}</a></h5>
                      </div>
  
                  </div>
                  <div class="col-lg-2">
                      <h5>$ ${x.Price}</h5>
  
                  </div>
                  <div class="col-lg-2 ph">
                      <div class="number">
                          <span class="minus">-</span>
                          <input type="text" value="${x.count}"/>
                          <span class="plus">+</span>
                      </div>
  
                  </div>
                  <div class="col-lg-2 ph">
                      <p>${x.total_price}$</p>
                  </div>
                  <div class="col-lg-2 ph">
                      <h6><i class="fa-solid fa-trash"></i>REMOVE</h6>
                  </div>
        `
    })
    document.getElementById('basket-listt').innerHTML = item
  
  }
  GetItemsfromBasket();
  
 
  
  function ToplaItem(){
      let toplama = JSON.parse(localStorage.getItem("baskett"));
      let toplamQiymet = 0;
      let toplamcount = 0;
      
      let items = " "
      toplama.forEach(a => {
          toplamcount += a.Count;
          let Price = parseFloat(a.Price);
          let fullPrice = a.Count*Price;
          toplamQiymet += fullPrice;
          console.log(toplamQiymet);   
          console.log(toplamcount);   
      })
      items=`
      <div class="total text-center">
                  <h3>TOTAL PRICE: ${toplamQiymet}$</h3>
                  <button type="button" class="btn btn-secondary">BUY</button>
              </div>
      
      `
      document.getElementById('clakk').innerHTML = items
      
     
      
     
  }
  ToplaItem()
  
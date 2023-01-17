$(function(){
    $('.Slider').slick({
      
        infinite: true,
        speed: 1650,
        fade: true,
        cssEase: 'linear',
        prevArrow:'<span class="priv-arrow"><i class="fa-solid fa-angle-left"></i></span>',
        nextArrow:'<span class="next-arrow"><i class="fa-solid fa-chevron-right"></i></span>'
      });
});
$(function(){

  $('.carousel').slick({
    infinite: true,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 4,
    prevArrow:'<span class="priv-arrow"><i class="fa-solid fa-angle-left"></i></span>',
        nextArrow:'<span class="next-arrow"><i class="fa-solid fa-chevron-right"></i></span>',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 3,
          infinite: true,
          
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ]
  });
})
$(function(){

  $('.carousel-brand').slick({
    infinite: true,
    speed: 300,
    slidesToShow: 6,
    slidesToScroll: 1,
    prevArrow:'<span class="priv-arrow"><i class="fa-solid fa-angle-left"></i></span>',
        nextArrow:'<span class="next-arrow"><i class="fa-solid fa-chevron-right"></i></span>',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ]
  });
})
'use strict';

$(function () {

  var collections = $('.FilterByCollections');
  var sizes = $('.FilterBySizes');
  var vendors = $('.FilterByVendors');

  var client = ShopifyBuy.buildClient({
    domain: 'viacheslav-store.myshopify.com',
    storefrontAccessToken: '450e619363d8e69dfd4d1b3178b950e6'
  });

  // Fetch all collections, including their products
  client.collection.fetchAll().then(function (collects) {
    var arrPath = window.location.pathname.split('/');
    collections.append('<option value="all" ' + (arrPath[1] == 'collections' && arrPath[2] == 'all' ? 'selected' : '') + '>All</option>');
    for (var i = 0; i < collects.length; i++) {
      collections.append('<option value="' + collects[i]['handle'] + '" ' + (arrPath[1] == 'collections' && arrPath[2] == collects[i]['handle'] ? 'selected' : '') + '>' + collects[i]['title'] + '</option>');
    }changeCollections();
  });

  collections.change(changeCollections);

  function changeCollections() {
    if (collections.val() != 'all') {
      client.collection.fetchAllWithProducts().then(function (collects) {
        for (var i = 0; i < collects.length; i++) {
          if (collects[i]['handle'] == collections.val()) {
            searchProducts(collects[i].products);
            break;
          }
        }
      });
    } else searchProducts(collects.products);
  }

  function searchProducts(products) {
    var productsTag = [];
    for (var i = 0; i < products.length; i++) {
      productsTag.push(products[i]['tags']);
    }makeArraySizesAndVendors(productsTag);
  }

  function makeArraySizesAndVendors(productsTag) {
    var tagSizes = [];
    var tagVendors = [];
    for (var i = 0; i < productsTag.length; i++) {
      for (var j = 0; j < productsTag[i].length; j++) {
        var tag = productsTag[i][j].value;
        if (tag.toLowerCase().indexOf('size_') >= 0) tagSizes.push(tag);else if (tag.toLowerCase().indexOf('vendor_') >= 0) tagVendors.push(tag);
      }
    }
    tagSizes.sort();
    tagSizes = deleteDublicates(tagSizes);
    sizes.html('');
    sizes.append('<option value="" disabled selected>Size</option>');
    addToSelect(sizes, tagSizes, 5);
    tagVendors.sort();
    tagVendors = deleteDublicates(tagVendors);
    vendors.html('');
    vendors.append('<option value="" disabled selected>Brand</option>');
    addToSelect(vendors, tagVendors, 7);
  }

  function addToSelect(select, arr, count) {
    select.append('<option value="all">All</option>');
    for (var i = 0; i < arr.length; i++) {
      select.append('<option value="' + arr[i] + '">' + arr[i].substring(count) + '</option>');
    }
  }

  function deleteDublicates(arr) {
    for (var i = arr.length; i > 0; i--) {
      if (arr[i] == arr[i - 1]) arr.splice(i, 1);
    }
    return arr;
  }

  $('#FilterByAll').click(function (e) {
    var href = void 0;
    if (collections.val() != '') {
      href = window.location.origin + '/collections/' + $('.FilterByCollections').val();
    }
    if (sizes.val() != null && sizes.val() != '' && sizes.val() != 'all' || vendors.val() != null && vendors.val() != '' && vendors.val() != 'all') href += '/';
    if (sizes.val() != null && sizes.val() != '' && sizes.val() != 'all') {
      href += sizes.val();
      if (vendors.val() != null && vendors.val() != '' && vendors.val() != 'all') href += '+' + vendors.val();
    } else if (vendors.val() != null && vendors.val() != '' && vendors.val() != 'all') href += vendors.val();
    window.location.href = href;
  });
});

//Hey you! Thanks for checking this pen. :) I open source it as library. https://github.com/greenwoodents/quickbeam.js

var Quickbeam = (function () {
  // Instance stores a reference to the Singleton
  var instance;

  function init(att) {
    // Singleton
    var els = {};
    var self = {};

    //Select attributes
    var cart = document.querySelector('#quick-cart');
    var cartPay = document.querySelector('#quick-cart-pay');
    var cartPrice = document.querySelector('#quick-cart-price');

    var addToCart = document.querySelector('[quickbeam="add-to-cart"]');
    var ProductImage = document.querySelector('[quickbeam="image"]');
    var price = document.querySelector('[quickbeam="price"]');

    var variantId;
    var imageUrl;
    var count;
    var color = '#000';

    var last_removed_variant;
    var last_removed_variant_count;


    (function main() {

      window.onresize = function(event) {
        setPayButtonAction();
      };

      setPayButtonAction();

      if (cartPay.length > 0) {return false;}

      if (att.animationLib === 'gsap') {
        if (typeof TweenMax !== 'function') {throw "GSAP is not loaded."}
      }

      if (price) {
        price = price.innerHTML;
      }

      if (ProductImage) {
        imageUrl = ProductImage.getAttribute('src');

        if (!imageUrl) {
          var patt = /url\(\s*(['"]?)(.*?)\1\s*\)/i
          imageUrl = ProductImage.getAttribute('style').match(patt)[2];
        }
      }

      [].forEach.call(document.querySelectorAll('.quickbeam-variant'), function(el){
        if (el.checked) {
          variantId = parseInt(el.getAttribute('quickbeam-value'));
        }
      });


      //Add event listeners
      var listeners = {
        '.quick-cart-product-remove': function(el){
            var id = el.getAttribute("data-id");
            var product = el.parentNode;
            var productCount = product.querySelector('.count');
            var count = parseInt(productCount.innerText);
            var imgWrap = product.querySelector('div');

            if (!(product && cart)) {return false}

            count--;

            if (count <= 0) {
              //Animation
              product.classList.add("remove-product");
              window.setTimeout(function() {
                product.classList.remove("remove-product");
                removeProduct(product);
              }, 1000);
            } else {
              productCount.innerText = count;

              var clone = imgWrap.cloneNode(true);
              clone.classList.add('animateOut')
              imgWrap.parentNode.appendChild(clone);

              window.setTimeout(function() {
                clone.parentNode.removeChild(clone);
              }, 1000);


              if (count <= 1) {
                productCount.classList.add("hide");
              }
            }

            if (last_removed_variant == id) {
              last_removed_variant_count++;
            } else {
              last_removed_variant = id;
              last_removed_variant_count = 1;
            }

            if (3 == last_removed_variant_count && count > 1) {
              product.classList.add("show-remove-all");
            }


            ajaxRemoveProduct({quantity: count, id: id});
          },

          '.quick-cart-product-removeall': function(el) {
              var id = el.getAttribute("data-id");
              var product = el.parentNode;

              if (!(product && cart)) {return false}

              product.classList.add("remove-product");
              window.setTimeout(function() {
                removeProduct(product_box);
              }, 200);

              ajaxRemoveProduct({quantity: 0, id: id});
          }
      }

      //Event delegation for cart
      cart.addEventListener("click",function(e) {
        //calling callback if item of object have a match.
        for (var key in listeners) {
          if (listeners.hasOwnProperty(key) && e.target && e.target.matches(key)) {
            listeners[key].apply(null, [e.target]);
          }
        }
      });

      if (addToCart) {
        //Buy button listener.
        addToCart.addEventListener('click', start, false);
      }

      function start(e){
        e.preventDefault();
        this.blur();

        // display pay button if is not
        if (!(cartPay.classList.contains('open'))) {
          cartPay.classList.add("open");
        }

        count = parseInt(document.querySelector('.quantity-selector').value);

        addProduct();

        animateProduct();

        if (ProductImage) {
          ProductImage.classList.add("animate");
          window.setTimeout(function(){
            ProductImage.classList.remove("animate");
          }, 400);
        }
      }

      return false;
    })();

    //Procedure for creating product in cart and displaying after animation.
    function addProduct() {
      var variant;

      //Calling select variant from attributes or falling back to default select variant.
      if (typeof att.variantSelector === 'function') {
        variant = att.variantSelector.call();
        if (typeof variant !== string) {
          console.error("variantSelector not returning a string.");
          variant = '';
        }
      } else {
        [].forEach.call(document.querySelectorAll('.quickbeam-variant'), function(el){
          if (el.checked) {
            variantId = parseInt(el.getAttribute('quickbeam-value'));
            variant = el.getAttribute('value');
          }
        });
      }

      if (typeof variant === 'undefined') {
        console.error("Not able to select variant");
        variant = '';
      }

      var cart_product = document.querySelector("#quick-cart-product-" + variantId) || false;

      if (cart && ProductImage && cart_product == false ) {
        //Create product box
        var element = createProductBox({
          id: variantId,
          price: price,
          image: imageUrl,
          size: variant,
          color: color
        });
        //Append element to cart
        cart.insertBefore(element, cart.firstChild);
        //Display created element
        displayProductBox(element, 1000);
      }
    }

    // Function for creating DOM element from pre-set template.
    // Private function
    // Arguments: variantId, price, swatchesContent
    // Returning created DOM element.
    function createProductBox(data) {
      var template = '<div class="quick-cart-product-wrap">'+
                        '<img src="' + data.image + '">'+
                        '<span class=" s1" style="background-color: '+data.color+'; opacity: .5">'+ data.price.trim() +'</span>'+
                        '<span class=" s2">'+ data.size.trim() +'</span>'+
                      '</div>'+
                      '<span class="count hide fadeUp" id="quick-cart-product-count-'+ data.id +'">0</span>'+
                      '<span class="quick-cart-product-remove remove" data-id="'+ data.id +'"></span>'+
                      '<span class="quick-cart-product-removeall removeall" data-id="'+ data.id +'"></span>';

      var div = document.createElement("div");
      div.classList.add("quick-cart-product");
      div.classList.add("quick-cart-product-static");
      div.setAttribute("id", "quick-cart-product-" + data.id);
      div.style.opacity = 0;
      div.innerHTML = template;

      return div;
    }

    // Function for displaying product box.
    // private function
    // Arguments: createde element, delay of display.
    function displayProductBox(el, delay) {
      //Defaults
      delay = typeof delay !== 'undefined' ? delay : 0;

      window.setTimeout(function(){
        el.style.opacity = 1;
      }, delay);
    }

    //requst animation frame animation function
    function animate(item) {
      var duration = item.time,
      end = +new Date() + duration;

      var step = function() {

        var current = +new Date(),
            remaining = end - current;

        if(remaining < 60) {
          item.run(1);  //1 = progress is at 100%
          return;

        } else {
          var rate = 1 - remaining/duration;
          item.run(rate);
        }

        requestAnimationFrame(step);
      }
      step();
    }

    //Procedure for animating process of adding product box to cart using bezire curve.
    //Private
    function animateProduct() {
      // create and append copy of large image.
      var element = createAnimatedObject();
      var c = getAnimationCoordinations(element);

      if (att.animationLib === 'gsap') {
        gsapAnimation(element, c);
      } else {
        fallbackAnimation(element, c);
      }
    }

    function gsapAnimation(element, c) {
      element.style.position = 'absolute';
      element.classList.add("run");

      var countBox = document.getElementById("quick-cart-product-count-" + variantId);
      if (countBox) {
        countBox.classList.remove('fadeUp')
        countBox.classList.add('fadeDown')
      }

      TweenMax.to(element, 1, {bezier:{type:"soft", values:c.through}, ease:Power1.easeInOut});

      setTimeout(function(){
        element.style.opacity = 0;
        document.body.removeChild(element);

        setTimeout(function(){
          ajaxAddProductToCart();
        },100)
      }, 1000);
    }

    //Vanilla JS Animation
    function fallbackAnimation(element, c) {
      var cordeIndex = 0;
      var coord = function (x,y) {
        if(!x) var x=0; if(!y) var y=0;
        return {x: x, y: y};
      };

      var bezier = function(t, p0, p1, p2, p3){
        var cX = 3 * (p1.x - p0.x),
            bX = 3 * (p2.x - p1.x) - cX,
            aX = p3.x - p0.x - cX - bX;

        var cY = 3 * (p1.y - p0.y),
            bY = 3 * (p2.y - p1.y) - cY,
            aY = p3.y - p0.y - cY - bY;

        var x = (aX * Math.pow(t, 3)) + (bX * Math.pow(t, 2)) + (cX * t) + p0.x;
        var y = (aY * Math.pow(t, 3)) + (bY * Math.pow(t, 2)) + (cY * t) + p0.y;

        return {x: x, y: y};
      };
      //Coordinations
      //Start
      var P1 = coord(c.start.x,c.start.y);
      //HELPERS
      var P2 = coord(c.start.x-300,c.final.y);
      var P3 = coord(c.start.x+500,c.start.y+500);
      //final destination
      var P4 = coord(c.final.x,c.final.y);

      //Actaully animate.
      var stage = 0;
      element.style.position = 'absolute';
      element.classList.add("run");
      animate({
        time: 1000,

        run: function(t) {
          if(t == 1) {
            setTimeout(function(){
              element.style.opacity = 0;
              document.body.removeChild(element);

              setTimeout(function(){
                ajaxAddProductToCart();
              },1000)
            }, 500);

          }
          //find position on bezier curve
          var curpos = bezier(t,P1,P2,P3,P4)

          var trans = "translate("+Math.round(curpos.x)+"px,"+Math.round(curpos.y)+"px)";

          element.style.webkitTransform = trans;
          element.style.transform = trans;
        }
      });
    }

    // Function for creating DOM element from pre-set template.
    // Private function
    // Arguments: none
    // Returning created DOM element.
    function createAnimatedObject(data) {
      var width = ProductImage.offsetWidth - 2;
      var height = Math.round(parseInt(ProductImage.offsetWidth - 2) * 1.33);
      var offset = ProductImage.getBoundingClientRect();

      var template =  '<div style="width:'+ width +'px; height:'+ height +'px;">'+
                      '<img src="'+ imageUrl +'">'+
                      '<span class="s1" style="background-color: '+color+'; opacity: .5; transition: 1000ms"></span>'+
                      '<span class="s2"></span>'+
                      '</div>';

      // Animace pridani produktu k produktovemu boxu
      var div = document.createElement("div");
      div.classList.add("quick-cart-product");
      div.classList.add("quick-cart-product");
      div.classList.add("animated");
      div.setAttribute("id", "quick-cart-product-animated");

      if (att.animationLib === 'gsap') {
        var trans = "translate("+ offset.left +"px,"+ offset.top +"px)";
        div.style.webkitTransform = trans;
        div.style.transform = trans;
      }

      //Apend template
      div.innerHTML = template;
      //Append child to body
      document.body.appendChild(div);
      //return
      return div;
    }

    // Function for calculating animation coordinations
    // Private function
    // Arguments: element from DOM.
    // Returning object { start:{x,y}, finish: {x,y} }.
    function getAnimationCoordinations(element) {
      var child = element.querySelector('div');
      // Calc of start and finish positions of animation.
      var start = ProductImage.getBoundingClientRect();
      var final = document.querySelector("#quick-cart-product-" + variantId).getBoundingClientRect();
      var fTop = final.top;
      // adding scroll heihft to Y
      var doc = document.documentElement;
      var left = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
      var top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);

      var throughX = parseInt(start.left) - parseInt(child.style.width) * 1.4;
      var throughY = (fTop + top) - parseInt(child.style.height) / 3;

      return {
        start: {
          x: start.left,
          y: start.top
        },
        through: [
          {x:throughX, y:throughY},
          {x:final.left, y:fTop + top}
        ],
        final: {
          x: final.left,
          y: fTop + top
        }
      }
    }

    // Function for adding product to shopify cart using AJAX
    // Private function
    // Arguments:
    // Returning nothing, procedure.
    function ajaxAddProductToCart() {
      var product_box = document.getElementById("quick-cart-product-" + variantId);

      var product_count_box = document.getElementById("quick-cart-product-count-" + variantId);
      var product_count = parseInt(product_count_box.innerText);
      var cartPay_total_count = document.getElementById("quick-cart-pay-total-count");
      var cartPay_total_count_value = parseInt(cartPay_total_count.innerText);
      product_count += count;
      product_count_box.innerText = product_count;
      if (product_count > 1) {
        product_count_box.classList.remove("hide");
      }
      // aktualizace celkoveho poctu ks pro mobilni vzhled
      cartPay_total_count_value += count;
      cartPay_total_count.innerText = cartPay_total_count_value;


      var countBox = document.getElementById("quick-cart-product-count-" + variantId);
      countBox.classList.remove('fadeDown')
      countBox.classList.add('fadeUp')

      if (count < 0) {
        count = 1;
      }

      if (product_box) {
        product_box.classList.remove("show-remove-all");
        last_removed_variant_count = 0;
      }

      var ajax = new XMLHttpRequest();
      ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
          ajaxUpdateCart();
        }
      };
      ajax.open("POST", "/cart/add.js", true);
      ajax.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      ajax.send(JSON.stringify({quantity: count, id: variantId}));
    }

    function ajaxRemoveProduct(data) {
      var ajax = new XMLHttpRequest();

      ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
          ajaxUpdateCart();
        }
      };
      ajax.open("POST", "/cart/change.js", true);
      ajax.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      ajax.send(JSON.stringify(data));
    }

    function ajaxRemoveAllProducts(data) {
      var ajax = new XMLHttpRequest();
      ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
          ajaxUpdateCart();
        }
      };
      ajax.open("POST", "/cart/change.js", true);
      ajax.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      ajax.send(JSON.stringify(data));
    }

    // Function for updating cart with quantity of actual item and orice
    // Private function
    // Arguments:
    // Returning nothing
    function ajaxUpdateCart() {
      var ajax = new XMLHttpRequest();
      ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
          var response = JSON.parse(ajax.responseText);
          cartPrice.innerText = Shopify.formatMoney(response.total_price);
          // Zobrazeni tlacitka na nakup
          if (response.total_price <= 0) {
            cartPay.classList.remove("open");
          }
        }
      };
      ajax.open("GET", "/cart.js", true);
      ajax.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      ajax.send();
    }

    // Function for removing html of product from cart
    // Private function
    function removeProduct(product_box) {
      cart.removeChild(product_box);
    }

    // procedure for changing cart link destionation depending on size of screen.
    function setPayButtonAction() {
      if (cartPay) {
        // Cart is fixed in right bottom of screen
        var window_w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

        if (window_w > 600) {
          cartPay.setAttribute("href", "/checkout");
          cartPay.classList.remove("cart-ico");
        } else {
          cartPay.setAttribute("href", "/cart");
          cartPay.classList.add("cart-ico");
        }
      }
    }
    //public methods
    return self;
  };

  return {
    // Get the Singleton instance if one exists
    // or create one if it doesn't
    init: function (att) {
      if ( !instance ) {
        instance = init(att);
      }
      return instance;
    }
  };

})();


(function($) {
  $(function() {
    $('nav ul li a:not(:only-child)').click(function(e) {
      $(this).siblings('.nav-dropdown').toggle();
      
      $('.nav-dropdown').not($(this).siblings()).hide();
      e.stopPropagation();
    });
    $('html').click(function() {
      $('.nav-dropdown').hide();
    });
    $('#nav-toggle').click(function() {
      $('nav ul').slideToggle();
    });
    $('#nav-toggle').on('click', function() {
      this.classList.toggle('active');
    });
  }); 
})(jQuery);


$(document).ready(function() {
  $('.minus').click(function () {
    var $input = $(this).parent().find('input');
    var count = parseInt($input.val()) - 1;
    count = count < 1 ? 1 : count;
    $input.val(count);
    $input.change();
    return false;
  });
  $('.plus').click(function () {
    var $input = $(this).parent().find('input');
    $input.val(parseInt($input.val()) + 1);
    $input.change();
    return false;
  });
});
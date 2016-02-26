(function(global){
    var shopViewModel,
        app = global.app =global.app || {};
    
    shopViewModel = kendo.data.ObservableObject.extend({
        shopListSource:'',
        
        show:function()
        {
            //var data = [{id:1,title:'Pure Canna Balm',price:'$20.00',prodImg:'style/newImage/product_img.png',cart:'style/images/390/cart.png'},{id:2,title:'Pure Canna Balm',price:'$30.00',prodImg:'style/newImage/product_img.png',cart:'style/images/390/cart.png'},{id:3,title:'Pure Canna Balm',price:'$35.00',prodImg:'style/newImage/product_img.png',cart:'style/images/390/cart.png'},{id:4,title:'Pure Canna Balm',price:'$45.00',prodImg:'style/newImage/product_img.png',cart:'style/images/390/cart.png'},{id:5,title:'Pure Canna Balm',price:'$60.00',prodImg:'style/newImage/product_img.png',cart:'style/images/390/cart.png'},{id:6,title:'Pure Canna Balm',price:'$70.00',prodImg:'style/newImage/product_img.png',cart:'style/images/390/cart.png'},{id:1,title:'Pure Canna Balm',price:'$20.00',prodImg:'style/newImage/product_img.png',cart:'style/images/390/cart.png'},{id:2,title:'Pure Canna Balm',price:'$30.00',prodImg:'style/newImage/product_img.png',cart:'style/images/390/cart.png'},{id:3,title:'Pure Canna Balm',price:'$35.00',prodImg:'style/newImage/product_img.png',cart:'style/images/390/cart.png'},{id:4,title:'Pure Canna Balm',price:'$45.00',prodImg:'style/newImage/product_img.png',cart:'style/images/390/cart.png'},{id:5,title:'Pure Canna Balm',price:'$60.00',prodImg:'style/newImage/product_img.png',cart:'style/images/390/cart.png'},{id:6,title:'Pure Canna Balm',price:'$70.00',prodImg:'style/newImage/product_img.png',cart:'style/images/390/cart.png'},{id:1,title:'Pure Canna Balm',price:'$20.00',prodImg:'style/newImage/product_img.png',cart:'style/images/390/cart.png'},{id:2,title:'Pure Canna Balm',price:'$30.00',prodImg:'style/newImage/product_img.png',cart:'style/images/390/cart.png'},{id:3,title:'Pure Canna Balm',price:'$35.00',prodImg:'style/newImage/product_img.png',cart:'style/images/390/cart.png'},{id:4,title:'Pure Canna Balm',price:'$45.00',prodImg:'style/newImage/product_img.png',cart:'style/images/390/cart.png'},{id:5,title:'Pure Canna Balm',price:'$60.00',prodImg:'style/newImage/product_img.png',cart:'style/images/390/cart.png'},{id:6,title:'Pure Canna Balm',price:'$70.00',prodImg:'style/newImage/product_img.png',cart:'style/images/390/cart.png'}];
            // app.shopService.viewModel.setShopListData(data);
           // app.shopService.viewModel.productListAPI();
            app.shopService.viewModel.API_productList();
            
            // For show count of my cart
            app.shopService.viewModel.setCartItemshop();
        },
        
        setCartItemshop : function(){
            
            if(localStorage.getItem('canUserCartData') != null){
        		$("#shopView .cart").attr("data-badge", JSON.parse(localStorage.getItem('canUserCartData')).length);
                $("#shopView .cart").find('span').html(JSON.parse(localStorage.getItem('canUserCartData')).length);  
        	}else{
        		console.log("Empty cart");
                $("#shopView .cart").attr("data-badge", '0');
                $("#shopView .cart").find('span').html('0');
        	}
        },
        API_productList : function()
        {
            app.mobileApp.showLoading();
            var productData = new kendo.data.DataSource({
              transport:{
                  read:{
                      url:localStorage.getItem('getCategories_API'),
                      type:'GET',
                      dataType:'JSON'
                  }
              },
              schema:{
                  data:function(data)
                  {
                      return [data];
                  }
              },
              error:function(e)
              {
                  app.mobileApp.hideLoading();
                  navigator.notification.alert("Server not responding properly.Please check your internet connection.",
                        function () { }, "Message", 'OK');
              }
           });
           productData.fetch(function(){
                var data = this.data();
                //console.log(data);
                //app.mobileApp.hideLoading();
                app.shopService.viewModel.setShopListData(data[0]);
           }); 
        },
        
        productChange : function(e){
            console.log('Product change');
            console.log(e);
        },
        
        productListAPI:function()
        {
          app.mobileApp.showLoading();
          var productData = new kendo.data.DataSource({
              transport:{
                  read:{
                      url:localStorage.getItem('productlist_API'),
                      type:'GET',
                      dataType:'JSON'
                  }
              },
              schema:{
                  data:function(data)
                  {
                      return [data];
                  }
              },
              error:function(e)
              {
                  app.mobileApp.hideLoading();
                  navigator.notification.alert("Server not responding properly.Please check your internet connection.",
                        function () { }, "Message", 'OK');
              }
          });
           productData.fetch(function(){
                var data = this.data();
                app.mobileApp.hideLoading();
                console.log(data);
               
                categoryData = [];
                for(x in data[0])
                {
                    if($.isNumeric(x))
                    {
                        //categoryData.push({'category':data[0][x]['MainCategoryName']});
                        //console.log(data[0][x]);
                    }
                }
               
                //app.shopService.viewModel.createCategoryList(categoryData);
                //app.shopService.viewModel.setShopListData(data[0]);
                //app.shopService.viewModel.createShopList(data[0]);
           }); 
        },
        
        createCategoryList : function(data)
        {
            var Selecthtml = '';
            
            Selecthtml = '<select class="dropDwn" id="productCategory">';
            Selecthtml += '<option>Product Categories</option>';
            
            for(i in data)
            {
                if($.isNumeric(i))
                {
                   // alert(data[i]['category'].charAt(0).toUpperCase()+data[i]['category'].slice(1));
                    Selecthtml +='<option>'+data[i]['category'].charAt(0).toUpperCase()+data[i]['category'].slice(1)+'</option>';
                }
            }
            
            Selecthtml += '</select>';
            
            $('.productCategoryP').html(Selecthtml);
           // app.mobileApp.hideLoading();
        },
        
        createShopList:function(data)
        {
            app.mobileApp.showLoading();
            //console.log(data[0]['post']['ID']);
            
            var shopHtml = '';
            for(x in data)
            {
                if($.isNumeric(x))
                {
                    //console.log(x);
                    //console.log(data[x]['regular_price'][0]);
                    
                    shopHtml += '<li>';
                    shopHtml += '<div class="dynDv">';
                    shopHtml += '<div class="prodCls" data-id="'+data[x]['post']['ID']+'">';
                    shopHtml += '<p style="text-align:center">';
                    shopHtml += '<img src="'+data[x]['post']['featured_Image']+'" style="width:50%"/>';
                    shopHtml += '</p>';
                    shopHtml += '</div>';
                    shopHtml += '<div class="prodTitle">';
                    shopHtml += '<p class="txtCon">'+data[x]['post']['post_title']+'</p>';
                    shopHtml += '</div>';
                    shopHtml += '<div class="bindCls">';
                    shopHtml += '<div class="priCls">';
                    shopHtml += '<p>$ '+data[x]['regular_price'][0]+'</p>';
                    shopHtml += '</div>';
                    shopHtml += '<a class="cartCls" data-role="button" data-image="'+data[x]['post']['featured_Image']+'" data-title="'+data[x]['post']['post_title']+'" data-price="'+data[x]['regular_price'][0]+'" data-id="'+data[x]['post']['ID']+'">';
                    shopHtml += '<p>';
                    shopHtml += '<span class="cartImage"></span>';
                    shopHtml += '</p>';
                    shopHtml += '</a>';
                    shopHtml += '</div>';
                    shopHtml += '</div>';
                    shopHtml += '</li>';
                }
            }
            
            $('#shopListData').html(shopHtml);
            app.mobileApp.hideLoading();
        },
        
        setShopListData:function(data)
        {
            console.log(data);
            app.shopService.viewModel.setProductList(data[0]['MainCategoryID']);
            
            //var prdata = '<option>--select--</option>';
            var prdata = '';
            for(x in data)
            {
                if($.isNumeric(x))
                {
                    //console.log(data[x]['MainCategoryName']);
                    prdata += '<option value='+data[x]['MainCategoryID']+'>'+data[x]['MainCategoryName']+'</option>';
                    
                }
            }
            $("#productCategory").html(prdata);
            
            //app.mobileApp.hideLoading();
            //var tempdata = [{id:1,title:'Pure Canna Balm',price:'$20.00',prodImg:'style/newImage/product_img.png',cart:'style/images/390/cart.png'}, {id:1,title:'Pure Canna Balm',price:'$20.00',prodImg:'style/newImage/product_img.png',cart:'style/images/390/cart.png'}, {id:1,title:'Pure Canna Balm',price:'$20.00',prodImg:'style/newImage/product_img.png',cart:'style/images/390/cart.png'}];
            //this.set('shopListSource',tempdata);
        },
        
        moveToMain:function(e)
        {
            console.log(e['currentTarget']['attributes']['data-id']['value']);
            localStorage.setItem('product_id',e['currentTarget']['attributes']['data-id']['value']);
            app.mobileApp.navigate('views/productDetail.html');   
        },
        
        moveToCart:function()
        {
            app.mobileApp.navigate('views/mycart.html')
        },
        
        addToCart:function(e)
        {
            console.log(e);
            console.log(e['target'][0]['attributes']['data-id']['value']);
            console.log(e['target'][0]['attributes']['data-price']['value']);
            alert("Id : "+e['target'][0]['attributes']['data-id']['value']+' , Price : '+e['target'][0]['attributes']['data-price']['value']);
        },
        
        loadCategory:function()
        {
            //alert("ok");
        },
        
        setProductList : function(id){
            console.log(id);
            app.mobileApp.showLoading();
            var productData = new kendo.data.DataSource({
              transport:{
                  read:{
                      url:localStorage.getItem('productlist_API'),
                      type:'GET',
                      data:{'category':id},
                      dataType:'JSON'
                  }
              },
              schema:{
                  data:function(data)
                  {
                      return [data];
                  }
              },
              error:function(e)
              {
                  app.mobileApp.hideLoading();
                  navigator.notification.alert("Server not responding properly.Please check your internet connection.",
                        function () { }, "Message", 'OK');
              }
           });
           productData.fetch(function(){
                var data = this.data();
                //console.log(data);
                if(data[0]['status'] === 0 || data[0]['status'] === '0')
                {
                    navigator.notification.alert("Something went wrong! Please try again.",function () { }, "Notification", 'OK');
                    app.mobileApp.hideLoading();
                }
                else
                {
                    app.shopService.viewModel.createShopList(data[0]['data']);
                }
           });
        }
        
    });
    
    app.shopService = {
        viewModel:new shopViewModel()
    };
})(window);


$(document).on('change', '#shopView .wrapper .dropDwn', function() { 
    
    //console.log("change event"+this.value);
    app.shopService.viewModel.setProductList(this.value);
});

$(document).on('click', '#shopView .wrapper .cartCls', function() { 
    
    console.log("click_event = "+$(this).attr('data-id'));
    /*
    var variation = new Array();
    var cart_item_data = new Array();
    var productdata = {
        'product_ID':$(this).attr('data-id'),
        'variation_ID':'',
        'variation':variation,
        'quantity':1,
        'cart_item_data':cart_item_data
      };
    
    productdata = btoa(productdata);
    var thisdata = {
                    'user_ID':localStorage.getItem('user_id'),
                    'product':productdata
                   };
    
    app.mobileApp.showLoading();
    var productData = new kendo.data.DataSource({
      transport:{
          read:{
              url:localStorage.getItem('addtocart_API'),
              type:'POST',
              data:thisdata,
              dataType:'JSON'
          }
      },
      schema:{
          data:function(data)
          {
              return [data];
          }
      },
      error:function(e)
      {
          app.mobileApp.hideLoading();
          navigator.notification.alert("Server not responding properly.Please check your internet connection.",
                function () { }, "Message", 'OK');
      }
   });
   productData.fetch(function(){
        var data = this.data();
        console.log(data);
        navigator.notification.alert(data[0]['msg'], function () { }, "Notification", 'OK');
        app.mobileApp.hideLoading();
   });*/
    
    var data = {id:$(this).attr('data-id'),title:$(this).attr('data-title'),price:$(this).attr('data-price'),prodImg:'',noofItem:'1',size:''};
	var a = [];
	
	if(localStorage.getItem('canUserCartData') != null){
		//localStorage.setItem('canUserCartData', JSON.stringify(a));
		a = JSON.parse(localStorage.getItem('canUserCartData'));
	}else{
		//console.log("nnnnnn");
	}
	
    // Parse the serialized data back into an aray of objects
    // Push the new data (whether it be an object or anything else) onto the array
    a.push(data);
    
    console.log(a);  // Should be something like [Object array]
    // Re-serialize the array back into a string and store it in localStorage
    localStorage.setItem('canUserCartData', JSON.stringify(a));
    
    app.shopService.viewModel.setCartItemshop();
    navigator.notification.alert("This item added to your cart successfully.", function () { }, "Message", 'OK');
});


$(document).on('click', '#shopView #shopListData .prodCls', function() {
    //console.log('hhhhhhhh id = '+$(this).attr('data-id'));
    app.mobileApp.navigate('views/productDetail.html?id='+$(this).attr("data-id"));
});


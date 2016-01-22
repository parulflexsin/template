(function(global){
    var shopViewModel,
        app = global.app =global.app || {};
    
    shopViewModel = kendo.data.ObservableObject.extend({
        shopListSource:'',
        
        show:function()
        {
            var data = [{id:1,title:'Pure Canna Balm',price:'$20.00',prodImg:'style/newImage/product_img.png',cart:'style/images/390/cart.png'},{id:2,title:'Pure Canna Balm',price:'$30.00',prodImg:'style/newImage/product_img.png',cart:'style/images/390/cart.png'},{id:3,title:'Pure Canna Balm',price:'$35.00',prodImg:'style/newImage/product_img.png',cart:'style/images/390/cart.png'},{id:4,title:'Pure Canna Balm',price:'$45.00',prodImg:'style/newImage/product_img.png',cart:'style/images/390/cart.png'},{id:5,title:'Pure Canna Balm',price:'$60.00',prodImg:'style/newImage/product_img.png',cart:'style/images/390/cart.png'},{id:6,title:'Pure Canna Balm',price:'$70.00',prodImg:'style/newImage/product_img.png',cart:'style/images/390/cart.png'},{id:1,title:'Pure Canna Balm',price:'$20.00',prodImg:'style/newImage/product_img.png',cart:'style/images/390/cart.png'},{id:2,title:'Pure Canna Balm',price:'$30.00',prodImg:'style/newImage/product_img.png',cart:'style/images/390/cart.png'},{id:3,title:'Pure Canna Balm',price:'$35.00',prodImg:'style/newImage/product_img.png',cart:'style/images/390/cart.png'},{id:4,title:'Pure Canna Balm',price:'$45.00',prodImg:'style/newImage/product_img.png',cart:'style/images/390/cart.png'},{id:5,title:'Pure Canna Balm',price:'$60.00',prodImg:'style/newImage/product_img.png',cart:'style/images/390/cart.png'},{id:6,title:'Pure Canna Balm',price:'$70.00',prodImg:'style/newImage/product_img.png',cart:'style/images/390/cart.png'},{id:1,title:'Pure Canna Balm',price:'$20.00',prodImg:'style/newImage/product_img.png',cart:'style/images/390/cart.png'},{id:2,title:'Pure Canna Balm',price:'$30.00',prodImg:'style/newImage/product_img.png',cart:'style/images/390/cart.png'},{id:3,title:'Pure Canna Balm',price:'$35.00',prodImg:'style/newImage/product_img.png',cart:'style/images/390/cart.png'},{id:4,title:'Pure Canna Balm',price:'$45.00',prodImg:'style/newImage/product_img.png',cart:'style/images/390/cart.png'},{id:5,title:'Pure Canna Balm',price:'$60.00',prodImg:'style/newImage/product_img.png',cart:'style/images/390/cart.png'},{id:6,title:'Pure Canna Balm',price:'$70.00',prodImg:'style/newImage/product_img.png',cart:'style/images/390/cart.png'}];
            // app.shopService.viewModel.setShopListData(data);
           // app.shopService.viewModel.productListAPI();
            //app.shopService.viewModel.API_productList();
        },
        
        /*API_productList : function()
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
                app.shopService.viewModel.setShopListData(data[0]);
           }); 
        },*/
        
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
            console.log("HTML CREATE");
            console.log(data);
            /*console.log(data[1]['subcategories'][0][0]);
            console.log(data[0]['subcategories'][0][0]['featured_Image']);
            console.log(data[0]['subcategories'][0][0]['post']['ID']);
            console.log(data[0]['subcategories'][0][0]['post']['post_title']);
            console.log(data[0]['subcategories'][0][0]['regular_price'][0]);*/
            
            for(x in data)
            {
                if($.isNumeric(x))
                {
                    console.log(x);
                    console.log(data[x]['subcategories'][0]);
                    for(y in data[x]['subcategories'])
                    {
                        if($.isNumeric(y))
                        {
                            console.log(y);
                           console.log(data[x]['subcategories'][y]); 
                        }
                    }
                }
            }
    
            
            var shopHtml = '';
            
            shopHtml = '<li>';
            shopHtml += '<div class="dynDv">';
            shopHtml += '<div class="prodCls" data-bind="click:moveToMain" data-id="">';
            shopHtml += '<p style="text-align:center">';
            shopHtml += '<img src="" style="width:50%"/>';
            shopHtml += '</p>';
            shopHtml += '</div>';
            shopHtml += '<div class="prodTitle">';
            shopHtml += '<p></p>';
            shopHtml += '</div>';
            shopHtml += '<div class="bindCls">';
            shopHtml += '<div class="priCls">';
            shopHtml += '<p></p>';
            shopHtml += '</div>';
            shopHtml += '<div class="cartCls">';
            shopHtml += '<p>';
            shopHtml += '<a data-role="button" class="cartImage" data-price="" data-id="" data-bind="click:addToCart"></a>';
            shopHtml += '</p>';
            shopHtml += '</div>';
            shopHtml += '</div>';
            shopHtml += '</div>';
            shopHtml += '</li>';
            alert(shopHtml);
            $('#shopListData').html(shopHtml);
        },
        
        setShopListData:function(data)
        {
            console.log(data);
            this.set('shopListSource',data);
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
            alert("ok");
        }
        
    });
    
    app.shopService = {
        viewModel:new shopViewModel()
    };
})(window);
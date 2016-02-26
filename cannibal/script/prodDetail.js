(function(global){
    var productViewModel,
        app = global.app =global.app || {};
    
    productViewModel = kendo.data.ObservableObject.extend({
        
        show:function(e)
        {
            var id = e.view.params.id;
            if(typeof id === 'undefined'){
                console.log("this is undefined");
            }else{
                console.log("this is id : "+id);
            }
            
            app.productService.viewModel.setCartItem();
            
            cartDataView = [];
            cartDataView.push(localStorage.getItem('canCartData'));
            
            $('#addcart').unbind('.myPlugin');
            $('#addcart').on('click.myPlugin',function(){
                console.log("...addcart");
                
                var data = {id:'100',title:'tttttt',price:'10',prodImg:'',noofItem:'1',size:''};
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
                app.productService.viewModel.setCartItem();
            });
            /*$('#addcart').click(function(){
                //app.productService.viewModel.addTocart(localStorage.getItem('product_id'));
                app.productService.viewModel.checkValidation();
                //alert($('#quantity').val());
            }); */
            
            app.productService.viewModel.shopDtlAPI(localStorage.getItem('product_id'));
            // For show count of my cart
            app.cartService.viewModel.htmlCreate();
        },
        
        checkValidation :function()
        {
            var product_quantity = $('#quantity').val(),
                product_size = $('#materialSize').val();
            
            
            
            if(product_quantity === "0" || product_quantity === 0)
            {
                navigator.notification.alert("Please select Product Quantity",function(){},'Notification','OK');
            }
            else if(product_size === "0" || product_size === 0)
            {
                navigator.notification.alert("Please select Product Size",function(){},'Notification','OK');
            }
            else
            {
                localStorage.setItem('product_quantity',product_quantity);
                localStorage.setItem('product_size',product_size);
                app.productService.viewModel.addTocart(localStorage.getItem('product_id'));
            }
        },
        
        shopDtlAPI : function(data)
        {
            var data = [{id:'1',title:'Pure Canna Balm',price:'$30.00',prodImg:'style/images/390/product_img.png',desc:'description about.'}];
            
            /*var shopDataS = new kendo.data.DataSource({
               data: [{id:'1',title:'Pure Canna Balm',price:'$30.00',prodImg:'style/images/390/product_img.png',desc:'But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and i will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness.'},{id:'2',title:'Pure Canna Balm',price:'$30.00',prodImg:'style/images/390/product_img.png',desc:'But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and i will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness.'},{id:'3',title:'Pure Canna Balm',price:'$30.00',prodImg:'style/images/390/product_img.png',desc:'But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and i will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness.'},{id:'4',title:'Pure Canna Balm',price:'$30.00',prodImg:'style/images/390/product_img.png',desc:'But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and i will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness.'},{id:'5',title:'Pure Canna Balm',price:'$30.00',prodImg:'style/images/390/product_img.png',desc:'But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and i will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness.'},{id:'6',title:'Pure Canna Balm',price:'$30.00',prodImg:'style/images/390/product_img.png',desc:'But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and i will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness.'}],
               filter: { field: "id", operator: "eq", value: data }
            });
            shopDataS.fetch(function(){
                var data = this.view()
                app.productService.viewModel.createProdDetail(data[0]);
            });*/
            
            app.productService.viewModel.createProdDetail(data);
        },
        
        setCartItem : function(){
            
            if(localStorage.getItem('canUserCartData') != null){
        		$("#productDetail .cart").attr("data-badge", JSON.parse(localStorage.getItem('canUserCartData')).length);
                $("#productDetail .cart").find('span').html(JSON.parse(localStorage.getItem('canUserCartData')).length);  
        	}else{
        		console.log("Empty cart");
                $("#productDetail .cart").attr("data-badge", '0');
                $("#productDetail .cart").find('span').html('0');
        	}
        },
        
        addTocart : function(prod_id)
        {
            //var thiscartDataView = [];
            
            cartDataView.push({prod_id:'1024',description:'this is description',prod_name:'this is title',prod_price:'$15',image:'style/images/390/product_img.png',quantity:localStorage.getItem('product_quantity'),size:localStorage.getItem('product_size')});
            localStorage.setItem('canCartData',cartDataView);
            
            console.log(cartDataView);
            app.mobileApp.navigate("#:back");
            
                     
            
            /*var shopDataS = new kendo.data.DataSource({
               data: [{id:'1',title:'Pure Canna Balm',price:'$30.00',prodImg:'style/images/390/product_img.png',desc:'Sed ut perspiciatis unde omnis iste natus.'},{id:'2',title:'Pure Canna Balm',price:'$30.00',prodImg:'style/images/390/product_img.png',desc:'Sed ut perspiciatis unde omnis iste natus.'},{id:'3',title:'Pure Canna Balm',price:'$30.00',prodImg:'style/images/390/product_img.png',desc:'Sed ut perspiciatis unde omnis iste natus.'},{id:'4',title:'Pure Canna Balm',price:'$30.00',prodImg:'style/images/390/product_img.png',desc:'Sed ut perspiciatis unde omnis iste natus.'},{id:'5',title:'Pure Canna Balm',price:'$30.00',prodImg:'style/images/390/product_img.png',desc:'Sed ut perspiciatis unde omnis iste natus.'},{id:'6',title:'Pure Canna Balm',price:'$30.00',prodImg:'style/images/390/product_img.png',desc:'Sed ut perspiciatis unde omnis iste natus.'}],
               filter: { field: "id", operator: "eq", value: prod_id }
            });
            shopDataS.fetch(function(){
                var data = this.view();
                cartDataView.push({prod_id:data[0]['id'],description:data[0]['desc'],prod_name:data[0]['title'],prod_price:data[0]['price'],image:data[0]['prodImg'],quantity:localStorage.getItem('product_quantity'),size:localStorage.getItem('product_size')});
                console.log(cartDataView);
                app.mobileApp.navigate("#:back");
            });*/
        },
        
        createProdDetail : function(data)
        {
            console.log(data);
            var html = '';
            
            $('#selectProdDtl').html('');
            
            html = '<div class="prod_image">';
            html += '<p>';
            html += '<img src="style/images/390/product_img.png"/>';
            html += '</p>';
            html += '</div>';
            html += '<div class="mixCls">';
            html += '<div class="title">';
            html += '<p>New Product</p>';
            html += '</div>';
            html += '<div class="price">';
            html += ' <p>$ 50</p>';
            html += '</div>';
            html += ' </div>';
            html += '<div class="prodCont">';
            html += '<p>Sed ut perspiciatis unde omnis iste natus.</p>';
            html += '</div>';
            html += '<div class="fldDv">';
            html += '<div class="leftFldDv">';
            html += '<p>';
            html += '<label style="color:#5C5C5C;">Quantity</label>';
            html += '<select class="dropdwn" id="quantity" data-bind="value:quantity" onchange="app.productService.viewModel.setQuantity(this.value)">';
            html += '<option value="0">Quantity</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option>';
            html += '</select>';
            html += '</p>';
            html += '</div>';
            html += '<div class="rightFldDv">';
            html += '<p>';
            html += '<label style="color:#5C5C5C;">Size</label>';
            html += '<select class="dropdwn" id="materialSize" onchange="app.productService.viewModel.setSize(this.value)">';
            html += '<option value="0">Size</option><option value="100Mg">100Mg</option><option value="120Mg">120Mg</option><option value="130Mg">130Mg</option><option value="150Mg">150Mg</option ><option value="180Mg">180Mg</option><option value="200Mg">200Mg</option>';
            html += '</select>';
            html += ' </p>';
            html += '</div>';
            html += '</div>';
            
            $('#selectProdDtl').html(html);
        },
        
        setQuantity :function(data)
        {
            
        },
        
        setSize :function(data)
        {
           // alert(data);
        }
        
    });
    
    app.productService = {
        viewModel:new productViewModel()
    };
})(window);
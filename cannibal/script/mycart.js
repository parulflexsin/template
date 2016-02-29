(function(global){
    var cartViewModel,
        app = global.app = global.app || {};
    
    cartViewModel = kendo.data.ObservableObject.extend({
        
        cartListSource:'',
        
        show:function(e)
        {
            $(".km-native-scroller").scrollTop(0);
            //var data = [{id:'1',title:'Pure Canna Balm',price:'$30.00',prodImg:'style/images/390/img1.png',desc:'Sed ut perspiciatis unde omnis iste natus.',quantity:'3',size:'150Mg'},{id:'2',title:'Pure Canna Balm',price:'$30.00',prodImg:'style/images/390/img2.png',desc:'Sed ut perspiciatis unde omnis iste natus.',quantity:'5',size:'150Mg'},{id:'3',title:'Pure Canna Balm',price:'$30.00',prodImg:'style/images/390/img1.png',desc:'Sed ut perspiciatis unde omnis iste natus.',quantity:'2',size:'150Mg'},{id:'4',title:'Pure Canna Balm',price:'$30.00',prodImg:'style/images/390/img2.png',desc:'Sed ut perspiciatis unde omnis iste natus.',quantity:'6',size:'150Mg'},{id:'5',title:'Pure Canna Balm',price:'$30.00',prodImg:'style/images/390/img1.png',desc:'Sed ut perspiciatis unde omnis iste natus.',quantity:'8',size:'150Mg'},{id:'6',title:'Pure Canna Balm',price:'$30.00',prodImg:'style/images/390/img2.png',desc:'Sed ut perspiciatis unde omnis iste natus.',quantity:'4',size:'150Mg'}];
            // app.cartService.viewModel.setCartListview(data);
            
            /*$('.add').unbind(".myPlugin");
            $('.add').on('click',function(){
                var $qty=$(this).closest('p').find('.qty');
                var currentVal = parseInt($qty.val());
                if (!isNaN(currentVal)) {
                    $qty.val(currentVal + 1);
                }
            });
            
            $('.minus').unbind(".myPlugin");
            $('.minus').on('click',function(){
                var $qty=$(this).closest('p').find('.qty');
                var currentVal = parseInt($qty.val());
                if (!isNaN(currentVal) && currentVal > 1) {
                    $qty.val(currentVal - 1);
                }
            });*/
            
            app.cartService.viewModel.htmlCreate();
            
            //app.cartService.viewModel.getMyCart();
            
            
            /*$('.cross').unbind(".myPlugin");
            $('.cross').on('click.myPlugin',function(){
               var parentId = $(this).parent().parent().parent().attr('id');
                navigator.notification.confirm("Are you Sure you want to delete this Item?",function(confirm){
                    if(confirm === 1 || confirm === '1')
                    {
                        $('#'+parentId).remove();        
                    }
                },"Notification","Yes,Cancel");
            });*/
        },
        
        getMyCart : function(){
            console.log("Calling api my cart");
            var data = [];
            app.mobileApp.showLoading();
            $.ajax({
                 url:localStorage.getItem('shoping_API'),
                 type:'GET',
                 data: {'user_ID':localStorage.getItem('user_id')},
                 success: function(result){
                     
                     app.mobileApp.hideLoading();
                     data = jQuery.parseJSON(result);
                     //console.log(data.status);
                     if(data.status === 1 || data.status === '1')
                     {
                         console.log("yyyyyyyyyyy");
                         //console.log(data.data.length);
                         app.cartService.viewModel.carthtmlCreate(data.data);
                     }
                     else
                     {
                        navigator.notification.alert("Something wrong happen, Please try again!",function () { }, "Error", 'OK');
                        //app.mobileApp.hideLoading();
                     }
                 },
                 error: function(){
                     app.mobileApp.hideLoading();
                 }
            });
        },
        
        carthtmlCreate : function(data){
            console.log("carthtmlCreate : "+data.length);
            /*
            var html = '';
            var totaldolr = 0;
            
            
            $(".cart").html('<span class="km-badge">'+data.length+'</span>');
            for(var i=0;i<data.length;i++)
            {
                html+='<div class="main" id="mainContentDv'+data[i]['data']['post']['ID']+'">';
                html+='<div class="dv1"><p><img src="'+data[i]['thumbnail']+'"/></p></div>';
                html+='<div class="dv2">';
                html+='<div class="dv21"><p>'+data[i]['data']['post']['post_title']+'</p></div>';
                html+='<div class="dv22"><p>'+data[i]['data']['post']['post_title']+'</p></div>';
                html+='<div class="dv23">';
                html+='<div class="dv230"><p>$ '+data[i]['data']['price']+'</p></div><div class="dv231">\
                    <img class="minus" src="style/images/390/green_minus.png"/></div><div class="dv232" id="qunatDv">\
                    <input tyep="text" id="quantity" class="thisqunty" value="'+data[i]['quantity']+'" style="background-color:#fff;" disabled="false"/>\
                    <input type="hidden" id="thisvlue" class="thisvlue" value="'+data[i]['data']['price']+'" style="background-color:#fff;" disabled="false"/>\
                    </div><div class="dv233">\
                    <img class="add" src="style/images/390/green_plus.png"/></div>';
                html+='</div>';
                html+='</div>';
                html+='<div class="dv3">';
                html+='<p><img class="cross" src="style/images/390/cross_icon.png"/></p>';
                html+='</div>';
                html+='</div>';
                totaldolr += parseInt( data[i]['data']['price'] );
                
            }
            $('#cartListData').html(html);
            
            var hhtml = '';
            hhtml +='<div class="mainTotalDv" style="width:100%;height:auto;display:inline-block;margin: 0 0 0 0;">';
            hhtml +='<div class="leftdv1"><p>Total</p>';
            hhtml +='</div>';
            hhtml +='<div class="leftdv2"><p>$ <span>'+totaldolr+'</span></p>';
            hhtml +='</div>';
            hhtml +='<div>';
            $('#total').html(hhtml);
            
            $('.minus').unbind(".myPlugin");
            $('.minus').on('click.myPlugin',function(){ 
                var quantity = parseInt($(this).parent().next().children('.thisqunty').val());
                if (!isNaN(quantity) && quantity > 1) {
                    $(this).parent().next().children('.thisqunty').val(quantity - 1);
                    
                    eachVal = parseInt($(this).parent().next().children('.thisvlue').val());
                    
                    totaldolr = (quantity - 1) * eachVal;
                    $(".leftdv2").html('<p>$ '+totaldolr+'</p>');
                }
            });
            
            var eachVal = 0;
            $('.add').unbind(".myPlugin");
            $('.add').on('click.myPlugin',function(){
                var quantity = parseInt($(this).parent().prev().children('.thisqunty').val());
                if (!isNaN(quantity)) {
                    $(this).parent().prev().children('.thisqunty').val(quantity + 1);
                    
                    eachVal = parseInt($(this).parent().prev().children('.thisvlue').val());
                    
                    totaldolr = (quantity + 1) * eachVal;
                    $(".leftdv2").html('<p>$ '+totaldolr+'</p>');
                }
            });
            
            $('.cross').unbind(".myPlugin");
            $('.cross').on('click.myPlugin',function(){
               var parentId = $(this).parent().parent().parent().attr('id');
                navigator.notification.confirm("Are you Sure you want to delete this Item?",function(confirm){
                    if(confirm === 1 || confirm === '1')
                    {
                        $('#'+parentId).remove();        
                    }
                },"Notification","Yes,Cancel");
            });
            */
        },
        
        htmlCreate : function()
        {  
            //var data = [{id:'1',title:'Pure Canna Balm',price:'$30.00',prodImg:'style/images/390/img1.png',desc:'Sed ut perspiciatis unde omnis iste natus.',quantity:'3',size:'150Mg'},{id:'2',title:'Pure Canna Balm',price:'$30.00',prodImg:'style/images/390/img2.png',desc:'Sed ut perspiciatis unde omnis iste natus.',quantity:'5',size:'150Mg'},{id:'3',title:'Pure Canna Balm',price:'$30.00',prodImg:'style/images/390/img1.png',desc:'Sed ut perspiciatis unde omnis iste natus.',quantity:'2',size:'150Mg'},{id:'4',title:'Pure Canna Balm',price:'$30.00',prodImg:'style/images/390/img2.png',desc:'Sed ut perspiciatis unde omnis iste natus.',quantity:'6',size:'150Mg'},{id:'5',title:'Pure Canna Balm',price:'$30.00',prodImg:'style/images/390/img1.png',desc:'Sed ut perspiciatis unde omnis iste natus.',quantity:'8',size:'150Mg'},{id:'6',title:'Pure Canna Balm',price:'$30.00',prodImg:'style/images/390/img2.png',desc:'Sed ut perspiciatis unde omnis iste natus.',quantity:'4',size:'150Mg'}];
            var cartData = [];
            
            if(localStorage.getItem('canUserCartData') != null){
                
                cartData = JSON.parse(localStorage.getItem('canUserCartData')); 
        	}else{
        		console.log("Empty cart");
        	}
            
            var html = '';
            console.log(cartData);
            console.log(cartData.length);
            $("#myCart .cart").attr("data-badge", cartData.length);
            $("#myCart .cart").find('span').html(cartData.length);
            
            this.set('cartListSource',cartData);
            
            //$(".cart").html('<span class="km-badge">'+data.length+'</span>');
            /*
            //console.log(cartData[i]['id']);
            if(cartData.length > 0){
                for(var i=0; i<=cartData.length;i++)
                {
                    html+='<div class="main" id="mainContentDv'+cartData[i]['id']+'">';
                    html+='<div class="dv1"><p><img src="'+cartData[i]['prodImg']+'"/></p></div>';
                    html+='<div class="dv2">';
                    html+='<div class="dv21"><p>'+cartData[i]['title']+'</p></div>';
                    html+='<div class="dv22"><p>'+cartData[i]['desc']+'</p></div>';
                    html+='<div class="dv23">';
                    html+='<div class="dv230"><p>'+cartData[i]['price']+'</p></div><div class="dv231"><img class="minus" src="style/images/390/green_minus.png"/>\
                    </div><div class="dv232" id="qunatDv"><input tyep="text" id="quantity" value="'+cartData[i]['quantity']+'" style="background-color:#fff;" disabled="false"/>\
                    </div><div class="dv233"><img class="add" src="style/images/390/green_plus.png"/></div>';
                    html+='</div>';
                    html+='</div>';
                    html+='<div class="dv3">';
                    html+='<p><img class="cross" src="style/images/390/cross_icon.png"/></p>';
                    html+='</div>';
                    html+='</div>';
                }
            }else{
                console.log("Data not found");
            }
            $('#cartListData').html(html);
            var hhtml = '';
            hhtml +='<div class="mainTotalDv" style="width:100%;height:auto;display:inline-block;margin: 0 0 0 0;">';
            hhtml +='<div class="leftdv1"><p>Total</p>';
            hhtml +='</div>';
            hhtml +='<div class="leftdv2"><p>$180.00</p>';
            hhtml +='</div>';
            hhtml +='<div>';
            $('#total').html(hhtml);
            
    
            
            $('.minus').unbind(".myPlugin");
            $('.minus').on('click.myPlugin',function(){ 
                var quantity = parseInt($(this).parent().next().children().val());
                if (!isNaN(quantity) && quantity > 1) {
                    $(this).parent().next().children().val(quantity - 1);
                }
            });
            
            $('.add').unbind(".myPlugin");
            $('.add').on('click.myPlugin',function(){
                var quantity = parseInt($(this).parent().prev().children('.thisqunty').val());
                if (!isNaN(quantity)) {
                    $(this).parent().prev().children('.thisqunty').val(quantity + 1);
                    
                    eachVal = parseInt($(this).parent().prev().children('.thisvlue').val());
                    
                    totaldolr = (quantity + 1) * eachVal;
                    $(".leftdv2").html('<p>$ '+totaldolr+'</p>');
                }
            });
            
            $('.minus').unbind(".myPlugin");
            $('.minus').on('click.myPlugin',function(){ 
                var quantity = parseInt($(this).parent().next().children('.thisqunty').val());
                if (!isNaN(quantity) && quantity > 1) {
                    $(this).parent().next().children('.thisqunty').val(quantity - 1);
                    
                    eachVal = parseInt($(this).parent().next().children('.thisvlue').val());
                    
                    totaldolr = (quantity - 1) * eachVal;
                    $(".leftdv2").html('<p>$ '+totaldolr+'</p>');
                }
            });*/
        },
        
        setCartListview : function(data)
        {
            this.set('cartListSource',data);
        },
        
        checkoutSubmit:function()
        {
            app.mobileApp.navigate('views/billing.html');
        }
        
    });
    
    app.cartService = {
        viewModel:new cartViewModel()
    }
})(window);


$( "body" ).delegate( ".add","click", function(e) {
    console.log("ddd");
    var quantity = parseInt($(this).parent().prev().children('.thisqunty').val());
    if (!isNaN(quantity)) {
        $(this).parent().prev().children('.thisqunty').val(quantity + 1);
        
        eachVal = parseInt($(this).parent().prev().prev().prev().find('.itemPrice').html());
        //eachVal = parseInt($(this).parent().prev().children('.thisvlue').val());
        calcFprice = parseFloat(eachVal) / parseInt(quantity);
        
        totaldolr = (quantity + 1) * calcFprice;
        //console.log("each = "+eachVal+" No = "+quantity+1+" total = "+totaldolr+" calcFprice = "+calcFprice);
        
        $(this).parent().prev().prev().prev().find('.itemPrice').html(totaldolr);
        //$(".leftdv2").html('<p>$ '+totaldolr+'</p>');
        
        increaseArrayItem($(this).attr('data-id'), "add", '1');
    }
});


$( "body" ).delegate( ".minus","click", function(e) {
    console.log("minus");
    var quantity = parseInt($(this).parent().next().children('.thisqunty').val());
    if (!isNaN(quantity) && quantity > 1) {
        $(this).parent().next().children('.thisqunty').val(quantity - 1);
        
        eachVal = parseInt($(this).parent().prev().find('.itemPrice').html());
        //eachVal = parseInt($(this).parent().next().children('.thisvlue').val());
        calcFprice = parseFloat(eachVal) / parseInt(quantity);
        
        totaldolr = (quantity - 1) * calcFprice;
        
        //console.log("each = "+eachVal+" No = "+quantity+1+" total = "+totaldolr+" calcFprice= "+calcFprice );
        //$(".leftdv2").html('<p>$ '+totaldolr+'</p>');
        $(this).parent().prev().find('.itemPrice').html(totaldolr);
        
        increaseArrayItem($(this).attr('data-id'), "minus", '1');
    }
});

$( "body" ).delegate( ".cross","click", function(e) {
    var parentId = $(this).parent().parent().parent().parent().attr('data-uid');
    var itemToRemove = $(this).parent().parent().parent().attr('data-id');
    
    navigator.notification.confirm("Are you Sure you want to delete this Item?",function(confirm){
        if(confirm === 1 || confirm === '1')
        {
            app.mobileApp.showLoading();
            //$('#'+parentId).remove();
            console.log($('.cross').parents().find('li[data-uid="'+parentId+'"]'));
            $('.cross').parents().find('li[data-uid="'+parentId+'"]').remove();
            
            // Here remove form storage data also
            var a = [];
            if(localStorage.getItem('canUserCartData') != null){
        		//localStorage.setItem('canUserCartData', JSON.stringify(a));
        		a = JSON.parse(localStorage.getItem('canUserCartData'));
        	}else{
        		//console.log("nnnnnn");
        	}
        	
            // Count of removed items
            var removeCounter = 0;

            // Iterate every array item
            for (var index = 0; index < a.length; index++) {
                // If current array item equals itemToRemove then
        		// console.log(array[index].id +' = ');
        		// console.log(itemToRemove);
        		
                if (a[index].id == itemToRemove) {
                    // Remove array item at current index
                    a.splice(index, 1);

        			console.log(index);
                    // Increment count of removed items
                    removeCounter++;

                    // Decrement index to iterate current position 
                    // one more time, because we just removed item 
                    // that occupies it, and next item took it place
                    index--;
                }
            }

        	console.log(a);
            localStorage.setItem('canUserCartData', JSON.stringify(a));
            app.cartService.viewModel.htmlCreate();
            
            arrangeArray();
            app.mobileApp.hideLoading();
        }
    },"Notification","Yes,Cancel");
});




function arrangeArray() {

	if(localStorage.getItem('canUserCartData') != null){
		//localStorage.setItem('canUserCartData', JSON.stringify(a));
		array = JSON.parse(localStorage.getItem('canUserCartData'));
	}else{
		console.log("nnnnnn");
	}
	console.log(array);
	

    // Iterate every array item
	for (var index = 0; index < array.length; index++) {
	
		for (var i = index; i < array.length; i++) {
			// If current array item equals itemToRemove then
			// console.log(array[index].id +' = ');
			// console.log(itemToRemove);
			
			//console.log("super = "+array[index].id);
			//console.log("under = "+array[i].id);
			try{
				if (i != index) {
					if (array[index].id == array[i].id) {
						
						console.log("Matched index = "+index+" with index "+i);
						console.log("Matched id = "+array[index].id+" with id "+array[i].id);
						
						itemid = array[index].id;
						noitem = parseInt(array[index].noofItem) + parseInt(array[i].noofItem);
						console.log("No of items = "+noitem);
						
						fprice  = array[index].price;
						//console.log("first price string = "+fprice);
						fprice  = Number(fprice.replace(/[^0-9\.]+/g,""));
						//console.log("first price = "+fprice);
						
						lprice  = array[i].price;
						//console.log("last price string = "+lprice);
						lprice  = Number(lprice.replace(/[^0-9\.]+/g,""));
						//console.log("last price = "+lprice);
						
						finalprice = fprice + lprice;
						console.log("final price = "+finalprice);
						
						// Add updated item
						newData = {id:itemid, noofItem:noitem, title:array[index].title,price:''+finalprice,prodImg:'style/newImage/product_img.png',cart:'style/images/390/cart.png'};
						
						console.log("Now remove those two and add new one here");
						
						// Remove both item
						array.splice(index, 2);
						index = index - 1;
						
						console.log(array);  // Should be something like [Object array]
						
						// Push the new data (whether it be an object or anything else) onto the array
						array.push(newData);
						
						console.log(array);  // Should be something like [Object array]
						// Re-serialize the array back into a string and store it in localStorage
						localStorage.setItem('canUserCartData', JSON.stringify(array));
					}
				}
			}catch(e){
				console.log(e);
			}
		}
	}

    if(localStorage.getItem('canUserCartData') != null){
    	console.log(array);
        localStorage.setItem('canUserCartData', JSON.stringify(array));
    }
}


function increaseArrayItem(idToIncrease, action, no) {

	if(localStorage.getItem('canUserCartData') != null){
		//localStorage.setItem('canUserCartData', JSON.stringify(a));
		array = JSON.parse(localStorage.getItem('canUserCartData'));
	}else{
		console.log("nnnnnn");
	}

	
    // Iterate every array item
    for (var index = 0; index < array.length; index++) {

		console.log("ID : "+array[index].id + " To be found "+idToIncrease);
        
        if (array[index].id == idToIncrease) {
            
			console.log("Founded ID : "+array[index].id);
            eprice = parseFloat(array[index].price) / parseInt(array[index].noofItem);
			if(action == 'minus'){
                array[index].noofItem = parseInt(array[index].noofItem) - 1;
                array[index].price = parseFloat(array[index].price) - eprice;
            }else{
                /*array[index].noofItem = parseInt(array[index].noofItem) + 1;
                array[index].price = parseFloat(array[index].price) + eprice;*/
                
                array[index].noofItem = parseInt(array[index].noofItem) + parseInt(no);
                array[index].price = array[index].noofItem * eprice;
            }
        }
    }

	console.log(array);
    localStorage.setItem('canUserCartData', JSON.stringify(array));
}



function checkArrayItemExistorNot(id) {

	if(localStorage.getItem('canUserCartData') != null){
		//localStorage.setItem('canUserCartData', JSON.stringify(a));
		array = JSON.parse(localStorage.getItem('canUserCartData'));
	}else{
		console.log("nnnnnn");
	}

	var flag = false;
    // Iterate every array item
    for (var index = 0; index < array.length; index++) {

		console.log("ID : "+array[index].id + " To be found "+id);
        
        if (array[index].id == id) {
            
			console.log("Founded ID : "+array[index].id);
            flag = true;
            break;
        }
    }

	return flag;
}



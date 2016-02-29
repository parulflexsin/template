(function(global){
    var billilngViewModel,
        app = global.app = global.app || {};
    
    billilngViewModel = kendo.data.ObservableObject.extend({
        
        show:function()
        {
           console.log("billilngViewModel");
        },
        submitCheckout : function(){
            console.log("submitCheckout");
            
            var firstname = this.get('bill_fname'),
                lastname = this.get('bill_lname');
            console.log("Fname : "+firstname+" Last : "+lastname);
            
            app.billingService.viewModel.postCart();
        },
        postCart : function(){
            app.mobileApp.showLoading();
            var a = [];
            var data = [];
    	
        	if(localStorage.getItem('canUserCartData') != null){
        		//localStorage.setItem('canUserCartData', JSON.stringify(a));
        		a = JSON.parse(localStorage.getItem('canUserCartData'));
        	}else{
        		//console.log("nnnnnn");
        	}
            
            data['fname'] = fname;
            data['customer_secret'] = Base64.encode(JSON.stringify(a));
            
            var cartDataSource = new kendo.data.DataSource({
                transport:{
                    read:{
                        url:localStorage.getItem('placeorder_API'),
                        type:'POST',
                        dataType:'JSON',
                        data:data
                    }
                },
                schema:{
                    data:function(data)
                    {
                        console.log(data);
                    }
                },
                error:function(e)
                {
                    app.mobileApp.hideLoading();
                    navigator.notification.alert("Server not responding properly.Please check your internet connection.",
                        function () { }, "Message", 'OK');
                }
            });
            cartDataSource.fetch(function(){
                var data = this.data();
                console.log(data);
                app.mobileApp.hideLoading();
            });
        }
        
    })
    
    app.billingService = {
        viewModel:new billilngViewModel()
    };
})(window);
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
            var dataParambill = [];
            
            var a = [];
        	if(localStorage.getItem('canUserCartData') != null){
        		a = JSON.parse(localStorage.getItem('canUserCartData'));
        	}
            
            var firstname = this.get('bill_fname'),
                lastname = this.get('bill_lname'),
                bill_address = this.get('bill_address'),
                bill_city = this.get('bill_city'),
                bill_zipcode = this.get('bill_zipcode'),
                bill_phone = this.get('bill_phone'),
                bill_email = this.get('bill_email');
            var bill_state = $("#bill_state").val();
            
            var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            
            if(firstname === "" || firstname === undefined)
            {
                navigator.notification.alert("Please Enter Firstname.",function(){},'Notification','OK');
                //$('#billing_fname').focus();
            }
            else
            if(lastname === "" || lastname === undefined)
            {
                navigator.notification.alert("Please Enter Lastname.",function(){},'Notification','OK');
                //$('#billing_lname').focus();
            }
            else
            if(bill_address === "" || bill_address === undefined)
            {
                navigator.notification.alert("Please Enter Address.",function(){},'Notification','OK');
                //$('#bill_address').focus();
            }
            else
            if(bill_city === "" || bill_city === undefined)
            {
                navigator.notification.alert("Please Enter City.",function(){},'Notification','OK');
            }
            else
            if(bill_state === "" || bill_state === undefined)
            {
                navigator.notification.alert("Please Select State.",function(){},'Notification','OK');
            }
            else
            if(bill_zipcode === "" || bill_zipcode === undefined)
            {
                navigator.notification.alert("Please Enter Zip Code.",function(){},'Notification','OK');
            }
            else
            if(bill_zipcode.toString().length !== 6 || bill_zipcode.toString().length === '6')
            {
                navigator.notification.alert("Please Enter 6 digit Zip Code.",function(){},'Notification','OK');
            }
            else
            if(bill_phone === "" || bill_phone === undefined)
            {
                navigator.notification.alert("Please Enter Mobile Number.",function(){},'Notification','OK');
            }
            else
            if(bill_phone.toString().length !== 10 || bill_phone.toString().length === '10')
            {
                navigator.notification.alert("Please Enter 10 digit mobile Number.",function(){},'Notification','OK');
            }
            else
            if(bill_email === "" || bill_email === undefined)
            {
                navigator.notification.alert("Please Enter Email Address.",function(){},'Notification','OK');
            }
            else
            if(!filter.test(bill_email))
            {
                navigator.notification.alert("Please Enter valid Email Address.",function(){},'Notification','OK');
            }
            else
            {
                dataParambill['uid'] = localStorage.getItem('user_id'),
                dataParambill['first_name'] = firstname,
                dataParambill['last_name'] = lastname,
                dataParambill['address'] = bill_address,
                dataParambill['city'] = bill_city,
                dataParambill['state'] = bill_state
                dataParambill['postcode'] = bill_zipcode,
                dataParambill['phone'] = bill_phone,
                dataParambill['email'] = bill_email;
                
                //data['fname'] = fname;
                dataParambill['myOrders'] = Base64.encode(JSON.stringify(a));
                app.billingService.viewModel.postCart(dataParambill);
            }
            
        },
        postCart : function(data){
            app.mobileApp.showLoading();
            
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
            cartDataSource.fetch(function(){
                var data = this.data();
                console.log(data);
                app.mobileApp.hideLoading();
                app.billingService.viewModel.billfiledClear();
            });
        },
        billfiledClear : function()
        {
            var that = this,
            firstname = that.set('bill_fname',''),
            lastname = that.set('bill_lname',''),
            bill_address = that.set('bill_address',''),
            bill_city = that.set('bill_city',''),
            bill_zipcode = that.set('bill_zipcode',''),
            bill_phone = that.set('bill_phone',''),
            bill_email = that.set('bill_email','');
            
            
            //app.mobileApp.navigate('views/login.html');
        },
        
    })
    
    app.billingService = {
        viewModel:new billilngViewModel()
    };
})(window);
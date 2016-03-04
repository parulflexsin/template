(function(global){
    var contactViewModel,
        app = global.app = global.app || {};
    
    contactViewModel = kendo.data.ObservableObject.extend({
        name:'',
        contact_phone:'',
        contact_mail:'',
        contact_subject:'',
        contact_message:'',
        
        
        show:function()
        {
           //app.contact.viewModel.blankContactFld();
            
            // For show cart count
            //app.cartService.viewModel.htmlCreate(); 
        },
        
        contactValidation_modifiy : function()
        {
            console.log("this is clicked");
            
            Notification.show({
                title: "New E-mail",
                message: "You have 1 new mail message!"
            }, "info");
        },
        contactValidation : function()
        {
           var username = this.get('name'),
               phone = this.get('contact_phone'),
               mail = this.get('contact_mail'),
               subject = this.get('contact_subject'),
               message = this.get('contact_message');
            
            var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            
            if(!window.connectionInfo.checkConnection())
            {
                 navigator.notification.confirm("Internet Connection not found.",function(confirm){
                    if(confirm === 1 || confirm === '1')
                    {
                        app.contact.viewModel.contactValidation();
                    }
                },'Connection Error?','Retry,Cancel');
            }
            else
            {
                if(username === "")
                {
                    navigator.notification.confirm("Please Enter Name.",function(){},'Notification','OK');
                }
                else if(phone === "")
                {
                    navigator.notification.confirm("Please Enter Phone Number.",function(){},'Notification','OK');
                }
                else if(mail === "")
                {
                    navigator.notification.confirm("Please Enter Email Address.",function(){},'Notification','OK');
                }
                else if(!filter.test(mail))
                {
                    navigator.notification.alert("Please Enter valid Email Address.",function(){},'Notification','OK');
                }
                else if(subject === "")
                {
                    navigator.notification.alert("Please Enter Subject.",function(){},'Notification','OK');
                }
                else if(message === "")
                {
                    navigator.notification.alert("Please Enter Your Message.",function(){},'Notification','OK');
                }
                else
                {
                    dataContactParam = [];
                    dataContactParam['name'] = username;
                    dataContactParam['phone'] = phone;
                    dataContactParam['email'] = mail;
                    dataContactParam['subject'] = subject;
                    dataContactParam['message'] = message;
                    
                    console.log(dataContactParam);
                    app.contact.viewModel.contactAPI_Call(dataContactParam);
                }
            }
        },
        
        contactAPI_Call : function(data)
        {
            app.mobileApp.showLoading();
            var contactData = new kendo.data.DataSource({
                transport:{
                    read:{
                        url:localStorage.getItem('contact_API'),
                        dataType:'JSON',
                        type:'POST',
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
            contactData.fetch(function(){
                var data = this.data();
                if(data[0]['status'] === '1' || data[0]['status'] === 1)
                {
                    app.mobileApp.hideLoading();
                    navigator.notification.alert(data[0]['message'],function () { }, "Message", 'OK');
                    
                    console.log(data);
                    app.contact.viewModel.blankContactFld();
                }
                else
                {
                    app.mobileApp.hideLoading();
                    navigator.notification.alert("Server not responding properly.Please check your internet connection.",
                        function () { }, "Message", 'OK');
                }
            });
        },
        
        blankContactFld : function()
        {
            this.set('name','');
            this.set('contact_phone','');
            this.set('contact_mail','');
            this.set('contact_subject','');
            this.set('contact_message','');
        }
    });
    
    app.contact = {
        viewModel:new contactViewModel()
    }
})(window)
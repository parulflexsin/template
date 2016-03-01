(function(global){
    var accountViewModel,
        app = global.app = global.app || {};
    
    accountViewModel = kendo.data.ObservableObject.extend({
        
        oldpwdTextFld:'',
        newpwdTextFld:'',
        
        show:function()
        {
            $('#changePassordSubmit').unbind(".myPlugin");
            $('#changePassordSubmit').on('click.myPlugin',function(){
                app.accountService.viewModel.changePwdValidation();         
            });
            app.accountService.viewModel.resetChangepwdFld();
            
            // For show count of my cart
            app.cartService.viewModel.htmlCreate();
            
            //app.accountService.viewModel.getMyInfo();
        },
        
        getMyInfo : function(){
           /*
            app.mobileApp.showLoading();
            var changePwdDataS = new kendo.data.DataSource({
                transport:{
                    read:{
                        url:localStorage.getItem('userinfo_API'),
                        type:'GET',
                        dataType:'JSON',
                        data:{'userName':localStorage.getItem('can_user_name')}
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
            changePwdDataS.fetch(function(){
                var data = this.data();
                console.log(data);
                
                if(data[0]['status'] === 0 || data[0]['status'] === '0')
                {
                    navigator.notification.alert("Something went wrong! Please try again.",function () { }, "Notification", 'OK');
                }
                else
                {
                    console.log(data[0]['UserData']);
                    $(".add0").html(data[0]['UserData'][0].firstName.capitalize()+' '+data[0]['UserData'][0].lastName);
                    $(".add1").html('<a data-role="button" class="km-widget km-button"><span class="km-text">'+data[0]['UserData'][0].phoneNumber+'</span></a>');
                    $(".add2").html('<a data-role="button" class="km-widget km-button"><span class="km-text">'+data[0]['UserData'][0].phoneNumber+'</span></a>');
                    $(".add3").html('<p class="add3">'+data[0]['UserData'][0].phoneNumber+'</p>');
                }
                app.mobileApp.hideLoading();
            });*/
        },
        
        changePwdValidation:function()
        {
            var oldpassword = this.get('oldpwdTextFld'),
                newpassword = this.get('newpwdTextFld');
            
            if(!window.connectionInfo.checkConnection())
            {
                navigator.notification.confirm("Internet Connection not found.",function(confirm){
                    if(confirm === 1 || confirm === '1')
                    {
                        app.accountService.viewModel.changePwdValidation();
                    }
                },'Connection Error?','Retry,Cancel');
            }
            else 
            {
                if(oldpassword === "")
                {
                    navigator.notification.confirm("Please Enter Old Password.",function(){},'Notification','OK');
                }
                else if(newpassword === "")
                {
                    navigator.notification.confirm("Please Enter New Password.",function(){},'Notification','OK');
                }
                else
                {
                    dataParamChange = [];
                    dataParamChange['userID'] = localStorage.getItem('user_id');
                    dataParamChange['newPass'] = newpassword;
                    dataParamChange['oldPass'] = oldpassword;
                    app.accountService.viewModel.changePasswordAPI(dataParamChange);   
                }
            }
        },
        
        changePasswordAPI : function(data)
        {
            app.mobileApp.showLoading();
            var changePwdDataS = new kendo.data.DataSource({
                transport:{
                    read:{
                        url:localStorage.getItem('changePwd_API'),
                        type:'GET',
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
            changePwdDataS.fetch(function(){
                var data = this.data();
                console.log(data);
                
                if(data[0]['status'] === 0 || data[0]['status'] === '0')
                {
                    navigator.notification.alert("Old Password did not match.",function () { }, "Notification", 'OK');
                    app.mobileApp.hideLoading();
                }
                else
                {
                     navigator.notification.alert(data[0]['msg'],function () { }, "Notification", 'OK');
                     app.accountService.viewModel.changePwdModalView();
                     app.accountService.viewModel.resetChangepwdFld();
                     app.mobileApp.hideLoading();
                }
            });
        },
        
        changePwdModalView : function()
        {
            $('#changePassword').data('kendoMobileModalView').close();
            app.loginService.viewModel.blankForgotFld();
        },
        
        resetChangepwdFld : function()
        {
            this.set('oldpwdTextFld','');
            this.set('newpwdTextFld','');
        }
    });
    
    app.accountService = {
        viewModel:new accountViewModel()
    };
})(window);


String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}
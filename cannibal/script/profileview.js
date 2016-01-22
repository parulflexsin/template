(function(global){
    var profileViewModel,
        app = global.app = global.app || {};
    
    profileViewModel = kendo.data.ObservableObject.extend({
        
        oldpwdTextFld:'',
        newpwdTextFld:'',
        
        show:function()
        {
            $('#changePassordSubmit').unbind(".myPlugin");
            $('#changePassordSubmit').on('click.myPlugin',function(){
                app.profileService.viewModel.changePwdValidation();         
            });
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
                        app.profileService.viewModel.changePwdValidation();
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
                    app.profileService.viewModel.changePasswordAPI(dataParamChange);   
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
                     app.profileService.viewModel.changePwdModalView();
                     app.mobileApp.hideLoading();
                }
            });
        },
        
        changePwdModalView : function()
        {
            $('#changePassword').data('kendoMobileModalView').close();
            app.loginService.viewModel.blankForgotFld();
        }
    });
    app.profileService = {
        viewModel:new profileViewModel()
    };
})(window);
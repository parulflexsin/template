(function(global){
    var loginViewMOdel,
        app = global.app =global.app || {};
    
    loginData = [];
    loginViewMOdel = kendo.data.ObservableObject.extend({
        
        log_email:'',
        log_pwd:'',
        forgotTextFld:'',
        show:function()
        {
            /* signin validation link*/
            $('#signin').unbind(".myPlugin");
            $('#signin').on('click.myPlugin',function(){
                app.loginService.viewModel.loginValidation();
            });
            
            /*Move to club registration page*/
            
            $('.footerRight').css('background-color','#1A530C');
            
            $('#forgotaccount').unbind(".myPlugin");
            $('#forgotaccount').on('click.myPlugin',function(){
                $('.footerLeft').css('background-color','#1A530C');
                $('.footerRight').css('background-color','#1E9E01');
                //app.mobileApp.navigate('#signupView');
            });

            $('#newaccount').unbind(".myPlugin");
            $('#newaccount').on('click.myPlugin',function(){
                $('.footerLeft').css('background-color','#1E9E01');
                $('.footerRight').css('background-color','#1A530C');
                app.mobileApp.navigate('#signupView');
            });
            
            /* Blank textfield for forgot and login section.*/
            app.loginService.viewModel.blankForgotFld();
            app.loginService.viewModel.blankLoginFld();
            
        },
        
        checkEnter : function(e)
        {
            if(e.keyCode === 13)
            {
                $(e.target).blur();
                app.loginService.viewModel.loginValidation();
            }
        },
        
        
        // Validation Function for Login
        loginValidation : function()
        {
            var that = this,
                username = that.get('log_email'),
                password = that.get('log_pwd');
            
            var dataParam = [];
            
            if(username === "")
            {
                navigator.notification.confirm("Please Enter Username/Email",function(confirm){
                    if(confirm === 1 || confirm === '1')
                    {
                        $('#log_email').focus();
                    }
                },'Notification','OK');
                
                return;
            }
            
            if(password === "")
            {
                navigator.notification.confirm("Please Enter Password",function(confirm){
                    if(confirm === 1 || confirm === '1')
                    {
                        $('#log_pwd').focus();
                    }
                },'Notification','OK');
                
                return;
            }
            
            if(!window.connectionInfo.checkConnection())
            {
                navigator.notification.confirm("Internet Connection not found.",function(confirm){
                    if(confirm === 1 || confirm === '1')
                    {
                        app.loginService.viewModel.loginValidation();
                    }
                },'Connection Error?','Retry,Cancel');
            }
            else
            {
                dataParam['userName'] = username;
                dataParam['pass'] = password;
                app.loginService.viewModel.userLogin(dataParam);
            }
        },
        
        userLogin : function(data)
        {
            app.mobileApp.showLoading();
            var loginDataSource = new kendo.data.DataSource({
                transport:{
                    read:{
                        url:localStorage.getItem('login_API'),
                        type:'GET',
                        dataType:'JSON',
                        data:data
                    }
                },
                schema:{
                    data:function(data)
                    {
                        console.log("*****");
                        console.log(data);
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
            loginDataSource.fetch(function(){
                var data = this.data();
                console.log(data);
                if(data[0]['status'] === 0 || data[0]['status'] === '0')
                {
                    //navigator.notification.alert("Username/Password does not exist.",function () { }, "Notification", 'OK');
                    navigator.notification.alert(data[0]['msg'],function () { }, "Notification", 'OK');
                    app.mobileApp.hideLoading();
                } else if(data[0]['status'] === 2 || data[0]['status'] === '2')
                {
                    navigator.notification.alert("This account not activated! Please check your email for activate",function () { }, "Notification", 'OK');
                    app.mobileApp.hideLoading();
                }
                else
                {
                    app.loginService.viewModel.setUserLoginStatus(data[0]['UserData'][0]);
                    app.mobileApp.hideLoading();
                }
            });
        },
        
        setUserLoginStatus : function(data)
        {
            console.log(data);
            localStorage.setItem("login_status",1);
            localStorage.setItem("user_id",data['user_id']);
            localStorage.setItem("user_fname",data['firstName']);
            localStorage.setItem("user_lname",data['lastName']);
            localStorage.setItem("cb_member_dl",data['cb_member_dl']);
            localStorage.setItem("cb_member_priscription",data['cb_member_priscription']);
            localStorage.setItem("email",data['email']);
            localStorage.setItem("phoneNumber",data['phoneNumber']);
           // localStorage.setItem("userName",data['userName']);
            app.mobileApp.navigate('views/shop.html');
        },
        
        blankLoginFld : function()
        {
            this.set('log_email','');
            this.set('log_pwd','');
        },
        
        setUserLogout : function()
        {
            localStorage.setItem("login_status",0);
            localStorage.removeItem("user_id");
            localStorage.removeItem("user_fname");
            localStorage.removeItem("user_lname");
            localStorage.removeItem('email');
            localStorage.removeItem('phoneNumber');
            localStorage.removeItem("cb_member_dl");
            localStorage.removeItem("cb_member_priscription");
            localStorage.removeItem("userName");
            localStorage.removeItem('termsObject');
            localStorage.removeItem('privacyObject');
            localStorage.removeItem('prescription_fileEXT');
            localStorage.removeItem('licenseId_fileEXT');
            localStorage.removeItem('prescription');
            localStorage.removeItem('license_id');
            app.loginService.viewModel.blankLoginFld();
            app.mobileApp.navigate('views/login.html');
        },
        
        moveToForgetPwd:function()
        {
            app.mobileApp.navigate('#forgotpasswordView');
           // $('.footerLeft').css('background-color','#1A530C');
           // $('.footerRight').css('background-color','#1E9E01');
        },
        
        moveToRegister:function()
        {
            
        },
        
        /*Forgot Password Section*/
        submitforgotpwd:function()
        {
            var forgor_fld = this.get('forgotTextFld');
            var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            
            if(forgor_fld === "")
            {
                navigator.notification.alert("Please enter Email Address.",function () { }, "Notification", 'OK');
            }
            else if(!filter.test(forgor_fld))
            {
                navigator.notification.alert("Please Enter valid Email Address.",function(){},'Notification','OK');
            }
            else if(!window.connectionInfo.checkConnection())
            {
                navigator.notification.confirm("Internet Connection not found.",function(confirm){
                    if(confirm === 1 || confirm === '1')
                    {
                        app.loginService.viewModel.submitforgotpwd();
                    }
                },'Connection Error?','Retry,Cancel');
            }
            else
            {
                dataParam = [];
                dataParam['email'] = forgor_fld;
                app.loginService.viewModel.forgotPasswordAPI(dataParam);
            }
        },
        
        forgotPasswordAPI : function(data)
        {
            app.mobileApp.showLoading();
            var forgotDataSource = new kendo.data.DataSource({
                transport:{
                    read:{
                        url:localStorage.getItem('forgot_API'),
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
            forgotDataSource.fetch(function(){
                var data = this.data();
                if(data[0]['status'] === 0 || data[0]['status'] === '0')
                {
                    navigator.notification.alert("Email Id does not exist.",function () { }, "Password Recovery", 'OK');
                    app.mobileApp.hideLoading();
                }
                else
                {
                    navigator.notification.alert('Check your email. Password recovery email has been sent.',function () { }, "Password Recovery", 'OK');
                    app.mobileApp.navigate('#loginView');
                    app.mobileApp.hideLoading();
                }
            });
        },
        
        blankForgotFld : function()
        {
            this.set('forgotTextFld','');
        }
    });
    
    app.loginService = {
        viewModel:new loginViewMOdel()
    };
})(window);
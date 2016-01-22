(function(global){
    var signupViewModel,
        app = global.app = global.app || {};
    
    var dataParamSignup =[];
    
    signupViewModel = kendo.data.ObservableObject.extend({
        
        firstname:'',
        lastname:'',
        mobilenum:'',
        emailadd:'',
        username:'',
        userPwd:'',
        userCnfPwd:'',
        
        
        show:function()
        {
            $(".km-native-scroller").scrollTop(0);
            
            /* validation for registration step1 and registration step2 */
            $('#moveToRegisterStep1').unbind('.myPlugin');
            $('#moveToRegisterStep1').on('click.myPlugin',function(){
                app.signupService.viewModel.registrationStep1();
            });
            
            /* only numaric number enter means other fields will not be enter on the mobile number textbox*/
            $('#phonenum').keypress(function(e) {
                var valid = (e.which>=48 && e.which<=57)
                if(!valid)
                {
                    e.preventDefault();
                }
            });
            
            /*Get the image or docs from the mobile Device*/
            $('.licenceId').unbind('.myPlugin');
            $('.licenceId').on('click.myPlugin',function(){
                window.fileGet.storeLicenseID();
            });
            
            $('.prescroption').unbind('.myPlugin');
            $('.prescroption').on('click.myPlugin',function(){
                window.fileGet.storePrescription();
            });
            
            console.log(localStorage.getItem('backstatus'));
            if(localStorage.getItem('backstatus') === null || localStorage.getItem('backstatus') === 'null' || localStorage.getItem('backstatus') === 0 || localStorage.getItem('backstatus') === '0')
            {
                app.signupService.viewModel.resetSignupFld();  // club registration and account details field blank function
            } 
        },
        
        show2:function()
        {
            app.mobileApp.hideLoading();
            
            /*For check and uncheck the terms and condition*/
            $('#uncheck').show();
            $('#check').hide();
            $('#uncheck').unbind(".myPlugin");
            $('#uncheck').on('click.myPlugin',function(){
                $('#check').show();
                $(this).hide();
            });
            
            $('#check').unbind(".myPlugin");
            $('#check').on('click.myPlugin',function(){
                $('#uncheck').show();
                $(this).hide();
            });
            
            $('#signup').unbind('.myPlugin');
            $('#signup').on('click.myPlugin',function(){
                app.signupService.viewModel.registrationStep2();
            });
        },
        
        registrationStep1 : function()
        {
            var firstname = this.get('firstname'),
                lastname = this.get('lastname'),
                mobilenum = this.get('mobilenum'),
                emailAdd = this.get('emailadd');
            
            var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            
            if(firstname === "")
            {
                navigator.notification.alert("Please Enter Firstname.",function(){},'Notification','OK');
            }
            else
            if(lastname === "")
            {
                navigator.notification.alert("Please Enter Lastname.",function(){},'Notification','OK');
            }
            else
            if(mobilenum === "")
            {
                navigator.notification.alert("Please Enter Mobile Number.",function(){},'Notification','OK');
            }
            else
            if(mobilenum.toString().length !== 10 || mobilenum.toString().length === '10')
            {
                navigator.notification.alert("Please Enter 10 digit mobile Number.",function(){},'Notification','OK');
            }
            else
            if(emailAdd === "")
            {
                navigator.notification.alert("Please Enter Email Address.",function(){},'Notification','OK');
            }
            else
            if(!filter.test(emailAdd))
            {
                navigator.notification.alert("Please Enter valid Email Address.",function(){},'Notification','OK');
            }
            else
            if($('#licenceId').val() === "")
            {
                navigator.notification.alert("Please attach California Driver's License/ID.",function(){},'Notification','OK');
            }
            else
            if($('#prescroption').val() === "")
            {
                navigator.notification.alert("Please attach Prescription.",function(){},'Notification','OK');
            }
            else
            {   
                app.mobileApp.showLoading();
                dataParamSignup['firstName'] = firstname,
                dataParamSignup['lastName'] = lastname,
                dataParamSignup['phone'] = mobilenum,
                dataParamSignup['emailid'] = emailAdd;
                dataParamSignup['driving_licence'] = localStorage.getItem('license_id');
                dataParamSignup['ext_dl'] = localStorage.getItem('licenseId_fileEXT');
                dataParamSignup['prescription'] = localStorage.getItem('prescription');
                dataParamSignup['ext_pr'] = localStorage.getItem('prescription_fileEXT');
                localStorage.setItem('backstatus','1');
                setTimeout(function(){
                    app.mobileApp.navigate('#signupView2'); ///-----------------------------------------    
                },3000);
            }
        },
        
        registrationStep2:function()
        {
            var username = this.get('username'),
                password = this.get('userPwd'),
                confpassword = this.get('userCnfPwd');
            
            if(username === "")
            {
                 navigator.notification.alert("Please Enter Username.",function(){},'Notification','OK');
            }
            else
            if(password === "")
            {
                 navigator.notification.alert("Please Enter Password.",function(){},'Notification','OK');
            }
            else
            if(confpassword === "")
            {
                navigator.notification.alert("Please Enter Confirm Password.",function(){},'Notification','OK');
            }
            else
            if(confpassword !== password)
            {
                 navigator.notification.alert("Enter Password does not match.",function(){},'Notification','OK');
            }
            else
            if($('#check').css('display') === 'none')
            {
                navigator.notification.alert("Please check the terms & condition.",function(){},'Notification','OK');
            }
            else
            {
                dataParamSignup['username'] = username;
                dataParamSignup['pass'] = password;
               // app.mobileApp.navigate('views/shop.html');
                app.signupService.viewModel.registrationAPI(dataParamSignup);
            }
        },
        
        registrationAPI : function(data)
        {
            app.mobileApp.showLoading();
            var signupDataS = new kendo.data.DataSource({
                transport:{
                    read:{
                        url:localStorage.getItem('registration_API'),
                        type:'POST',
                        dataType:'json',
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
                    console.log(e);
                    navigator.notification.alert("Server not responding properly.Please check your internet connection.",
                        function () { }, "Message", 'OK');
                }
            });
            signupDataS.fetch(function(){
                var data = this.data();
                app.mobileApp.hideLoading();
                console.log(data);
                if(data[0]['status'] === '1' || data[0]['status'] === 1)
                {
                    navigator.notification.alert(data[0]['msg'],function(){},'Signup',"OK");
                    app.signupService.viewModel.resetSignupFld();
                    app.mobileApp.navigate('#loginView');
                }
                else
                {
                     navigator.notification.alert(data[0]['msg'],function () { }, "Message", 'OK');
                }
            });
        },
        
        resetSignupFld : function()
        {
            this.set('firstname','');
            this.set('lastname','');
            this.set('mobilenum','');
            this.set('emailadd','');
            this.set('username','');
            this.set('userPwd','');
            this.set('userCnfPwd','');
            localStorage.removeItem('license_id');
            localStorage.removeItem('licenseId_fileEXT');
            localStorage.removeItem('prescription');
            localStorage.removeItem('prescription_fileEXT');
            localStorage.setItem('backstatus','0');
            $('#licenceId').val('');
            $('#prescroption').val('');
        }
    });
    
    app.signupService = {
        viewModel:new signupViewModel()
    };
})(window);
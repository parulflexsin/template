var app = (function(){
    
    var onBackKeyDown = function(e)
    {
        if(mobileApp.view()['element']['0']['id']==='shopView')
        {
            e.preventDefault();
            navigator.notification.confirm('You want to exit App',function(confirm){
                if(confirm === 1 || confirm === '1')
                {
                    navigator.app.exitApp();
                }
            },'Notification',"Yes,No");
        }
        else if(mobileApp.view()['element']['0']['id']==='loginView')
        {
            navigator.app.exitApp();
        }
        else
        {
            mobileApp.navigate('#:back');
        }
    }
    
    var onDeviceReady = function()
    {
        navigator.splashscreen.hide();
        
        window.connectionInfo = new connectionApp();
        window.fileGet = new getFileApplication();
        document.addEventListener('backbutton',onBackKeyDown,false);
        
        if (device.platform === 'iOS' && parseFloat(device.version) >= 7.0) 
        {                    
            StatusBar.overlaysWebView(false);
            StatusBar.backgroundColorByHexString('#23A505');
        } 
    };
    
    function connectionApp()
    {}
    
    connectionApp.prototype = {
        checkConnection : function()
        {
            if(typeof navigator.connection.type !== "undefined")
            {
                var networkState = navigator.connection.type;
                var states = {};
                states[Connection.UNKNOWN] = 'Unknown connection';
                states[Connection.ETHERNET] = 'Ethernet connection';
                states[Connection.WIFI] = 'WiFi connection';
                states[Connection.CELL_2G] = 'Cell 2G connection';
                states[Connection.CELL_3G] = 'Cell 3G connection';
                states[Connection.CELL_4G] = 'Cell 4G connection';
                states[Connection.CELL] = 'Cell generic connection';
                states[Connection.NONE] = 'No network connection';
                if (states[networkState] === 'No network connection') {
                    return false;
                }
            }
            return true;
        }
    }
    
    function getFileApplication() {}
    
    getFileApplication.prototype = {
        storeLicenseID:function()
        {
            /*navigator.camera.getPicture(
            uploadPhoto,
            function(message) {
                alert('Failed to get a picture');
            }, {
                quality         : 50,
                destinationType : navigator.camera.DestinationType.FILE_URI,
                sourceType      : navigator.camera.PictureSourceType.PHOTOLIBRARY,
                mediaType: navigator.camera.MediaType.ALLMEDIA 
            });

            function uploadPhoto(fileURI) {
                var re = /(?:\.([^.]+))?$/;
                var ext = re.exec(fileURI)[1]
                alert(fileURI);
                alert(ext);
                console.log(window.btoa(fileURI));
                localStorage.setItem('fileURL',fileURI);
                $('#testimg').attr('src','data:image/png;base64,'+window.btoa(fileURI));

                var options = new FileUploadOptions();
                options.fileKey = "file";
                options.fileName = fileURI.substr(fileURI.lastIndexOf('/') + 1);
                if (cordova.platformId == "android") 
                {
                    if(ext == 'pdf' || ext == 'docx')
                    {

                    }
                    else
                    {
                        //options.fileName += ".jpg"         
                    }
                }

                alert(options.fileName);
                options.mimeType = "application/octet-stream";
                options.params = {}; // if we need to send parameters to the server request 
                options.headers = {
                Connection: "Close"
            };
                options.chunkedMode = false;
                alert(JSON.stringify(options));
            }*/
            
            navigator.camera.getPicture(onSuccess,onFail,{
                quality:50,
                destinationType :Camera.DestinationType.FILE_URI,
                sourceType      : Camera.PictureSourceType.SAVEDPHOTOALBUM,
                mediaType: Camera.MediaType.ALLMEDIA 
            });
            
            function onSuccess(imageData)
            {
                var re = /(?:\.([^.]+))?$/;
                var ext = re.exec(imageData)[1];
                var base64Data = window.btoa(imageData);
                localStorage.setItem('license_id',base64Data);
                console.log(localStorage.getItem('license_id'));
                localStorage.setItem('licenseId_fileEXT',ext);
                var filename = imageData.substr(imageData.lastIndexOf('/') + 1);
                $('.licenceId').val(filename);
            }
            
            function onFail(message)
            {
                console.log(message);
            }
        },
        
        storePrescription : function()
        {
            navigator.camera.getPicture(onSuccess,onFail,{
                quality:50,
                destinationType :Camera.DestinationType.FILE_URI,
                sourceType      : Camera.PictureSourceType.SAVEDPHOTOALBUM,
                mediaType: Camera.MediaType.ALLMEDIA 
            });
            
            function onSuccess(imageData)
            {
                //var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/\r\n/g,"\n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}
               // var a = Base64.encode(imageData);
               // alert(a);
                var re = /(?:\.([^.]+))?$/;
                var ext = re.exec(imageData)[1];
                var base64Data = window.btoa(imageData);
                localStorage.setItem('prescription',base64Data);
                console.log(localStorage.getItem('prescription'));
                localStorage.setItem('prescription_fileEXT',ext);
                var filename = imageData.substr(imageData.lastIndexOf('/') + 1);
                $('.prescroption').val(filename);
            }
            
            function onFail(message)
            {
                console.log(message);
            }
        }
    }
    
    if(localStorage.getItem('login_status') === 0 || localStorage.getItem('login_status') === '0' || localStorage.getItem('login_status') === null)
    {
        mobileApp = new kendo.mobile.Application(document.body,
                                                            {
                                                                skin:'flat',
                                                                initial:'views/login.html'
                                                            }
        );
    }
    else
    {
        mobileApp = new kendo.mobile.Application(document.body,
                                                            {
                                                                skin:'flat',
                                                                initial:'views/shop.html'
                                                            }
        );
    }
    
    
    document.addEventListener('deviceready',onDeviceReady,false);
    
    /* ALL WEB SERVICE STORE IN THE LOCAL STORAGE*/
    localStorage.setItem('login_API','http://wordpress2014:Flexsin_2020@flexsin.org/lab/wordpress/cannibalsonline/conAPI/login.php');
    localStorage.setItem('forgot_API','http://wordpress2014:Flexsin_2020@flexsin.org/lab/wordpress/cannibalsonline/conAPI/Forget.php');
    localStorage.setItem('changePwd_API','http://wordpress2014:Flexsin_2020@flexsin.org/lab/wordpress/cannibalsonline/conAPI/Change_Password.php');
    localStorage.setItem('registration_API','http://wordpress2014:Flexsin_2020@flexsin.org/lab/wordpress/cannibalsonline/conAPI/Registration.php');
    
    // http://wordpress2014:Flexsin_2020@flexsin.org/lab/wordpress/cannibalsonline/conAPI/Products.php?post_per_page=&category=24&offset=
    localStorage.setItem('productlist_API','http://wordpress2014:Flexsin_2020@flexsin.org/lab/wordpress/cannibalsonline/conAPI/Products.php');
    localStorage.setItem('aboutus_API','http://wordpress2014:Flexsin_2020@flexsin.org/lab/wordpress/cannibalsonline/conAPI/About.php');
    localStorage.setItem('aboutus_API2','http://wordpress2014:Flexsin_2020flexsin.org/lab/wordpress/cannibalsonline/conAPI/Pages.php?name=About');
    localStorage.setItem('contact_API','http://wordpress2014:Flexsin_2020@flexsin.org/lab/wordpress/cannibalsonline/conAPI/Contact.php');
    localStorage.setItem('privacy_API','http://wordpress2014:Flexsin_2020@flexsin.org/lab/wordpress/cannibalsonline/conAPI/Pages.php?name=Privacy');
    localStorage.setItem('terms&condition_API','http://wordpress2014:Flexsin_2020@flexsin.org/lab/wordpress/cannibalsonline/conAPI/Pages.php?name=Terms');
    localStorage.setItem('editProfile_API','http://wordpress2014:Flexsin_2020@flexsin.org/lab/wordpress/cannibalsonline/conAPI/Edit_Profile.php');
    localStorage.setItem('event_API','http://wordpress2014:Flexsin_2020@flexsin.org/lab/wordpress/cannibalsonline/conAPI/Events.php');
    
    localStorage.setItem('gallery1_API','http://wordpress2014:Flexsin_2020@flexsin.org/lab/wordpress/cannibalsonline/conAPI/Gallery.php?post_per_page=&category=cat-one&offset=0');
    localStorage.setItem('gallery2_API','http://wordpress2014:Flexsin_2020@flexsin.org/lab/wordpress/cannibalsonline/conAPI/Gallery.php?post_per_page=&category=cat-two&offset=0');
    localStorage.setItem('gallery3_API','http://wordpress2014:Flexsin_2020@flexsin.org/lab/wordpress/cannibalsonline/conAPI/Gallery.php?post_per_page=&category=cat-three&offset=0');
    
    localStorage.setItem('shoping_API','http://wordpress2014:Flexsin_2020@flexsin.org/lab/wordpress/cannibalsonline/conAPI/View_cart.php');
    
    localStorage.setItem('getCategories_API','http://wordpress2014:Flexsin_2020@flexsin.org/lab/wordpress/cannibalsonline/conAPI/getCategories.php');
    localStorage.setItem('clone_API','http://wordpress2014:Flexsin_2020@flexsin.org/lab/wordpress/cannibalsonline/conAPI/Clone.php');
    localStorage.setItem('addtocart_API','http://wordpress2014:Flexsin_2020@flexsin.org/lab/wordpress/cannibalsonline/conAPI/Cart.php');
    localStorage.setItem('placeorder_API','http://wordpress2014:Flexsin_2020@flexsin.org/lab/wordpress/cannibalsonline/conAPI/placeOrder.php');
    
    return{
        mobileApp:mobileApp
    }

}(window));
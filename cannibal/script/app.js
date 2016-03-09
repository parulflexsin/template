var app = (function(){
    
   
    var onDeviceReady = function()
    {
        navigator.splashscreen.hide();
        
    };
    
    mobileApp = new kendo.mobile.Application(document.body,
                                        {
                                            skin:'flat',
                                            initial:'views/login.html'
                                        }
    );
    
    document.addEventListener('deviceready',onDeviceReady,false);
    
    
    return{
        mobileApp:mobileApp
    }

}(window));
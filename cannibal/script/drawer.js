(function(global){
    var drawerViewModel,
        app = global.app =global.app || {};
    
    drawerViewModel = kendo.data.ObservableObject.extend({
        
        show:function()
        {
            
        },
        
        moveToProfile:function()
        {
            app.mobileApp.navigate('views/myprofile.html');
        },
        
        moveToContactus:function()
        {
            app.mobileApp.navigate('views/contact.html');
        },
        
        moveToAboutus:function()
        {
           app.mobileApp.navigate('views/aboutus.html');
        },
        
        moveToLogout:function()
        {
            app.loginService.viewModel.setUserLogout();
        },
        
        moveToShop:function()
        {
            app.mobileApp.navigate('views/shop.html');
        },
        
        moveToShoppingCart:function()
        {
            app.mobileApp.navigate('views/mycart.html');
        },
        
        moveToClones:function()
        {
            app.mobileApp.navigate('views/clones.html');
        },
        
        moveToSpecials:function()
        {
            app.mobileApp.navigate('views/special.html');
        },
        
        moveToGallery:function()
        {
           app.mobileApp.navigate('views/gallery.html');
        },
        
        moveToPrivacyPloicy:function()
        {
            app.mobileApp.navigate('views/privacy_policy.html');
        },
        
        moveToTerms_Condition:function()
        {
            app.mobileApp.navigate('views/terms_condition.html');
        },
        
        moveToInviteFriend:function()
        {
            app.mobileApp.navigate('views/invite_friend.html');
        },
        
        moveToPastorder:function()
        {
            app.mobileApp.navigate('views/past_order.html');
        },
        
        moveToRateapp:function()
        {
            //alert("Rate the App");
            //app.mobileApp.navigate('views/productDetail.html?id=2456');
        },
        moveToEvent:function()
        {
           //console.log("moveToEvent");
           app.mobileApp.navigate('views/event.html');
        }
        
        
    });
    
    app.drawerService = {
        viewModel:new drawerViewModel()
    };
})(window);
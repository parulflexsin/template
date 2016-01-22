(function(global){
    var privacyViewModel,
        app = global.app = global.app || {};
    
    privacyViewModel = kendo.data.ObservableObject.extend({
        
        privacyDataSource:'',
        
        show:function()
        {
            $('#privacy_policy_wrapper').html(''); 
            if(localStorage.getItem('privacyObject') === null || localStorage.getItem('privacyObject') === 'null')
            {
               app.privacyService.viewModel.privacyAPICall();     
            }
            else
            {
                var data = JSON.parse(localStorage.getItem('privacyObject'))
                app.privacyService.viewModel.setPrivacyData(data);    
            }
           
        },
        
        privacyAPICall : function()
        {
           app.mobileApp.showLoading();
            var privacyData = new kendo.data.DataSource({
                transport:{
                    read:{
                        url:localStorage.getItem('privacy_API'),
                        type:'GET',
                        dataType:'JSON'
                    }
                },
                schema:{
                    data:function(data)
                    {
                        return [data];
                    }
                },
                error:function()
                {
                    app.mobileApp.hideLoading();
                    navigator.notification.alert("Server not responding properly.Please check your internet connection.",function(){},'Message','OK');
                }
            });
            privacyData.fetch(function(){
                var data = this.data();
                
                if(data[0]['status'] === "1" || data[0]['status'] === 1)
                {
                    app.mobileApp.hideLoading();
                    var privacyobject = {'title':data[0]['data']['title'],'content':data[0]['data']['content']};
                    localStorage.setItem('privacyObject',JSON.stringify(privacyobject));
                    app.privacyService.viewModel.setPrivacyData(data[0]['data']);
                }
                else
                {
                    app.mobileApp.hideLoading();
                    navigator.notification.alert("Server not responding properly.Please check your internet connection.",function(){},'Message','OK');
                }
                
            });
        },
        
        setPrivacyData:function(data)
        {
            this.set('privacyDataSource',data);
        }
    });
    app.privacyService = {
        viewModel:new privacyViewModel()
    }
})(window);
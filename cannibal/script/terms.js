(function(global){
    var termsViewModel,
        app = global.app = global.app || {};
    
    termsViewModel = kendo.data.ObservableObject.extend({
       
        termsDataSource:'',
        
        show:function()
        {
            if(localStorage.getItem('termsObject') === null || localStorage.getItem('termsObject') === 'null')
            {
               app.termService.viewModel.termsconditionAPI();    
            }
            else
            {
                var data = JSON.parse(localStorage.getItem('termsObject'))
                app.termService.viewModel.setTermsData(data);    
            }
            
            // Fot show cart count
            app.cartService.viewModel.htmlCreate();
            
        },
        termsconditionAPI : function()
        {
            app.mobileApp.showLoading();
            var termsData = new kendo.data.DataSource({
                transport:{
                    read:{
                        url:localStorage.getItem('terms&condition_API'),
                        dataType:'JSON',
                        type:'GET'
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
                    navigator.notification.alert("Server not responding properly.Please check your internet connection.",function(){},'Message','OK');
                }
            });
            termsData.fetch(function(){
                var data = this.data();
                console.log(data);
                if(data[0]['status'] === 1 || data[0]['status'] === '1')
                {
                    app.mobileApp.hideLoading();
                    var termsobject = {'title':data[0]['data']['title'],'content':data[0]['data']['content']};
                    localStorage.setItem('termsObject',JSON.stringify(termsobject));
                    app.termService.viewModel.setTermsData(data[0]['data']);
                }
                else
                {
                    app.mobileApp.hideLoading();
                     navigator.notification.alert("Server not responding properly.Please check your internet connection.",function(){},'Message','OK');
                }
                console.log(data);
            });
        },
        
        setTermsData:function(data)
        {
            this.set('termsDataSource',data);
        }
    });
    app.termService = {
        viewModel : new termsViewModel()
    };
})(window);
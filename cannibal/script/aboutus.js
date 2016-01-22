(function(global){
    var aboutViewModel,
        app = global.app = global.app || {};
    
    aboutViewModel = kendo.data.ObservableObject.extend({
        
        aboutusListSource:'',
        
        show:function()
        {
            app.about.viewModel.aboutUsAPI();
            $('#dataNew').html('');
        },
        
        aboutUsAPI : function()
        {
            app.mobileApp.showLoading();
            var aboutData = new kendo.data.DataSource({
                transport:{
                    read:{
                        url:localStorage.getItem('aboutus_API'),
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
                    console.log(e);
                    app.mobileApp.hideLoading();
                    navigator.notification.alert("Server not responding properly.Please check your internet connection.",function(){},'Message','OK');
                }
            });
            aboutData.fetch(function(){
                var data = this.data();
                app.mobileApp.hideLoading();
                console.log(data[0]);
                console.log(data[0]['data']['data']);
                //this.set('aboutusListSource',data[0]['data']['data']);
                app.about.viewModel.setAbiutusData(data[0]['data']);
            });
        },
        
        setAbiutusData : function(data)
        {
            //this.set('aboutusListSource',data);
            $('#dataNew').html(data['data']);
        },
        
        location1:function()
        {
            alert("location one");
        },
        
        location2:function()
        {
            alert("location two");
        }
    });
    
    app.about = {
        viewModel:new aboutViewModel()
    }
})(window);
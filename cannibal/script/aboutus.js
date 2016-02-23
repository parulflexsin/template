(function(global){
    var aboutViewModel,
        app = global.app = global.app || {};
    
    aboutViewModel = kendo.data.ObservableObject.extend({
        
        aboutusListSource:'',
        
        show:function()
        {
            //app.about.viewModel.aboutUsAPI();
            app.about.viewModel.setAbiutusData();
            
            //$('#dataNew').html('');
            
            // For show count of my cart
            app.cartService.viewModel.htmlCreate();
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
                //console.log(data[0]);
                //console.log(data[0]['data']['data']);
                //this.set('aboutusListSource',data[0]['data']['data']);
                app.about.viewModel.setAbiutusData(data[0]['data']);
            });
        },
        
        aboutUsAPI2 : function()
        {
            app.mobileApp.showLoading();
            var aboutData = new kendo.data.DataSource({
                transport:{
                    read:{
                        url:localStorage.getItem('aboutus_API2'),
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
                console.log(data[0]['data']['content']);
                //this.set('aboutusListSource',data[0]['data']['data']);
                app.about.viewModel.setAbiutusData2(data[0]['data']);
            });
        },
        
        setAbiutusData : function(data)
        {
            console.log("location one");
            var loc = '<a href=\"http:\/\/www.cannibalsonline.com\/cannibalsonline\/wp-content\/uploads\/2014\/10\/IMG_1588.jpg\"><img class=\"aligncenter wp-image-988 size-large\" src=\"http:\/\/www.cannibalsonline.com\/cannibalsonline\/wp-content\/uploads\/2014\/10\/IMG_1588-1024x307.jpg\" alt=\"IMG_1588\" width=\"600\" height=\"179\" \/><\/a><h2 style=\"text-align: center;\">Call Us: (661) 393-9333<\/h2><p style=\"text-align: center;\"><iframe src=\"https:\/\/www.google.com\/maps\/embed?pb=!1m14!1m8!1m3!1d3254.1197919058636!2d-119.05577380000001!3d35.352673300000006!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80ea41fac607886f%3A0xcdbf2104b3fee23c!2s221+S+Montclair+%2C+Cannibals%2C+Bakersfield%2C+CA+93309!5e0!3m2!1sen!2sus!4v1411326325955\" width=\"600\" height=\"450\" frameborder=\"0\"><\/iframe><\/p><hr \/><p style=\"text-align: center;\"><strong>HOURS OF OPERATION<\/strong><\/p><div class=\"row hours-row\" style=\"text-align: center;\"><div class=\"col-md-3\">SUNDAY\u00a0<strong>10:00am\u00a0-\u00a04:00pm<\/strong><\/div><\/div><div class=\"row hours-row\" style=\"text-align: center;\"><div class=\"col-md-3\">MONDAY\u00a0<strong>9:00am\u00a0- 8:00pm<\/strong><\/div><\/div><div class=\"row hours-row\" style=\"text-align: center;\"><div class=\"col-md-3\">TUESDAY\u00a0<strong>9:00am\u00a0- 8:00pm<\/strong><\/div><\/div><div class=\"row hours-row\" style=\"text-align: center;\"><div class=\"col-md-3\">WEDNESDAY\u00a0<strong>9:00am\u00a0- 8:00pm<\/strong><\/div><\/div><div class=\"row hours-row\" style=\"text-align: center;\"><div class=\"col-md-3\">THURSDAY\u00a0<strong>9:00am\u00a0- 8:00pm<\/strong><\/div><\/div><div class=\"row hours-row\" style=\"text-align: center;\"><div class=\"col-md-3\">FRIDAY\u00a0<strong>9:00am\u00a0- 8:00pm<\/strong><\/div><\/div><div class=\"row hours-row\" style=\"text-align: center;\"><div class=\"col-md-3\">SATURDAY\u00a0<strong>9:00am\u00a0-\u00a08:00pm<\/strong><\/div><\/div><hr \/><p style=\"text-align: center;\"><strong>Rate us on WeedMaps:\u00a0<a href=\"https:\/\/weedmaps.com\/dispensaries\/california\/bakersfield\/cannibals\" target=\"_blank\">Click Here...<\/a><\/strong><\/p><hr \/>';
            
            //this.set('aboutusListSource',data);
            //$('#dataNew').html(data['data']);
            $('#dataNew').html(loc);
        },
        
        setAbiutusData2 : function(data)
        {
            //this.set('aboutusListSource',data);
            $('#dataNew').html(data['content']);
        },
        
        location1:function()
        {
            app.about.viewModel.setAbiutusData();
            //alert("location one");
            //app.about.viewModel.aboutUsAPI();
            //$('#dataNew').html('');
        },
        
        location2:function()
        {
            console.log("location two");
            var dummy = '<a href=\"http:\/\/www.cannibalsonline.com\/cannibalsonline\/wp-content\/uploads\/2014\/10\/IMG_1588.jpg\"><img class=\"aligncenter wp-image-988 size-large\" src=\"http:\/\/www.cannibalsonline.com\/cannibalsonline\/wp-content\/uploads\/2014\/10\/IMG_1588-1024x307.jpg\" alt=\"IMG_1588\" width=\"600\" height=\"179\" \/><\/a><h2 style=\"text-align: center;\">Call Us: (661) 393-9333<\/h2><p style=\"text-align: center;\"><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3253.8584374168654!2d-118.91726968532338!3d35.35915935517628!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80ea6c57d2d94841%3A0x732de2c5c8894290!2s110+Morning+Dr%2C+Bakersfield%2C+CA+93306%2C+USA!5e0!3m2!1sen!2sin!4v1454659969237" width="600" height="450" frameborder="0" style="border:0" allowfullscreen></iframe><\/p><hr \/><p style=\"text-align: center;\"><strong>HOURS OF OPERATION<\/strong><\/p><div class=\"row hours-row\" style=\"text-align: center;\"><div class=\"col-md-3\">SUNDAY\u00a0<strong>10:00am\u00a0-\u00a04:00pm<\/strong><\/div><\/div><div class=\"row hours-row\" style=\"text-align: center;\"><div class=\"col-md-3\">MONDAY\u00a0<strong>9:00am\u00a0- 8:00pm<\/strong><\/div><\/div><div class=\"row hours-row\" style=\"text-align: center;\"><div class=\"col-md-3\">TUESDAY\u00a0<strong>9:00am\u00a0- 8:00pm<\/strong><\/div><\/div><div class=\"row hours-row\" style=\"text-align: center;\"><div class=\"col-md-3\">WEDNESDAY\u00a0<strong>9:00am\u00a0- 8:00pm<\/strong><\/div><\/div><div class=\"row hours-row\" style=\"text-align: center;\"><div class=\"col-md-3\">THURSDAY\u00a0<strong>9:00am\u00a0- 8:00pm<\/strong><\/div><\/div><div class=\"row hours-row\" style=\"text-align: center;\"><div class=\"col-md-3\">FRIDAY\u00a0<strong>9:00am\u00a0- 8:00pm<\/strong><\/div><\/div><div class=\"row hours-row\" style=\"text-align: center;\"><div class=\"col-md-3\">SATURDAY\u00a0<strong>9:00am\u00a0-\u00a08:00pm<\/strong><\/div><\/div><hr \/><p style=\"text-align: center;\"><strong>Rate us on WeedMaps:\u00a0<a href=\"https:\/\/weedmaps.com\/dispensaries\/california\/bakersfield\/cannibals\" target=\"_blank\">Click Here...<\/a><\/strong><\/p><hr \/>';
            $('#dataNew').html(dummy);
            
            /*app.about.viewModel.aboutUsAPI2();
            $('#dataNew').html('');
            */
        }
    });
    
    app.about = {
        viewModel:new aboutViewModel()
    }
})(window);
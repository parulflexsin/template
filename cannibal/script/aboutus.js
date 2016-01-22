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
            //alert("location one");
            app.about.viewModel.aboutUsAPI();
            $('#dataNew').html('');
        },
        
        location2:function()
        {
            //alert("location two");
            var dummy = '<a href=\"http://www.cannibalsonline.com/cannibalsonline/wp-content/uploads/2014/10/IMG_1588.jpg\"><img class=\"aligncenter wp-image-988 size-large\" src=\"http://www.cannibalsonline.com/cannibalsonline/wp-content/uploads/2014/10/IMG_1588-1024x307.jpg\" alt=\"IMG_1588\" width=\"600\" height=\"179\" /></a><h2 style=\"text-align: center;\">(661) 393-9333</h2><p style=\"text-align: center;\"><iframe src=\"https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3254.1197919058636!2d-119.05577380000001!3d35.352673300000006!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80ea41fac607886f%3A0xcdbf2104b3fee23c!2s221+S+Montclair+St%2C+Cannibals%2C+Bakersfield%2C+CA+93309!5e0!3m2!1sen!2sus!4v1411326325955\" width=\"600\" height=\"450\" frameborder=\"0\"></iframe></p><hr /><p style=\"text-align: center;\"><strong>HOURS OF OPERATION</strong></p><div class=\"row hours-row\" style=\"text-align: center;\"><div class=\"col-md-3\">SUNDAY <strong>02:00am - 8:00pm</strong></div></div><div class=\"row hours-row\" style=\"text-align: center;\"><div class=\"col-md-3\">MONDAY <strong>10:00am - 7:00pm</strong></div></div><div class=\"row hours-row\" style=\"text-align: center;\"><div class=\"col-md-3\">TUESDAY <strong>10:00am - 7:00pm</strong></div></div><div class=\"row hours-row\" style=\"text-align: center;\"><div class=\"col-md-3\">WEDNESDAY <strong>10:00am - 7:00pm</strong></div></div><div class=\"row hours-row\" style=\"text-align: center;\"><div class=\"col-md-3\">THURSDAY <strong>10:00am - 7:00pm</strong></div></div><div class=\"row hours-row\" style=\"text-align: center;\"><div class=\"col-md-3\">FRIDAY <strong>10:00am - 7:00pm</strong></div></div><div class=\"row hours-row\" style=\"text-align: center;\"><div class=\"col-md-3\">SATURDAY <strong>10:00am - 7:00pm</strong></div></div><hr /><p style=\"text-align: center;\"><strong>Rate us on WeedMaps: <a href=\"https://weedmaps.com/dispensaries/california/bakersfield/cannibals\" target=\"_blank\">Click Here...</a></strong></p><hr />';
            $('#dataNew').html(dummy);
        }
    });
    
    app.about = {
        viewModel:new aboutViewModel()
    }
})(window);
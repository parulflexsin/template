(function(global){
    var galleryViewModel,
        app = global.app = global.app || {};
    
    galleryViewModel = kendo.data.ObservableObject.extend({
        
        tab1ListSource:'',
        tab2ListSource:'',
        tab3ListSource:'',
        
        show:function()
        {
            var data1 = [{id:'1',prodImg:'style/slideImage/gallery_img1.png'},{id:'2',prodImg:'style/slideImage/gallery_img.png'},{id:'3',prodImg:'style/slideImage/gallery_img1.png'}];
            var data2 = [{id:'1',prodImg:'style/slideImage/gallery_img.png'},{id:'2',prodImg:'style/slideImage/gallery_img1.png'}];

            $("#galleryTab1").css('border-bottom','4px solid #23A505');
            $("#galleryTab2").css('border-bottom','0px solid #23A505');
            
            
            app.galleryService.viewModel.getTabView1data();
            
            //app.galleryService.viewModel.setTabView1data(data1);
            $('#galleryView .wrapper .tab1View').show();
            $('#galleryView .wrapper .tab2View').hide();
            
            $('#galleryTab1').unbind('.myPlugin');
            $('#galleryTab1').on('click.myPlugin',function(){
                $(this).css('border-bottom','4px solid #23A505');
                
                $("#galleryTab2").css('border-bottom','0px solid #23A505');
                $("#galleryTab3").css('border-bottom','0px solid #23A505');
                //app.galleryService.viewModel.setTabView1data(data1);
                app.galleryService.viewModel.getTabView1data();
                
                $('#galleryView .wrapper .tab1View').show();
                $('#galleryView .wrapper .tab2View').hide();
                $('#galleryView .wrapper .tab3View').hide();
            });

            $('#galleryTab2').unbind('.myPlugin');
            $('#galleryTab2').on('click.myPlugin',function(){
                $(this).css('border-bottom','4px solid #23A505');
                
                $("#galleryTab1").css('border-bottom','0px solid #23A505');
                $("#galleryTab3").css('border-bottom','0px solid #23A505');
                //app.galleryService.viewModel.setTabView2data(data2);
                app.galleryService.viewModel.getTabView2data();
                
                $('#galleryView .wrapper .tab1View').hide();
                $('#galleryView .wrapper .tab2View').show();
                $('#galleryView .wrapper .tab3View').hide();
            });
            
            $('#galleryTab3').unbind('.myPlugin');
            $('#galleryTab3').on('click.myPlugin',function(){
                $(this).css('border-bottom','4px solid #23A505');
                
                $("#galleryTab1").css('border-bottom','0px solid #23A505');
                $("#galleryTab2").css('border-bottom','0px solid #23A505');
                //app.galleryService.viewModel.setTabView3data(data1);
                
                app.galleryService.viewModel.getTabView3data();
                $('#galleryView .wrapper .tab1View').hide();
                $('#galleryView .wrapper .tab2View').hide();
                $('#galleryView .wrapper .tab3View').show();
            });
            
            // For show count of my cart
            app.cartService.viewModel.htmlCreate();
        },
        
        getTabView1data : function(){
            app.mobileApp.showLoading();
            var tab1DataSource = new kendo.data.DataSource({
                transport:{
                    read:{
                        url:localStorage.getItem('gallery1_API'),
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
                error:function(e)
                {
                    console.log(e);
                    app.mobileApp.hideLoading();
                    if (e.xhr.status == 401) {
                        navigator.notification.alert("Failed to load image (Authorization Required).",
                            function () { }, "Message", 'OK');
                    }else{
                        navigator.notification.alert("Server not responding properly.Please check your internet connection.",
                            function () { }, "Message", 'OK');
                    }
                }
            });
            tab1DataSource.fetch(function(){
                var data = this.data();
                //console.log(data);
                var arrdata1 = '';
                var i = 1;
                if(data[0]['status'] === 0 || data[0]['status'] === '0')
                {
                    navigator.notification.alert(data[0]['msg'],function () { }, "Error", 'OK');
                    app.mobileApp.hideLoading();
                }
                else
                {
                    //console.log(data[0]['data']);
                    $.each(data[0]['data'], function(key, value){
                        
                        if(key ==  i){
                            //console.log("Image url : "+value.img_url);
                            arrdata1 += '<div class="main"><a data-role="button" data-click="openModalView">\
                                <img src="'+value.img_url+'" style="width:100%;height:100%"/>\
                            </a></div>';
                        }
                        i++;
                    });
                    $("#tab1ListData").html(arrdata1);
                    //app.galleryService.viewModel.setTabView1data(arr1);
                    app.mobileApp.hideLoading();
                }
            });  
        },
        
        getTabView2data : function(){
            app.mobileApp.showLoading();
            var tab2DataSource = new kendo.data.DataSource({
                transport:{
                    read:{
                        url:localStorage.getItem('gallery2_API'),
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
                error:function(e)
                {
                    app.mobileApp.hideLoading();
                    if (e.xhr.status == 401) {
                        navigator.notification.alert("Failed to load image (Authorization Required).",
                            function () { }, "Message", 'OK');
                    }else{
                        navigator.notification.alert("Server not responding properly.Please check your internet connection.",
                            function () { }, "Message", 'OK');
                    }
                }
            });
            tab2DataSource.fetch(function(){
                var data = this.data();
                //console.log(data);
                var arrdata1 = '';
                var i = 1;
                if(data[0]['status'] === 0 || data[0]['status'] === '0')
                {
                    navigator.notification.alert(data[0]['msg'],function () { }, "Error", 'OK');
                    app.mobileApp.hideLoading();
                }
                else
                {
                    //console.log(data[0]['data']);
                    $.each(data[0]['data'], function(key, value){
                        
                        if(key ==  i){
                            console.log("Image url : "+value.img_url);
                            arrdata1 += '<div class="main"><a data-role="button" data-click="openModalView">\
                                <img src="'+value.img_url+'" style="width:100%;height:100%"/>\
                            </a></div>';
                        }
                        i++;
                    });
                    $("#tab2ListData").html(arrdata1);
                    //app.galleryService.viewModel.setTabView1data(arr1);
                    app.mobileApp.hideLoading();
                }
            });
        },
        
        
        getTabView3data : function(){
            app.mobileApp.showLoading();
            var tab3DataSource = new kendo.data.DataSource({
                transport:{
                    read:{
                        url:localStorage.getItem('gallery3_API'),
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
                error:function(e)
                {
                    if (e.xhr.status == 401) {
                        navigator.notification.alert("Failed to load image (Authorization Required).",
                            function () { }, "Message", 'OK');
                    }else{
                        navigator.notification.alert("Server not responding properly.Please check your internet connection.",
                            function () { }, "Message", 'OK');
                    }
                    app.mobileApp.hideLoading();
                }
            });
            tab3DataSource.fetch(function(){
                var data = this.data();
                //console.log(data);
                var arrdata1 = '';
                var i = 1;
                if(data[0]['status'] === 0 || data[0]['status'] === '0')
                {
                    navigator.notification.alert(data[0]['msg'],function () { }, "Error", 'OK');
                    app.mobileApp.hideLoading();
                }
                else
                {
                    //console.log(data[0]['data']);
                    $.each(data[0]['data'], function(key, value){
                        
                        if(key ==  i){
                            console.log("Image url : "+value.img_url);
                            arrdata1 += '<div class="main"><a data-role="button" data-click="openModalView">\
                                <img src="'+value.img_url+'" style="width:100%;height:100%"/>\
                            </a></div>';
                        }
                        i++;
                    });
                    $("#tab3ListData").html(arrdata1);
                    //app.galleryService.viewModel.setTabView1data(arr1);
                    app.mobileApp.hideLoading();
                }
            });
        },
        
        showBigImage : function(e){
            console.log(e);
            console.log('sssssssssssssss');
        },
        
        setTabView1data : function(data)
        {
            this.set('tab1ListSource',data);
            this.set('tab2ListSource','');
            this.set('tab3ListSource','');
        },
        
        setTabView2data : function(data)
        {
            this.set('tab1ListSource','');
            this.set('tab2ListSource',data);
            this.set('tab3ListSource','');
        },
        
        setTabView3data : function(data)
        {
            this.set('tab1ListSource','');
            this.set('tab2ListSource','');
            this.set('tab3ListSource',data);
        }
    })
    app.galleryService = {
        viewModel:new galleryViewModel()
    };
})(window);
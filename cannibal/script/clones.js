(function(global){
    var cloneViewModel,
        app = global.app = global.app || {};
    
    cloneViewModel = kendo.data.ObservableObject.extend({
        cloneListSource:'',
        
        show:function()
        {
            //var data = [{id:'1',title:'Pure Canna Balm',price:'$30.00',prodImg:'style/images/390/img1.png',desc:'Sed ut perspiciatis unde omnis iste natus.',quantity:'3',size:'150Mg'},{id:'2',title:'Pure Canna Balm',price:'$30.00',prodImg:'style/images/390/img2.png',desc:'Sed ut perspiciatis unde omnis iste natus.',quantity:'5',size:'150Mg'},{id:'3',title:'Pure Canna Balm',price:'$30.00',prodImg:'style/images/390/img1.png',desc:'Sed ut perspiciatis unde omnis iste natus.',quantity:'2',size:'150Mg'},{id:'4',title:'Pure Canna Balm',price:'$30.00',prodImg:'style/images/390/img2.png',desc:'Sed ut perspiciatis unde omnis iste natus.',quantity:'6',size:'150Mg'},{id:'5',title:'Pure Canna Balm',price:'$30.00',prodImg:'style/images/390/img1.png',desc:'Sed ut perspiciatis unde omnis iste natus.',quantity:'8',size:'150Mg'},{id:'6',title:'Pure Canna Balm',price:'$30.00',prodImg:'style/images/390/img2.png',desc:'Sed ut perspiciatis unde omnis iste natus.',quantity:'4',size:'150Mg'},{id:'1',title:'Pure Canna Balm',price:'$30.00',prodImg:'style/images/390/img1.png',desc:'Sed ut perspiciatis unde omnis iste natus.',quantity:'3',size:'150Mg'},{id:'2',title:'Pure Canna Balm',price:'$30.00',prodImg:'style/images/390/img2.png',desc:'Sed ut perspiciatis unde omnis iste natus.',quantity:'5',size:'150Mg'},{id:'3',title:'Pure Canna Balm',price:'$30.00',prodImg:'style/images/390/img1.png',desc:'Sed ut perspiciatis unde omnis iste natus.',quantity:'2',size:'150Mg'},{id:'4',title:'Pure Canna Balm',price:'$30.00',prodImg:'style/images/390/img2.png',desc:'Sed ut perspiciatis unde omnis iste natus.',quantity:'6',size:'150Mg'},{id:'5',title:'Pure Canna Balm',price:'$30.00',prodImg:'style/images/390/img1.png',desc:'Sed ut perspiciatis unde omnis iste natus.',quantity:'8',size:'150Mg'},{id:'6',title:'Pure Canna Balm',price:'$30.00',prodImg:'style/images/390/img2.png',desc:'Sed ut perspiciatis unde omnis iste natus.',quantity:'4',size:'150Mg'}];
            //app.cloneService.viewModel.setCloneListview(data);
           app.cloneService.viewModel.cloneListAPI();
            
        },
        
        setCloneListview : function(data)
        {
            this.set('cloneListSource',data);
        },
        
        cloneListAPI:function()
        {
             app.mobileApp.showLoading();
             var productData = new kendo.data.DataSource({
             transport:{
                  read:{
                      url:localStorage.getItem('clone_API'),
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
                  navigator.notification.alert("Server not responding properly.Please check your internet connection.",
                        function () { }, "Message", 'OK');
              }
            });
            productData.fetch(function(){
                var data = this.data();
                //app.mobileApp.hideLoading();
                console.log(data);
                if(data[0]['status'] === 0 || data[0]['status'] === '0')
                {
                    navigator.notification.alert("Something went wrong! Please try again.",function () { }, "Notification", 'OK');
                    app.mobileApp.hideLoading();
                }
                else
                {
                    app.cloneService.viewModel.createCloneList(data[0]['data']);
                }
               
                
            }); 
        },
        
        createCloneList :function(data){
            //console.log(data); 
            
            var clonehtml = '';
            for(x in data)
            {
                if($.isNumeric(x))
                {
                    var imgsrc = '', price = '';
                    if(data[x].featured_Image != 'noFeaturedImage' ){
                        //console.log("yyy = "+data[x]['post'].ID);
                        imgsrc = data[x].featured_Image;
                    }else{
                        //console.log("nnnn : "+data[x]['post'].ID);
                        imgsrc = 'style/images/390/img1.png';
                    }
                    if(data[x]['regular_price'][0] != ''){
                        price = '$ '+data[x]['regular_price'][0];
                    }else{
                        price = '';
                    }
                    
                    //console.log(data[x].featured_Image);
                    
                    clonehtml += '<div class="main">\
                        <div class="dv1">\
                            <p>\
                                <a data-role="button" data-click="openModalView" style="padding:0;border:0;"><img src="'+imgsrc+'" style=" min-width: 86px; min-height: 86px;"></a>\
                            </p>\
                        </div>\
                        <div class="blankDv">\
                            <p>\
                                &nbsp;&nbsp;\
                            </p>\
                        </div>\
                        <div class="dv2">\
                            <div class="dv21">\
                                <p>'+data[x]['post'].post_title+'</p>\
                            </div>\
                            <div class="dv22">\
                                <p>'+data[x]['post'].post_title+'</p>\
                            </div>\
                            <div class="dv23" >\
                                <div class="dv231">\
                                    <p> '+price+'</p>\
                                </div>\
                            </div>\
                        </div>\
                    </div>';
                }
                
            }
            $("#cloneListData").html(clonehtml);
            app.mobileApp.hideLoading();
        }
        
    });
    
    app.cloneService = {
        viewModel:new cloneViewModel()
    }
})(window);
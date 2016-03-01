(function(global){
    var pastOrderViewModel,
        app = global.app = global.app || {};
    
    pastOrderViewModel = kendo.data.ObservableObject.extend({
        pastOrderListSource:'',
        show:function()
        {
            var data = [{id:'1',title:'Pure Canna Balm','ordernum':'Order No. 5',price:'$30.00',prodImg:'style/images/390/img1.png',desc:'Sed ut perspiciatis unde omnis iste natus.',quantity:'3',size:'150Mg'},{id:'2',title:'Pure Canna Balm','ordernum':'Order No. 4',price:'$30.00',prodImg:'style/images/390/img2.png',desc:'Sed ut perspiciatis unde omnis iste natus.',quantity:'5',size:'150Mg'},{id:'3',title:'Pure Canna Balm','ordernum':'Order No. 1',price:'$30.00',prodImg:'style/images/390/img1.png',desc:'Sed ut perspiciatis unde omnis iste natus.',quantity:'2',size:'150Mg'},{id:'1',title:'Pure Canna Balm','ordernum':'Order No. 5',price:'$30.00',prodImg:'style/images/390/img1.png',desc:'Sed ut perspiciatis unde omnis iste natus.',quantity:'3',size:'150Mg'},{id:'2',title:'Pure Canna Balm','ordernum':'Order No. 4',price:'$30.00',prodImg:'style/images/390/img2.png',desc:'Sed ut perspiciatis unde omnis iste natus.',quantity:'5',size:'150Mg'},{id:'3',title:'Pure Canna Balm','ordernum':'Order No. 1',price:'$30.00',prodImg:'style/images/390/img1.png',desc:'Sed ut perspiciatis unde omnis iste natus.',quantity:'2',size:'150Mg'},{id:'1',title:'Pure Canna Balm','ordernum':'Order No. 5',price:'$30.00',prodImg:'style/images/390/img1.png',desc:'Sed ut perspiciatis unde omnis iste natus.',quantity:'3',size:'150Mg'},{id:'2',title:'Pure Canna Balm','ordernum':'Order No. 4',price:'$30.00',prodImg:'style/images/390/img2.png',desc:'Sed ut perspiciatis unde omnis iste natus.',quantity:'5',size:'150Mg'},{id:'3',title:'Pure Canna Balm','ordernum':'Order No. 1',price:'$30.00',prodImg:'style/images/390/img1.png',desc:'Sed ut perspiciatis unde omnis iste natus.',quantity:'2',size:'150Mg'}];
            app.pastOrder.viewModel.setPastOrderListview(data);
            
             /*app.mobileApp.showLoading();
             var productData = new kendo.data.DataSource({
             transport:{
                  read:{
                      url:localStorage.getItem('preOrders_API'),
                      type:'GET',
                      data:{'uid':localStorage.getItem('user_id')},
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
                    app.pastOrder.viewModel.createPastOrderList(data[0]['order']);
                }
                
            });
            */
        },
        
        createPastOrderList : function(data){
            console.log(data);
            
            var pasthtml = '';
            for(x in data)
            {
                if($.isNumeric(x))
                {
                    console.log(data[x]);
                    pasthtml += '<div class="main">\
                        <div class="leftDv">\
                            <p>this is title</p>\
                            <p>5</p>\
                            <p> Qty : 2</p>\
                        </div>\
                        <div class="rightDv">\
                            <p>price</p>\
                        </div>\
                    </div>';
                }
            }
            $("#pastOrderListData").html(pasthtml);
            app.mobileApp.hideLoading();
        },
        
        setPastOrderListview:function(data)
        {
            this.set("pastOrderListSource",data);
        }
        
    });
    
    app.pastOrder = {
        viewModel:new pastOrderViewModel()
    };
})(window);
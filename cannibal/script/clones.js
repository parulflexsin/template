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
                app.mobileApp.hideLoading();
                console.log(data);
               
                categoryData = [];
                for(x in data[0])
                {
                    if($.isNumeric(x))
                    {
                        //categoryData.push({'category':data[0][x]['MainCategoryName']});
                        //console.log(data[0][x]);
                    }
                }
           }); 
        }
    });
    
    app.cloneService = {
        viewModel:new cloneViewModel()
    }
})(window);
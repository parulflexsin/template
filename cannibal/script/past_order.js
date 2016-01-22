(function(global){
    var pastOrderViewModel,
        app = global.app = global.app || {};
    
    pastOrderViewModel = kendo.data.ObservableObject.extend({
        pastOrderListSource:'',
        show:function()
        {
            var data = [{id:'1',title:'Pure Canna Balm','ordernum':'Order No. 5',price:'$30.00',prodImg:'style/images/390/img1.png',desc:'Sed ut perspiciatis unde omnis iste natus.',quantity:'3',size:'150Mg'},{id:'2',title:'Pure Canna Balm','ordernum':'Order No. 4',price:'$30.00',prodImg:'style/images/390/img2.png',desc:'Sed ut perspiciatis unde omnis iste natus.',quantity:'5',size:'150Mg'},{id:'3',title:'Pure Canna Balm','ordernum':'Order No. 1',price:'$30.00',prodImg:'style/images/390/img1.png',desc:'Sed ut perspiciatis unde omnis iste natus.',quantity:'2',size:'150Mg'},{id:'1',title:'Pure Canna Balm','ordernum':'Order No. 5',price:'$30.00',prodImg:'style/images/390/img1.png',desc:'Sed ut perspiciatis unde omnis iste natus.',quantity:'3',size:'150Mg'},{id:'2',title:'Pure Canna Balm','ordernum':'Order No. 4',price:'$30.00',prodImg:'style/images/390/img2.png',desc:'Sed ut perspiciatis unde omnis iste natus.',quantity:'5',size:'150Mg'},{id:'3',title:'Pure Canna Balm','ordernum':'Order No. 1',price:'$30.00',prodImg:'style/images/390/img1.png',desc:'Sed ut perspiciatis unde omnis iste natus.',quantity:'2',size:'150Mg'},{id:'1',title:'Pure Canna Balm','ordernum':'Order No. 5',price:'$30.00',prodImg:'style/images/390/img1.png',desc:'Sed ut perspiciatis unde omnis iste natus.',quantity:'3',size:'150Mg'},{id:'2',title:'Pure Canna Balm','ordernum':'Order No. 4',price:'$30.00',prodImg:'style/images/390/img2.png',desc:'Sed ut perspiciatis unde omnis iste natus.',quantity:'5',size:'150Mg'},{id:'3',title:'Pure Canna Balm','ordernum':'Order No. 1',price:'$30.00',prodImg:'style/images/390/img1.png',desc:'Sed ut perspiciatis unde omnis iste natus.',quantity:'2',size:'150Mg'}];
            app.pastOrder.viewModel.setPastOrderListview(data);
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
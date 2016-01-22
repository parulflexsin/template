(function(global){
    var eventViewModel,
        app = global.app = global.app || {};
    
    eventViewModel = kendo.data.ObservableObject.extend({
        
        show:function()
        {
            console.log("Event called");
            app.mobileApp.showLoading();
            var changePwdDataS = new kendo.data.DataSource({
                transport:{
                    read:{
                        url:localStorage.getItem('event_API'),
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
            changePwdDataS.fetch(function(){
                var data = this.data();
                /*console.log(data[0]);
                console.log(data[0]['status']);
                console.log(data[0]['data']['length']);*/
                str = '';
                if(data[0]['status'] === 1 || data[0]['status'] === '1')
                {
                    for (i = 0; i < data[0]['data']['length']; i++) { 
                          
                        //$(".eventlist li img").attr(data[0]['data'][i]['ImageUrl']);
                        //$(".eventDate").html("<h1>"+data[0]['data'][i]['date']+"</h1>"+data[0]['data'][i]['ImageUrl']);
                        //$(".eventLebel").html(data[0]['data'][i]['title']);
                        
                        str += '<li>\
                                    <img src="'+data[0]['data'][i]['ImageUrl']+'"/>\
                                    <div class="eventListInfo">\
                                        <div class="eventDate">\
                                            <h1>'+data[0]['data'][i]['date']+'</h1>'+data[0]['data'][i]['event_date']+'\
                                        </div>\
                                        <div class="eventLebel">'+data[0]['data'][i]['title']+'</div>\
                                    </div>\
                                </li>';
                    
                    }
                    $(".eventlist").html(str);
                }else{
                    navigator.notification.alert(data[0]['msg'],function () { }, "Notification", 'OK');
                }
                
                app.mobileApp.hideLoading();
            });
        }
        
    });
    app.eventService = {
        viewModel:new eventViewModel()
    };
})(window);
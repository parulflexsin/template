   $(document).ready(function() {
            $("body").delegate(".signin", "click", function() {
                console.log("click");
               var user = document.getElementById("log_email").value;
             var lock = document.getElementById("log_pwd").value;
        
              if (user == "" || user == null)  {
                navigator.notification.confirm("Please Enter Username/Email", function(confirm) {
                    if (confirm === 1 || confirm === '1') {
                        $('#log_email').focus();
                    }
                }, 'Notification', 'OK');
 
                return;
            }
              else if (lock == "" || lock == null) {
              navigator.notification.confirm("Please Enter Password", function(confirm) {
                    if (confirm === 1 || confirm === '1') {
                        $('#log_pwd').focus();
                    }
                }, 'Notification', 'OK');
 
                return;
               }
            else {
              var url = 'http://wordpress2014:Flexsin_2020@flexsin.org/lab/wordpress/cannibalsonline/conAPI/login.php';
                $.ajax({
                       type: 'POST',
                       url:url,
                       data:{userName:user,pass:lock},
                       success: function(result) {
                           console.log("success block = " + result);
                          
                               app.mobileApp.navigate("views/productlist.html"); 
                           
                       },
                        error: function(e) {
                           console.log("Please register first");
                       }
    
                   });
             }
               }
          );
       });
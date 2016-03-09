 $(document).ready(function() {
        $("body").delegate(".contactsaved", "click", function() {
            console.log("click");
            var uname = document.getElementById("name").value;
            var number = document.getElementById("phonenumber").value;
            var eemail = document.getElementById("emailc").value;
            var sub = document.getElementById("subject").value;
            var msg = document.getElementById("message").value;
            if (uname == "" || uname == null) {
                alert("Please fill the name field");
            }
            if (number == "" || number.length != 10) {
                alert("Please fill the number field");
            }
            if (eemail == "" || eemail == null) {
                alert("Please fill the email field");
            }
            if (sub == "" || sub == null) {
                alert("Please fill the subject field");
            }
            if (msg == "" || msg == null) {
                alert("Please fill the message field");
            } else {
                var url = 'http://wordpress2014:Flexsin_2020@flexsin.org/lab/wordpress/cannibalsonline/conAPI/Contact.php';
                $.ajax({
                           type: 'POST',
                           url:url,
                           data:{name:uname,phone:number,email:eemail,subject:sub,message:msg},
                           success: function(result) {
                               console.log("success block = " + result);
                              
                               app.mobileApp.navigate("views/productlist.html");
                               document.getElementById("name").value = "";
                               document.getElementById("phonenumber").value = "";
                               document.getElementById("emailc").value = "";
                               document.getElementById("subject").value = "";
                               document.getElementById("message").value = "";
                           },
                           error: function(e) {
                               console.log(e);
                           }
    
                       });
            }
        });
    });
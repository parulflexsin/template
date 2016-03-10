(function(global){
    var signupViewModel,
        app = global.app =global.app || {};
    
    drawerViewModel = kendo.data.ObservableObject.extend({
        
        show:function()
        {
              $("body").delegate(".finish", "click", function() {
        console.log("click");
        var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        var firstname = document.getElementById("fname").value;
        var lastname = document.getElementById("lname").value;
        var mobilenum = document.getElementById("phonenumber").value;
        var emailAdd = document.getElementById("email").value;
        var id = document.getElementById("uploadid").value;
        var describe = document.getElementById("uploadprescription").value;
           
        if (firstname == "" || firstname == null) {
            alert("firstname is not valid");
        } else if (lastname == "" || lastname == null) {
            alert("lastname is not valid");
        } else if (mobilenum == "" || mobilenum == null) {
            alert("phonenumber is blank");
        } else if (emailAdd == "" || !filter.test(emailAdd) || emailAdd == null) {
            alert("Email field is not valid");
            document.getElementById("email").value = ""; 
        } else if (id == "" || id == null) {
            alert("id field is not valid"); 
        } else {
            app.mobileApp.navigate("components/home/account.html?firstName=" + firstname + "&lastName=" + lastname + "&phone=" + mobilenum + "&emailid=" + emailAdd + "&driving_licence=" + id + "&prescription=" + describe);
        }
    }); 
         },
        });
    
    app.signupService = {
        viewModel:new signupViewModel()
    };
})(window);
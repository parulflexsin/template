
(function(global){
    var productViewModel,
        app = global.app =global.app || {};
    
    productViewModel = kendo.data.ObservableObject.extend({
        
        show:function(e)
        {
            console.log("called prodcut ");
               $.ajax({
                   url: 'http://wordpress2014:Flexsin_2020@flexsin.org/lab/wordpress/cannibalsonline/conAPI/getCategories.php',
                   type: 'get',
                   dataType: 'json',
                   success: function(data) {
                       var content = '';
            
                       content = '<select class="dropDwn" id="productCategory">';
                       content += '<option>Product Categories</option>';
            
                       for (i in data) {
                           if ($.isNumeric(i)) {
                               content +='<option value="' + data[i]['MainCategoryID'] + '" >' + data[i]['MainCategoryName'] + '</option>';
                           }
                       }
            
                       content += '</select>';
            
                       $('.productCategoryP').html(content);
                       console.log("HTML CREATE");
                       console.log(data);
                   }
               });  
            
                $("body").delegate(".dropDwn", "change", function() {
            var content = '';
            console.log("move");
            $.ajax({
                       url: 'http://wordpress2014:Flexsin_2020@flexsin.org/lab/wordpress/cannibalsonline/conAPI/Products.php',
                       type: 'get',
                       data:{'category':$(this).val()},
                       dataType: 'json',
                       success: function(data) {
                           if (data.status == '1') {
                               $.each(data.data, function(i, product) {
                                   if (product.featured_Image != 'noFeaturedImage') {
                                       imgvar = product.featured_Image;
                                   }else {
                                       imgvar = 'style/images/390/img1.png';
                                   }
                                   if ((product.post.post_title).length > 10) {
                                       title = (product.post.post_title).substr(0, 8);
                                       title = title + "..";
                                   } else {
                                       title = product.post.post_title;
                                   }
                    
                                   content+='<li>';
                                   content+='<div class="dynDv">';
                                   content+='<div class="prodCls">';
                                   content+='<p style="text-align:center">';
                                   content += '<img src="' + imgvar + '"/>';
                                   content+='</p>';
                                   content+='</div>';
                                   content+='<div class="prodTitle">';
                                   content += '<p>' + title + '</p>';
                                   content+='</div>';
                   
                                   content+='</div>';
                                   content +='</li>';
                               });
                               console.log(content);
                               $("#shopList").append(content);
                           }else {
                               console.log("Error");
                           }
                       }
    
                   });
             });
        }
    });
    
    app.productService = {
        viewModel:new productViewModel()
    };
})(window);



    

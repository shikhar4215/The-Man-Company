$(document).ready(function(){
   
    var qua = 1;
    var final_amount = 0;
    //DISPLAY CART ITEM COUNT
    var x = localStorage.getItem("cart_items")
    if(x){        
        var splitedx = x.split(",");
        splitedx.pop()
        var item_count = splitedx.length/3;
        $("#oo").replaceWith("<a href='cart.html'>MY CART <sup>"+item_count +"</sup></a>");
    }
    
    
    
    //GET STORED PRODUCTS
    var get_order_image = sessionStorage.getItem('order_image');    
    var get_order_price = sessionStorage.getItem('order_product_price');    
    var get_order_tagline = sessionStorage.getItem('order_product_tagline');    
    
    
    //MAKE HTML FROM FETCHED DATA OF SESSION_STORAGE
    (function($) {
      
        if(get_order_image && get_order_price && get_order_tagline){
            $('#pro_img').attr('src',get_order_image);
            $('#product_price').html(get_order_price);
            $('#product_title').html(get_order_tagline);
        }
        else{
            $('#order_detail').css("display","none");

            var create_p = document.createElement("p");
            var text_p = document.createTextNode("No Orders !!");
            create_p.appendChild(text_p);

            list = document.getElementById("oder_display_main");
            list.appendChild(create_p);  
        }    
    })(jQuery);

	
    //DEFAULT QUANTITY=1 INTO SPINNER
    $('#spinner').val(qua);
    
    
    //INCREASE PRICE AS PER THE SPINNER VALUE
    var get_val = sessionStorage.getItem("order_product_price");
    
    if(get_val){
        var get_val_split = get_val.split(" ");
        var buy_now_final_price = get_val_split[1];    
    }
    
    
    
    $(document).on("click", ".ui-spinner-button", function (e) { 
        var update_qua = $('#spinner').val();
        
        //IF USER ENTER QUANTITY ZERO 
        if(update_qua<1){
            alert("Quantity cannot be zero or less");
            update_qua=1;
            $('#spinner').val(update_qua);
        }
        var get_price_split = get_order_price.split(" ");
        var get_actual_price = parseInt(get_price_split[1]);
        
        $('#product_price').html("PRICE: "+ update_qua*get_actual_price +" INR");
        buy_now_final_price = update_qua*get_actual_price;
        
        
        final_amount = parseInt(cart_prod_total_price)+parseInt(buy_now_final_price);
        
        
        if(final_amount == "undefined"){
            buy_now_final_price = 0;
        }


        if(isNaN(final_amount)){
            $("#final_amount").html("Final Amount is :- "+cart_prod_total_price+ " INR.");    
        }
        else{
            $("#final_amount").html("Final Amount is :- "+final_amount+ " INR.");    
        }
        


    });
    
    
	//REMOVE PRODUCT FROM ORDER AND SESSION STORAGE
    $("#remove_pro_btn").click(function(){
        sessionStorage.removeItem("order_product_price");
        sessionStorage.removeItem("order_product_tagline");
        sessionStorage.removeItem("order_image");
        location.reload();
    });
	
	var final_cart=sessionStorage.getItem("final_cart");
    
    if(final_cart){
        var order=final_cart.split(",");    
        order.pop();
    }
	
    //MAKE HTML FROM FETCHED DATA OF CART SESSION_STORAGE
    var cart_prod_total_price = 0;
    var cart_index = 0;
    (function($) {
        
        if(!(get_order_image && get_order_price && get_order_tagline)){
            $('#order_detail').css("display","block");
            $('#pro_img').css("display","none");
            $('#product_price').css("display","none");
            $('#product_title').css("display","none");
            $('#spinner').css("display","none");
            $('#qua_txt').css("display","none");
            $('#remove_pro_btn').css("display","none");
            $('p').css("display","none");
        }
        
        if(order){
            for(var t = 0; t<order.length; t=t+3){
                cart_index = cart_index+1;
                sessionStorage.setItem('cart_image'+cart_index, order[t]);     
                sessionStorage.setItem('cart_price'+cart_index, order[t+1]);     
                sessionStorage.setItem('cart_desc'+cart_index, order[t+2]);     

                var get_cart_image = sessionStorage.getItem('cart_image'+cart_index);     
                var get_cart_price = sessionStorage.getItem('cart_price'+cart_index);     
                var get_cart_desc = sessionStorage.getItem('cart_desc'+cart_index);     

                $("#order_detail").append("<img src="+get_cart_image+" alt='Cart Product'>");

                $("#order_detail").append("<h4 id='product_price'>"+get_cart_price+"</h4>");

                $("#order_detail").append("<h5 id='product_title'>"+get_cart_desc+"</h5>");
                
                var get_cart_price_split = get_cart_price.split(" ");
                
                var get_cart_actual_price = parseInt(get_cart_price_split[1]);
                
                cart_prod_total_price = cart_prod_total_price+get_cart_actual_price;
                
                
            }
        }
        
    })(jQuery);
    
    (function($) {
        if(sessionStorage.length>0){
            if(buy_now_final_price == "undefined"){
                buy_now_final_price = 0;
            }
            
            var f = parseFloat(buy_now_final_price) + parseFloat(cart_prod_total_price)
            
            if(isNaN(f)){
                $("#final_amount").html("Final Amount is :- "+cart_prod_total_price+ " INR.");    
            }
            else{
                $("#final_amount").html("Final Amount is :- "+f+ " INR.");    
            }

                                    
            $("#order_detail").append("<button id='button' class='place_orcer_btn ui-button ui-corner-all ui-widget'>Place Order</button>");    
        }
        else{
            $('p').css("display","block");
        }
    })(jQuery);
    
	
	
    if(order){
        order=order.filter(function(e){
		return e!="";				       
        });
    }
    
	
	//Place order
    $(document).on("click", ".place_orcer_btn", function (e) { 
		sessionStorage.clear();
        localStorage.clear();
		$("#order_detail").replaceWith(" ");
		$("#tag").replaceWith("<h2>your order has been placed</h2>");
	});
});

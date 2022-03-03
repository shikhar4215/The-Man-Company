$(document).ready(function(){
    
    var index_print=0;
    var num=localStorage.length+1;
    var indx=1;
    //change page
	
	
    //QUESTION ADDING FUNCTIONALITIES
    for (var i = 0; i < localStorage.length; i++){
        indx = i+1;
        var create_p2 = document.createElement("p");
        
        var check_item = localStorage.getItem("Que"+indx);
        
        if(check_item){
            var text_p2 = document.createTextNode("Que:-    "+localStorage.getItem("Que"+indx));
            create_p2.appendChild(text_p2);    
            list = document.getElementById("added_que");
            list.appendChild(create_p2);      
        }
        
    }
    
    
    //DISPLAY CART ITEM COUNT
    var x = localStorage.getItem("cart_items")
    if(x){        
        var splitedx = x.split(",");
        splitedx.pop()
        var item_count = splitedx.length/3;
        
        $("#oo").replaceWith("<a href='cart.html'>MY CART <sup>"+item_count +"</sup></a>");
    }
    
    
    
    
    
    //GET PRODUCTS FROM JSON FILE
    $.getJSON("json/allproduct.json", function(data) {
        $.each(data, function() {
            $.each(this, function(key, value) {
                index_print++;
				product="<div id='product_box' class='produts_display'>";
                product+="<img src="+ value.image +" id='sa'>"; 
                product+="<form action='order.html'>";
                product+="<button id='button button_product' class='buy_now ui-button ui-corner-all ui-widget'>Buy Now</button>" ;
                product+= "</form>"; 
                product+="<button id='button' class='cart_now ui-button ui-corner-all ui-widget'>Add to Cart</button>";
                product+="<h3>"+value.product_price +"</h3>";
                product+="<h3>"+value.tag_line +"</h3>";
                product+="</div>";    
                $("#product_json").append(product);
            });
        }); 
    });
    
    
    
    //QUESTION ADDING SECTION
    $("#add_que").click(function(){
       var get_ques_user = prompt("We will try to respond you as soon as possible");
        if(!get_ques_user){
            alert("Question Can't be blank")
        }
        else{
            localStorage.setItem("Que"+num, get_ques_user);
            var create_p2 = document.createElement("p");
            var text_p2 = document.createTextNode("Que:-    "+get_ques_user);
            create_p2.appendChild(text_p2);

            list = document.getElementById("added_que");
            list.appendChild(create_p2);    
            num=num+1;
        }
    });
    
    //STORE BUY PRODUCT TO SESSION STORAGE
    $(document).on("click", ".buy_now", function (e) { 
        var get_image_src = $(this).closest("form").prev("img").attr('src');
        var get_first_h3 = $(this).closest('form').next().next().html();
        var get_second_h3 = $(this).closest('form').next().next().next().html();
        
        sessionStorage.setItem('order_image', get_image_src);    
        sessionStorage.setItem('order_product_price', get_first_h3);    
        sessionStorage.setItem('order_product_tagline', get_second_h3);    
    });
	
	
	//ADD PRODUCTS TO THE CART
	$("body").on("click", ".cart_now", function (e){
        var crt=[]; 
        var ct="";        

        crt["img"]=$(this).prev('form').prev('img').attr('src');
        crt["f_h3"]=$(this).next().html();
        crt["s_h3"]=$(this).next().next().html();
        for(var key in crt){
            ct+=crt[key]+",";
        }
        ct+=";"; 
        var hours = 24; // Reset when storage is more than 24hours
        var now = new Date().getTime();
        var cart_items = "";
        var exisiting=localStorage.getItem("cart_items");
        var data= exisiting ? exisiting + ct:ct;


        if(now-cart_items > hours*60*60*1000) {
            localStorage.setItem("cart_items", data);
        }  
        alert("Product added to the cart");
        location.reload();
    });
     	                

	$("#faqsection").accordion();

		$( "#datepicker" ).datepicker({
		inline: true
	});

	$( "#button-icon" ).button({
		icon: "ui-icon-gear",
		showLabel: false
	});

	$( "#radioset" ).buttonset();
	$( "#spinner" ).spinner();
    $( "#button" ).button();
    $( "#button1" ).button();

	$( "#button-icon" ).button({
		icon: "ui-icon-gear",
		showLabel: false
	});

	$("#radioset").buttonset();
});
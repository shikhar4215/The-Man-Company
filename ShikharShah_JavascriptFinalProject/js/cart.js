
$(document).ready(function(){
	$("#add_product").css("visibility","visible");
    
	
    //GET STORED PRODUCTS
	try{
		if(localStorage.getItem("cart_items")===null){
			$("#emp_cart").css("visibility","hidden");
			$("#buy_prodcut").css("visibility","hidden");
			$("#add_product").css("visibility","visible");
			alert("Cart is empty");
			//Add Product
				$("#add_product").click(function(){
					location.replace("index.html");
				});
		}
		else{
            
            //START DISPLAY CART ITEM COUNT
            var x = localStorage.getItem("cart_items")
            var splitedx = x.split(",");
            splitedx.pop()
            var item_count = splitedx.length/3;
            $("#oo").replaceWith("<a href='cart.html'>MY CART <sup>"+item_count +"</sup></a>");
            //END DISPLAY CART ITEM COUNT


			var cart_itm = localStorage.getItem("cart_items");	
			var	arr=cart_itm.split(",");
			var arr1="";
			for(var i=0;i<arr.length;i++){
				arr1+=arr[i]+"\n";
			}
			
			var arr2="";
			var arr2=arr1.split(";");
		
			var arr3="";
    		for(var i=0;i<arr2.length;i++){
				arr3+=arr2[i]+"\n";
			}
			
			var arr4=arr3.split("\n");
	
			//Array filter
			var arr5=arr4.filter(function(n){
				return	n!="";
			});
	
			//Appending cart item to the array
			var im1="";
			for(var i=0;i<arr5.length;i=i+3){
				im1+="<div class='cart_product'><img alt='Cart Product' src="+arr5[i]+">"+
					"<h3 class='h_s1'>"+arr5[i+1]+"</h3>"+
				 	"<h3 class='h_s2'>"+arr5[i+2]+"</h3>"+
				 	"<button id='remove_cart_item' class='remove_product ui-button ui-corner-all ui-widget'>Remove</button></div>";
			}
            
            
			$("#product_main_div").append(im1);
			
			//Setting up button according to the cart
		
				$("#emp_cart").css("visibility","visible");
				$("#buy_prodcut").css("visibility","visible");
				$("#add_product").css("visibility","hidden");
			
			
			//Empty cart
			$("#emp_cart").click(function(){
				localStorage.clear();
				$("#product_main_div").html(" ");
				$("#emp_cart").css("visibility","hidden");
				$("#buy_prodcut").css("visibility","hidden");
				$("#add_product").css("visibility","visible");
                
                sessionStorage.removeItem("final_cart");
                location.reload()
			});	
			
			//Remove individual Items
			var final_cart=" ";
			
			$(document).on("click", ".remove_product", function (e) { 
        		
				var img=$(this).prev().prev("h3").prev("img").attr('src');
        		var pr=$(this).prev().prev("h3").html();
        		var tag=$(this).prev().html();	

                var new_array = [];
                var get_local_items = localStorage.getItem("cart_items");
                var new_array = get_local_items.split(",");
               
                new_array=new_array.filter(function(n){
					 return	n!=";"+img && n!=pr && n!=tag;
				 });
                
                localStorage.clear()
                localStorage.setItem("cart_items",new_array);
                location.reload();
                
				//Remove element from screen
				$(this).prev().prev("h3").prev("img").remove();
				$(this).prev().prev("h3").remove();
				$(this).prev().remove();
				$(this).remove();
				
				//Remove element from array
				 arr5=arr5.filter(function(n){
					 return	n!=img && n!=pr && n!=tag;
				 });
				
				if(arr5==""){	
					$("#emp_cart").css("visibility","hidden");
					$("#buy_prodcut").css("visibility","hidden");
					$("#add_product").css("visibility","visible");
					localStorage.clear();
					sessionStorage.clear();
				}
    		}); 			
			
			
			//Buy Now
				$("#buy_prodcut").click(function(){	
					for(var i in arr5){
            			final_cart+=arr5[i]+",";
        			}
					sessionStorage.setItem("final_cart",final_cart);
					$("#product_main_div").replaceWith(" ");
					location.replace("order.html");
					
				});
			
			
			//Add Product
				$("#add_product").click(function(){
					location.replace("index.html");
				});
			}	
		}
		catch(err){
			alert(err);
		}
	});
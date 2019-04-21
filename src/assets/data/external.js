// testvar = "heloo from external js";
// mtotal='';
// mcurrency='HKD';
// msg_complete='';
// msg_cancel='';
// msg_err='';
// sum=1000000;
// // reloadjs=reload();
// paymoney='';
order_arr=[];
// reset_cart=false;
// js_cid='';
// cart_no='';
order_prefix='';
shipdate='';
shipadd=''; 
country_code=''; 
city=''; 
postal_code='';
recipient_name='';
state='';
justFinishPayment=false;




function payWithPaystack(user,amount,ref){
  var handler = PaystackPop.setup({
    key: 'pk_test_e85ca04e9a307363e88819af7287101e399f9d25',
    email: user.email,
    amount: amount,//10000 mean NGN100.00
    ref: ref, //must unique!! ''+Math.floor((Math.random() * 1000000000) + 1) generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
    metadata: {
       custom_fields: [
          {
              display_name: "Mobile Number",
              variable_name: "mobile_number",
              value: "+2348012345678"
          }
       ]
    },
    callback: function(response){

        var m_address="";
        // alert('success. transaction ref is ' + response.reference);
        console.log(response);
        if(response.status=='success'){
                      
            for (var i = 0; i < order_arr.length; i++) { 
                uploadOrder(user.cid, order_prefix,
                    response.message, response.reference,response.status, response.trans, response.transaction,
                    order_arr[i].pid, order_arr[i].title, order_arr[i].price, order_arr[i].qty, 
                    order_arr[i].total,shipdate, user.add, country_code, city, 
                    postal_code, user.name, state);
                    // m_address=shipadd;


            }
            // addDelivery(response.reference,m_address);
            alert('Thank you!!');
            reload();

            
        }


    },
    onClose: function(){
        // alert('window closed');
        // alert('Transction complete in Pay');
    }
  });
  handler.openIframe();
}




function uploadOrder(cid, order_prefix,message, reference,status, trans, transaction,item, title, unitprice, qty, 
    total,shipdate, shipadd, country_code, city, 
    postal_code, recipient_name, state) {

    


    orderdate="NA";
    shipdate="NA";
   


    var orderlink="https://hinzappz.com/OJA/order.php?cid="+cid+"&order_prefix="+order_prefix+"&message="+message+"&reference="+reference+
    "&status="+status+"&trans="+trans+"&transaction="+transaction+"&item="+item+"&title="+
    title+"&unitprice="+unitprice+"&qty="+qty+"&total="+total+"&shipdate="+shipdate+"&shipadd="+shipadd+
    "&country_code="+country_code+"&city="+city+"&postal_code="+postal_code+"&recipient_name="+recipient_name+"&state="+
    state;

    console.log("orderlink==========="+orderlink);
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);

       }
    };
    xhttp.open("GET", orderlink, true);
    xhttp.send();
}


function addDelivery(reference,shipadd) {


    var del_link="https://hinzappz.com/OJA/delivery.php?reference="+reference+"&shipadd="+shipadd+"&status=0";

    console.log("del_link==========="+del_link);
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
       }
    };
    xhttp.open("GET", del_link, true);
    xhttp.send();
}





function reload() {
    // justFinishPayment=true;
    window.location.reload();

}
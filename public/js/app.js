window.print_this = function(id) {
    var prtContent = document.getElementById(id);
    var WinPrint = window.open('', '', 'left=250,top=50,width=800,height=900,toolbar=0,scrollbars=0,status=0');
    
    WinPrint.document.write('<link rel="stylesheet" type="text/css" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css">');
    
  	// To keep styling
    // var file = WinPrint.document.createElement("link");
    // file.setAttribute("rel", "stylesheet");
    // file.setAttribute("type", "text/css");
    // file.setAttribute("href", 'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css');
    // WinPrint.document.head.appendChild(file);

    
    WinPrint.document.write(prtContent.innerHTML);
    WinPrint.document.close();
    WinPrint.setTimeout(function(){
      WinPrint.focus();
      WinPrint.print();
      WinPrint.close();
    }, 1000);
}
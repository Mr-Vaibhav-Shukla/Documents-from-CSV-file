  var rowlength = 0, colmlength = 0, tempdata = 0;
  
  window.addEventListener("load",function(){
   document.getElementById("upload").addEventListener("click",function(){
  var a = 0, b = 0;
    var fileUpload = document.getElementById("fileUpload");
          var regex = /.+\.(csv)$/i;
          if (regex.test(fileUpload.value.toLowerCase())) {
              if (typeof (FileReader) != "undefined") {
                  var reader = new FileReader();
                  reader.onload = function (e) {
                    //console.log(e.target.result);
                      var table = document.createElement("table");
                      var rows = e.target.result.split("\n");
                      rowlength = rows.length-1;
                      {
                        var i=0, x;
                        var arr=[];
                        var cells = rows[i].split(",");
                        if (cells.length > 1) {
                          colmlength = cells.length;
                            for (var j = 0; j < cells.length; j++) {
                                x = cells[j];
                                arr.push(x);
                                sessionStorage.setItem(i,JSON.stringify(arr));
                            }
                        }
                      }
  
                      for (var i = 1; i < rows.length; i++) {
                          var arr=[];
                          var cells = rows[i].split(",");
                          if (cells.length > 1) {
                              for (var j = 0; j < cells.length; j++) {
                                  arr.push(cells[j]);
                                  sessionStorage.setItem(i,JSON.stringify(arr));
                              }
                          }
                      }
  
                      
                      {
                        var i = 0;
                        var cells = rows[i].split(",");
                        if (cells.length > 1) {
                          var x = JSON.parse(sessionStorage.getItem(i));
                          document.getElementById('thead').innerHTML = "";
                          for (var j = 0; j < cells.length; j++) {
                            document.getElementById('thead').innerHTML += "<th>" + x[j] + "</th>";
                            }
                        }
                      }
                      
                      document.getElementById('tbody').innerHTML = "";
                      for (var i = 1; i < rows.length; i++) {
                        var cells = rows[i].split(",");
                        if (cells.length > 1) {
                          document.getElementById('tbody').innerHTML += "<tr id =\"" + i + "\"></tr>";
                          var x = JSON.parse(sessionStorage.getItem(i));
                          document.getElementById(i).innerHTML = "";
                          for (var j = 0; j < cells.length; j++) {
                            document.getElementById(i).innerHTML += "<td>" + x[j] + "</td>";
                            }
                        }
                      }
                  }
                  reader.readAsText(fileUpload.files[0]);
                  a = 1;
              } else {
                  alert("This browser does not support HTML5.");
              }
          } else {
              alert("Please upload a valid CSV file.");
          }
  
          var fileUpload = document.getElementById("tempUpload");
          var regex = /.+\.(txt)$/i;
          if (regex.test(fileUpload.value.toLowerCase())) {
              if (typeof (FileReader) != "undefined") {
                  var reader = new FileReader();
                  reader.onload = function (e) {
                   tempdata = e.target.result;
                  }
                  reader.readAsText(fileUpload.files[0]);
                  b = 1;
              } else {
                  alert("This browser does not support HTML5.");
              }
          } else {
              alert("Please upload a valid text file.");
          } 
          
          if(a == 1 && b == 1)
          {
            document.getElementById('b1').disabled = false;
            document.getElementById('b2').disabled = false;
            document.getElementById('b3').disabled = false;
          }
   })
  })
  
  document.getElementById("browse_btn").addEventListener("click",function(){
    document.getElementById('b1').disabled = true;
    document.getElementById('b2').disabled = true;
    document.getElementById('b3').disabled = true;
    
  })
  
  document.getElementById("temp_btn").addEventListener("click",function(){
    document.getElementById('b1').disabled = true;
    document.getElementById('b2').disabled = true;
    document.getElementById('b3').disabled = true;
    
  })
  
  window.addEventListener("load",function(){
    document.getElementById("b2").addEventListener("click",function(){
      document.getElementById('Modal2').innerHTML = "";
      for(var i=1; i < rowlength; i++) {
        document.getElementById('Modal2').innerHTML += "<button class=\"btn-small waves-effect modal-trigger\" id=\"" + i +"\" onclick=\"template(i = " + i +")\" style=\"margin: 6px;\" data-target=\"tempview\">Template" + i + "</button>";
  
      }
    })
  })
  
  
  function template() {
  
      data = tempdata;
  
      var x = JSON.parse(sessionStorage.getItem(i));
      var y = JSON.parse(sessionStorage.getItem(0));
  
      var today = new Date();
      var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      data = data.replace(/__CURRENTDATE/g, date);
  
      for(var k = 0; k < colmlength; k++) {
        if(k == colmlength-1) {
        y[k] = y[k].replace('\r', '');
        }
        y[k] = "__" + y[k];
        data = replaceAll(data, y[k], x[k]);
      }
  
     document.getElementById('tempview').innerText = "";
     document.getElementById('tempview').innerText += data;
     document.getElementById('tempview').innerHTML += "<br><button  class=\"btn-small waves-effect center\" id=\"down-temp\">Download</button><br><br>"
      
     //downnloading started
  
     document.getElementById("down-temp").addEventListener("click", function(){
      var text = data;
      var filename = "Doc_"+i+".txt";
      download(filename, text);
      }, false);
  
  }
  
  function escapeRegExp(string){
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }
  
  function replaceAll(str, term, replacement) {
  return str.replace(new RegExp(escapeRegExp(term), 'g'), replacement);
  }
  
  function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
  }
  
  function create_zip() {
  
    var z = JSON.parse(sessionStorage.getItem(0));
  
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      
    var zip = new JSZip();
  
    var temp_data = tempdata;
    
    for(i = 1; i < rowlength; i++) {
  
      var data = temp_data;
  
      var x = JSON.parse(sessionStorage.getItem(i));
      data = data.replace(/__CURRENTDATE/g, date);
  
      for(var k = 0; k < colmlength; k++) {
        if(k == colmlength-1) {
        z[k] = z[k].replace('\r', '');
        }
        var ini = z[k];
        z[k] = "__" + z[k];
        data = replaceAll(data, z[k], x[k]);
        z[k] = ini;
      }
      var filename = "Doc_" + i + ".txt"; 
      zip.file(filename, data);
    }
  
    zip.generateAsync({type:"blob"})
    .then(function(content) {
        // Force down of the Zip file
        saveAs(content, "massDocs.zip");
    });
        
  }
  
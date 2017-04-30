/*
$.get('./public/science.txt', function(err, data) {
    if (err) throw err;
    var obj=data.split("\r\n");
    var list=[];
    var sat, satrec;
    for(var fila=0;fila<obj.length;fila+=3){
      sat = {
        id: obj[fila],
        satrec : obj[fila+1],
        posvel : obj[fila+2]
        //,
        //satrec : satellite.twoline2satrec(obj[fila+1], obj[fila+2]),
        //posvel : satellite.sgp4(satrec, 1982)
      };
      list.push(sat)
    }
    console.log(list);
});
*/

  $.ajax({
              url : "science.txt",
              dataType: "text",
              success : function (data) {
                  //$(".text").html(data);
                  var obj=data.split("\r\n");
                  var list=[];
                  var sat, satrec;
                  for(var fila=0;fila<obj.length;fila+=3){
                    sat = {
                      id: obj[fila],
                      satrec : obj[fila+1],
                      posvel : obj[fila+2],
                      satrec : satellite.twoline2satrec(obj[fila+1], obj[fila+2]),
                      posvel : satellite.sgp4(satrec, 1982)
                    };
                    list.push(sat)
                  }
                  console.log(list);
              }
          });

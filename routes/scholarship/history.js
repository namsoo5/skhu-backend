var utils = require('../utils');

var run = function(req, res, next){
  console.log("POST /scholarship/history");

  var url = utils.baseurl+"/GATE/SAM/SCHOLARSHIP/S/SJHS01S.ASPX?&maincd=O&systemcd=S&seq=1";

  utils.get(req, res, next, url, true)
  .then(function(window, rawData){

    var history = [];
    window.$("#dgList > tbody > tr")
      .each(function(index, element){
         if(index>=1){
           history.push({
            "year" : window.$( element ).children("td:eq(0)").text(),
            "semester" : window.$( element ).children("td:eq(1)").text(),
            "scholarship_name" : window.$( element ).children("td:eq(2)").text(),
            "order" : window.$( element ).children("td:eq(3)").text(),
            "grade" : window.$( element ).children("td:eq(4)").text(),
            "entrance_scholarship" : window.$( element ).children("td:eq(5)").text(),
            "registration_scholarship" : window.$( element ).children("td:eq(6)").text(),
            "benefit" : window.$( element ).children("td:eq(7)").text(),
            "note" : window.$( element ).children("td:eq(8)").text()
          });
        }
      });
    res.send(JSON.stringify({
      "scholarship_history" : history
    }));
  });

}

module.exports = run;
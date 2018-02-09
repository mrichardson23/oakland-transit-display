function get_bart_etds(){
    var Httpreq = new XMLHttpRequest(); // a new request
    Httpreq.open("GET","https://api.bart.gov/api/etd.aspx?cmd=etd&orig=12TH&key=MW9S-E7SL-26DU-VV8V&json=y",false);
    Httpreq.send(null);
    var etd_json = JSON.parse(Httpreq.responseText);
    etd_string_minutes = etd_json.root.station[0].etd[0].estimate[0].minutes;
    etd_string_destinations = etd_json.root.station[0].etd[0].destination;
    full_string = "";

    for (var i = 0; i < etd_json.root.station[0].etd.length; i++) {
 		full_string = full_string + "<p><span class=\"destination\">"
    	full_string = full_string + etd_json.root.station[0].etd[i].destination;
    	full_string = full_string + "</span><span class=\"minutes\">";
    	for (var j = 0; j < etd_json.root.station[0].etd[i].estimate.length; j++) {
            if (etd_json.root.station[0].etd[i].estimate[j].minutes != "Leaving") {
                full_string = full_string + " " + etd_json.root.station[0].etd[i].estimate[j].minutes;
                if (j < etd_json.root.station[0].etd[i].estimate.length - 1) {
                    full_string = full_string + ", "
                }
            }
    	}
    	full_string = full_string + "</span>></p>";
    }
    document.getElementById("bart_etds").innerHTML = full_string ;
}


function get_ac_transit_etd() {
    var acHttpreq = new XMLHttpRequest(); // a new request
    acHttpreq.open("GET","http://api.actransit.org/transit/stops/50212/predictions?token=E45E1AC8A77E05B2FAD062161A657299",false);
    acHttpreq.send(null);
    var etd_json = JSON.parse(acHttpreq.responseText);
    etd_ac_transit_date = new Date(etd_json[0].PredictedDeparture)
    if (etd_ac_transit_date.getHours() > 12) {
        hours = etd_ac_transit_date.getHours() - 12;
        postfix = "pm";
    }
    else {
        hours = etd_ac_transit_date.getHours();
        postfix = "am";
    }
    if (etd_ac_transit_date.getHours() >= 12)
        postfix = "pm";
    else
        postfix = "am";
        
    document.getElementById("act_etds").innerHTML = "<p><span class=\"destination\">51A to Alameda</span></span><span class=\"minutes\">" + hours + ":" + zeroFill(etd_ac_transit_date.getMinutes(),2) + postfix + "</span>></p>";
}

function zeroFill( number, width )
{
  width -= number.toString().length;
  if ( width > 0 )
  {
    return new Array( width + (/\./.test( number ) ? 2 : 1) ).join( '0' ) + number;
  }
  return number + ""; // always return a string
}

function refresh_times(){
    get_bart_etds();
    get_ac_transit_etd();
}

setInterval(refresh_times, 20000);
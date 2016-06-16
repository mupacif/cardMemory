var idc =["Elévé",
"Complet/Comblé/Reconnaissant",
"Confiant/Fier",
"Appliqué/Engagé",
"Joyeux",
"Calme",
"Impatient/Pressé",
"Perdu/Confus",
"Stréssé/Dépassé",
"Anxieux/désabusé/fermé",
"Evitant/Déprimé"];
idc.reverse();
var chartsOn;
Template.insertThinkBetter.events({

'change #level': function(e) {
  //  alert("changed")
    var level=parseInt($('#level').val());
            $("#mood").text(idc[level])
},
    'click #send': function(e) {
          e.preventDefault();
          var comment = $("#comment").val()
          if(!comment)
          {
            return
          }
          
          var level=parseInt($('#level').val());
            var data = {
            'think': comment,
            'level':level,
            'time': new Date()
            }
            
            thinkBetter.insert(data)
            
           // alert(comment+" : "+idc[level])
             $("#comment").val("")
    },
    
     'click #clear': function(e) {
          e.preventDefault();
           $("#comment").val("")
    },
	'click .btn':function(e){
	   $("#level").val(parseInt($(e.currentTarget).val()))
	  // console.log($(e.currentTarget).val());
	  //console.log("hello")	
}
    
    });
    
    Template.showThinkBetter.helpers({
      thoughs:function(){
            var History=thinkBetter.find({}, {sort: {date: -1}});
            History=History.fetch()

   
     
            return History;
        },
      
    });
    
     Template.showThinkBetter.events({ 
         
         'click, touchstart #showGraph':function()
    {
 //	console.log("yolo")  
  if(chartsOn)
   {
    //$("#thinkContainer").html("Chart");
    return
   }
  chartsOn = true;
   // $("#thinkContainer").html("");
   
    var History=thinkBetter.find({}, {sort: {date: -1}});
    History=History.fetch()
            //
  var minDate,maxDate;
            var data = [];
       History.forEach(function(d){
  if(!maxDate)
                maxDate=d.time;
                
            minDate=d.time;
          data.push({"Shift":d.think,"Date":d3time(d.time),"Value":d.level,"rawDate":d.time})
});
       
      console.log(data);	
                var svg = dimple.newSvg("#thinkContainer", 590, 400);

       data.forEach(function (d) {
        d["Day"] = d["Date"].substring(0, d["Date"].length - 6);
	console.log(d.rawDate)
        d["Time of Day"] =
            d.rawDate.toLocaleDateString()+" "+ d["Date"].substring(d["Date"].length - 5);
    }, this);
      // Filter for a single SKU and Channel
     // data = dimple.filterData(data, "SKU", "Theta 18 Pack Standard");
     // data = dimple.filterData(data, "Channel", "Hypermarkets");

      // Create and Position a Chart
      
      var myChart = new dimple.chart(svg, data);
      myChart.setBounds(60, 30, 500, 300);
      //var x = myChart.addCategoryAxis("x", "Month")
  //    var x = myChart.addTimeAxis("x", "Day", "%d %b %Y", "%d %b");
     var x = myChart.addTimeAxis("x", "Time of Day","%d/%m/%Y %H:%M", "%d/%m");
	  var y= myChart.addAxis("y", "Value");
	
    x.overrideMin = maxDate;
    x.overrideMax = minDate;
   // y.overrideMin =0;
   // y.overrideMax = 10;
   
      // Order the x axis by date
      x.addOrderRule("Date");
  	 x.timePeriod = d3.time.days;
    x.timeInterval = 1; 
      // Min price will be green, middle price yellow and max red
      myChart.addColorAxis("Value", ["orange", "yellow", "green"]);

      // Add a thick line with markers
      var lines = myChart.addSeries(null, dimple.plot.line); 
      lines = myChart.addSeries("Shift", dimple.plot.line); 
      lines.lineWeight = 5;
      lines.lineMarkers = true;

      // Draw the chart
      myChart.draw();
            //
   
         
    } });
    
 /**
 * wrapp mood
 */
 UI.registerHelper('nameMood',function(nb1){ 

   
    return idc[nb1];
    
});

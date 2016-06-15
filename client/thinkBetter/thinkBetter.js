var idc =["Elévé",
"Complet/Comblé/Reconnaissant",
"Confiant/Fier",
"Appliqué/Engagé",
"Joyeux","Calme",
"Impatient/Pressé",
"Perdu/Confus",
"Stréssé/Dépassé",
"Anxieux/désabusé/fermé",
"Evitant/Déprimé"];
idc.reverse();

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
    }
    
    });
    
    Template.showThinkBetter.helpers({
         thoughs:function(){
            var History=thinkBetter.find({}, {sort: {date: -1}});
            History.fetch()
   
     
            return History;
        },
      
    });
    
     Template.showThinkBetter.events({ 
         
         'dblclick':function()
    {
   
   chartsOn = !chartsOn;
   if(chartsOn)
   {
    $("#thinkContainer").html("");
    return
   }
   
    var History=thinkBetter.find({}, {sort: {date: -1}});
            History.fetch()
            //
            var data = [];
        History.forEach(function (d) {
            data.push({"Shift":d.think,"Date":d3time(d.date),"Value":d.level})});
         //console.log(dt)
       
                var svg = dimple.newSvg("#thinkContainer", 590, 400);

        data.forEach(function (d) {
        d["Day"] = d["Date"].substring(0, d["Date"].length - 6);
        d["Time of Day"] =
            "2000-01-01 " + d["Date"].substring(d["Date"].length - 5);
    }, this);
      // Filter for a single SKU and Channel
     // data = dimple.filterData(data, "SKU", "Theta 18 Pack Standard");
     // data = dimple.filterData(data, "Channel", "Hypermarkets");

      // Create and Position a Chart
      var myChart = new dimple.chart(svg, data);
      myChart.setBounds(60, 30, 500, 300);
      //var x = myChart.addCategoryAxis("x", "Month")
       var x = myChart.addTimeAxis("x", "Day", "%d %b %Y", "%d %b");
      myChart.addMeasureAxis("y", "Value");

      // Order the x axis by date
      x.addOrderRule("Date");

      // Min price will be green, middle price yellow and max red
      myChart.addColorAxis("Value", ["orange", "yellow", "green"]);

      // Add a thick line with markers
      var lines = myChart.addSeries(null, dimple.plot.line); 
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
//temp global passée sur une matière
var timer = 0;
//temps passé activement sur une matière
 localTimer=0;
//temps passé hors d'une matière
 localTimerOff=0;

//id du chapitre courant
var currentLink = null;
var currentLINK = "/books";
//working data
var watchingHistory = false;

var chartsOn=false;
//UI data
Session.setDefault('subject');
//timer when active
Session.setDefault('timeru', localTimer);
//timer when off
Session.setDefault('timeruOff', localTimerOff);
/**
 * D3 Format text
 */
d3time=function(date){ 
   var format = d3.time.format("%d %b %Y %H:%M");
    
    return format(date);
    
};

vis = (function(){
    var stateKey, eventKey, keys = {
        hidden: "visibilitychange",
        webkitHidden: "webkitvisibilitychange",
        mozHidden: "mozvisibilitychange",
        msHidden: "msvisibilitychange"
    };
    for (stateKey in keys) {
        if (stateKey in document) {
            eventKey = keys[stateKey];
            break;
        }
    }
    return function(c) {
        if (c) document.addEventListener(eventKey, c);
        return !document[stateKey];
    }
})();

var timeLeft = function() {
    if(vis())
    {
        timer++
        Session.set('timeru', localTimer++);
    }

    localTimerOff++;
    Session.set('timeruOff', localTimerOff-localTimer);
    //console.log("timeOff:"+Session.get('timeruOff')+"/"+"timeOn:"+Session.get('timeru'))
   
    
};
interval = Meteor.setInterval(timeLeft, 1000)




Template.links.helpers({
    links: function() {
        return book.find({});
    },
    

});

Template.book.helpers({
    timer:  function() {
            return Session.get('timeru');
        },
         timerOff:  function() {
            return Session.get('timeruOff');
        },
        
        subject:  function() {
            return Session.get('subject');
        }
   

});

Template.book.events({
'dblclick header':function()
{
    watchingHistory = !watchingHistory;
   // alert(watchingHistory?"you watching history":"you are not")
    if(watchingHistory)
    {
        //si page d'acceuil ou non 
        if(currentLink)
        //local
     $("#frameDemo").attr("src","/books/localStory/"+currentLink);
     else
     //tous les liens
     $("#frameDemo").attr("src","/books/story");
    }
    else
    {
    $("#frameDemo").attr("src",currentLINK);
    }
}
   

});
/**
 * Format text
 */
UI.registerHelper('hms',function(sec_num){ 
       // console.log(sec_num)
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num%3600) / 60);
    var seconds = Math.floor(sec_num % 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    
    return hours+':'+minutes+':'+seconds;
    
});


/**
*Format time
*//**
 * d.toLocaleString()
 *
 */
 
 UI.registerHelper('localString',function(date){ 

    
    return date.toLocaleString();
    
});
/**
 * Pourcentage
 */
 UI.registerHelper('pct',function(nb1,nb2){ 

    nb=nb1-nb2;
    return (1-nb/nb1)*100|0;
    
});
/**
 * delete
 */
Template.links.events({
        'click .load': function(e) {

            //if change of link
            if (currentLink != this._id) {
                var data = null;

                /**
                 * Save old value
                 */
                //if the last link is not null et not== to this
                //save the time 
                ///if base not exist : create it
                ///i it exist update it
                if (currentLink != null && currentLink != this._id) {
                    //get last 
                    data = book.findOne({
                        _id: currentLink
                    });


                    if (data) {
                        //update the time

                        book.update({
                            _id: currentLink
                        }, {
                            $set: {
                                during: timer
                            }
                        });
               
                    var history =
                    {
                        'subjectId':currentLink,
                        'subject':Session.get('subject'),
                        'matiere': $("#subject").val(),
                        'date':new Date(),
                        'timerOn':localTimer,
                        'timerOff':localTimerOff
                        
                    }
                    
                    bookHistory.insert(history)
                    console.log(history)
                        
                    }
                    else {


                        //create a entry for the time
                    book.update({
                        _id: currentLink
                    }, {
                        $set: {
                            during: timer
                        }
                    });
                    }

                }


                /**
                 * set the new value
                 */
                /**
                 * save time if current#null
                 */
                //check if time is saved
                data = book.findOne({
                    _id: this._id,
                    'during': {
                        $exists: true
                    }
                });
                //if already or not in base
                if (data) {
                    //get the new time
                    timer = data.during;
                    localTimer=0;
                    localTimerOff=0;
                    $("#subject").val("")
                    //console.log("timer:" + timer)
                }
                else {
                    //reset timer
                    timer = 0;
                    //create a entry for the time
                    book.update({
                        _id: currentLink
                    }, {
                        $set: {
                            during: timer
                        }
                    });
                    //
                   
                    //alert("not in time lol")
                }
                //set the current link
                currentLink = this._id;
                Session.set('subject', this.title)
                currentLINK = $(e.currentTarget).data("url")
                         $('.load').removeClass("selected");
               $(this).addClass("selected")
                //change the value of the frame
                $("#frameDemo").attr("src",currentLINK);



            }
            //else pass : do nothing

        },
        'click .glyphicon-remove-circle': function(e) {
            var txt;
            var r = confirm("do you want to delete this?");
            if (r == true) {
                //txt="You pressed OK!";
                book.remove({
                    _id: this._id
                });
            }
            else {
                // txt="You pressed Cancel!";
            }
        }
    }

);



//--- commentForm ---
Template.new.events({

    'click #send': function(e) {
        e.preventDefault();

        // alert('you clicked on Post');


        /** get data from form **/
        var name = $("#name").val()
        var comment = $("#comment").val()

        //we put name and comment in 1 object to put it in "table"
        var data = {
            'title': name,
            'url': comment,
            'time': new Date(),
            'during': 0
        }

        console.log(data)
            //check if data not empty
        if (data.title && data.url) {

            //we put data in database :b
            book.insert(data)


            //erase content of #comment only
            $("#name,#commentgits").val("");
        }
        else {
            //show error message if fields are empty
            alert("Empty fields")
        }



    },

    'click #clear': function(e) {
        e.preventDefault();
        //   alert('you clicked on Clear');

        //select #name and #comment and replace content by ""
        $("#name,#comment").val("")
    }

});
//--- /commentForm ---
/**
 * Save when someone close window
 */
closingWindow = function(){
    
                        book.update({
                        _id: currentLink
                    }, {
                        $set: {
                            during: timer
                        }
                    });
                    
                
 
}

//----- History of timer ----
Template.history.helpers({
    stories:function()
    {
        History = bookHistory.find({}, {sort: {date: -1}})
       // console.log(history)
       History = History.fetch();
        return History;
    }
});


  
Template.history.events({
  'dblclick':function()
    {
   
   chartsOn = !chartsOn;
   if(chartsOn)
   {
    $("#chartContainer").html("");
    return
   }
   
   
        var history = bookHistory.find({}, {sort: {date: -1}})
        var dt = history.fetch();
         var minDate,maxDate;
        var data = [];
        dt.forEach(function (d) {
            if(!maxDate)
                maxDate=d.date;
                
            minDate=d.date;
            data.push({"Shift":d.subject,"Date":d3time(d.date),"Value":d.timerOn,"tum tum":"kiki"})});
         //console.log(dt)
       var svg = dimple.newSvg("#chartContainer", 1000, 600);
 
     // The default data set for these examples has regular times
    // and the point of this demo is to show the time axis
    // functionality, therefore a small bespoke data set is used.


    // Create Separate Date and Time, this allows us to draw them
    // on separate axes.  Despite the time axis only displaying
    // the time portion, the whole date is used so they need to
    // have the same date allocated
    data.forEach(function (d) {
        d["Day"] = d["Date"].substring(0, d["Date"].length - 6);
        d["Time of Day"] =
            "2000-01-01 " + d["Date"].substring(d["Date"].length - 5);
    }, this);

    // Create the chart as usual
    var myChart = new dimple.chart(svg, data);
    myChart.setBounds(70, 40, 800, 320)
    
    // Add the x axis reading dates in the format 01 Jan 2012
    // and displaying them 01 Jan
    var x = myChart.addTimeAxis("x", "Day", "%d %b %Y", "%d %b");

    // Add the y axis reading dates and times but only outputting
    // times.  
    var y = myChart.addTimeAxis("y", "Time of Day",
        "%Y-%m-%d %H:%M", "%H:%M");

    // Size the bubbles by volume
    var z = myChart.addMeasureAxis("z", "Value");
    
    // Setting min and max dates requires them to be set
    // as actual javascript date objects
    x.overrideMin = minDate;
    x.overrideMax = maxDate;
    y.overrideMin = new Date("01/01/2000 0:00 am");
    y.overrideMax = new Date("01/01/2000 11:59 pm");

    // Show a label for every 4 weeks.
    x.timePeriod = d3.time.days;
    x.timeInterval = 2;

    // Control bubble sizes by setting the max and min values    
    z.overrideMin = 900;
    z.overrideMax = 3000;

    // Add the bubble series for shift values first so that it is
    // drawn behind the lines
    myChart.addSeries("Shift", dimple.plot.bubble);

    // Add the line series on top of the bubbles.  The bubbles
    // and line points will naturally fall in the same places
    var s = myChart.addSeries("Shift", dimple.plot.line);

    // Add line markers to the line because it looks nice
    s.lineMarkers = true;

    // Show a legend
    myChart.addLegend(180, 10, 360, 20, "right");

    // Draw everything
    myChart.draw();
 return dt

    }
});

Template.localHistory.helpers({
    stories:function()
    {
        var id = Template.currentData().id;
        if(id)
        {
        var history = bookHistory.find({"subjectId":id}, {sort: {date: -1}})
        return history;
        }
    }
});

         
function autoResize(id){
    console.log("resized")
    var newheight;
    var newwidth;

    if(document.getElementById){
        newheight = document.getElementById(id).contentWindow.document .body.scrollHeight;
        newwidth = document.getElementById(id).contentWindow.document .body.scrollWidth;
    }

    document.getElementById(id).height = (newheight) + "px";
    document.getElementById(id).width = (newwidth) + "px";
}
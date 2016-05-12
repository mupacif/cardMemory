  Template.base.onCreated( function() {
     Meteor.subscribe("post");

  }
  );
  
    Template.links.onCreated( function() {

     Meteor.subscribe("book");
      Meteor.subscribe("time");
  }
  
 
  );
  
  Template.book.onCreated( function() {

  Meteor.startup(function(){
    console.log('------------------------------------------------');

    $(window).bind('beforeunload', function() {
        closingWindow();

        // have to return null, unless you want a chrome popup alert
        return "Dude are you really sure, you want to stop to study and give up on your future??";

        // have to return null, unless you want a chrome popup alert
        //return 'Are you sure you want to leave your Vonvo?';
    });
});
  }
  
 
  );
  
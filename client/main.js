  Template.base.onCreated( function() {
     Meteor.subscribe("post");

  }
  );
  
    Template.links.onCreated( function() {

     Meteor.subscribe("book");
  }
  );
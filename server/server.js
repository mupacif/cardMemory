
var Hello=0;
Meteor.onConnection(function(connection){
  Hello++; 
  console.log(Hello);
});
Meteor.publish("post", function()
{
return post.find();

});


Meteor.publish("book", function()
{
return book.find();

});
/**
 * 10/05/16
 */
Meteor.publish("time", function()
{
return time.find();

});

 
Meteor.methods({
'insertPost'(doc)
{
console.log("server methods"+doc.question);
post.insert(doc);
}

});


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

 
Meteor.methods({
'insertPost'(doc)
{
console.log("server methods"+doc.question);
post.insert(doc);
}

});

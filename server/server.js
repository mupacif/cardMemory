
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
 * 12/05/16 DEPRICATED: cela n'a pas fonctionné ainsi
 */
Meteor.publish("time", function()
{
return time.find();

});

/**
 * 12/05/16
 * Table historique des temps
 */
Meteor.publish("bookHistory", function()
{
return bookHistory.find();

});

 
Meteor.methods({
'insertPost'(doc)
{
console.log("server methods"+doc.question);
post.insert(doc);
}

});

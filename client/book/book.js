

Template.links.helpers(
    {
         links: function() {
             return book.find({});
         }
        
    }
    );
    
Template.links.events(
    {
    'click .load': function(e){
             
                $("#frameDemo").attr("src", $(e.currentTarget).data("url"));

            },'click .glyphicon-remove-circle': function(e) {
      var txt;
      var r=confirm("do you want to delete this?");
      if (r==true) {
        txt="You pressed OK!";
         book.remove( {
        _id: this._id
      });
      }
      else {
        txt="You pressed Cancel!";
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
            'time': new Date()
          }

console.log(data)
 //check if data not empty
    if (data.title && data.url) {

          //we put data in database :b
             book.insert(data)


      //erase content of #comment only
      $("#name,#comment").val("");
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
    
    

  // counter starts at 0
  Session.setDefault('counter', 0);
  Session.setDefault('matiere', 'meteorjs');
  Template.head.events( {
    'click #load': function(e) {
      e.preventDefault();
      // increment the counter when button is clicked
      //Session.set('matiere', Session.get('counter') + 1);
      if ($("input").val()) {
        Session.set('matiere', $("input").val());
        alert("cours:" + Session.get('matiere'));
      }
      else alert("Entrez un cours");
    },
    
        'click #delete': function(e) {
      e.preventDefault();
            var r=confirm("do you want to delete this?");
      if (r==true) {
        if($("input").val())
        {
        alert("You pressed OK!:");
            post.remove( {
        matiere: $("input").val()
      });
        }
        else
        alert("no thing selected")
      }
      
    }
  }
  );
  Template.head.helpers( {
    tasks: function() {
      var myArray=post.find().fetch();
      return distinctArray=_.uniq(myArray, false, function(d) {
        return d.matiere
      }
      );
      // return _.pluck(distinctArray, 'question');;
    }
    , pwd: function() {
      return Session.get('matiere');
    }
    ,
  }
  );

  Template.base.helpers( {
    tasks: function() {
      return post.find( {
        matiere: Session.get('matiere')
      }
      , {
        sort: {
          'level': 1
        }
      }
      );
    }
    , /**
     * Somme de tous les avancements 
     */
    ft: function() {
      var sum=0;
      var i=0;
      $(".level").each(function(index) {
        sum +=parseInt($(this).val());
      }
      );
      return sum;
    }
  }
  );
  Template.inside.events( {
    'dblclick .parent': function(e) {
      //this contiont answer/question
      //event e d'autres éléments plus important
      e.preventDefault();
      $(e.currentTarget).siblings('.parent').find('.child').slideUp();
      $(e.currentTarget).find(".child").slideToggle();
      //$(".child").slideToggle();
    },
/**
* Recupère la valeur du boutton la transfere sur la jauge puis simule in clic
*/
    'click .btn':function(e){
	$("#"+this._id).val(parseInt($(e.currentTarget).val()))
	$("#"+this._id).trigger("click");
	}
  }
  );
  Template.form.events( {
    'click button': function(e) {
      e.preventDefault();
      var question=$('textarea#question').val();
      var answer=$('textarea#answer').val();
      var level=$('#level').val();
      if (question !="" && answer !="" && Session.get('matiere')) {
        var card= {
          'matiere': Session.get('matiere'), 'question': question, 'answer': answer, 'level': level
        }
        ;
        //ajout de l'element 
        Meteor.call("insertPost", card);
        $('textarea#question, textarea#answer').val("");
      }
      else {
        alert("fail");
      }
    }
  }
  );
  Template.hello.helpers( {
    counter: function() {
      return Session.get('counter');
    }
  }
  );
  Template.hello.events( {
    'click button': function() {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    }
  }
  );
  Template.inside.events( {
    /**
     * update the slidder level 
     */
    'click .level': function(e) {
      var sum=0;
      var i=0;
      $(".level").each(function(index) {
        i++;
        sum +=parseInt($(this).val());
      }
      );
      $("#ft").css("width", sum / i + "%");
      $("#ft").text(sum / i + "%");
      //.siblings('.parent').find('.child').slideUp();
      //console.log($(e.currentTarget).val());	
      //console.log(this._id); 
      post.update( {
        _id: this._id
      }
      , {
        $set: {
          level: $(e.currentTarget).val()
        }
      }
      );
    }
    , 'click .glyphicon-remove-circle': function(e) {
      var txt;
      var r=confirm("do you want to delete this?");
      if (r==true) {
        txt="You pressed OK!";
         post.remove( {
        _id: this._id
      });
      }
      else {
        txt="You pressed Cancel!";
      }
    }
  }
  );


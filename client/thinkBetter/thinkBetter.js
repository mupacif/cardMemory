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
            var History=thinkBetter.find({});
            History.fetch()
            return History;
        },
      
    });
    
 /**
 * Pourcentage
 */
 UI.registerHelper('nameMood',function(nb1){ 

   
    return idc[nb1];
    
});
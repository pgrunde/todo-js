// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require_tree .

$(document).ready(function() {
  $('#still-todo').append('<h2>Todo!</h2><div id="flash"></div><table id="todo-table"></table><hr>');
  $('#done-todo').append('<h2>Completed!</h2></div><table id="done-table"></table>');

  $('#create').on("click", function(){
    $('#flash').css("background-color","blue").empty().append("<p>Todo Created!</p><div class='right' id='flash-close'>X</div>").show();
    $('#todo-table').append('<tr><td><div id="todo">'+ $('#input').val() +'</div><div class="right" id="todoComplete">✓</div><div class="right" id="todoClose">X</div></td></tr>');
    $('#input').val('');
    setTimeout(function(){
      $('#flash').empty().hide();
    }, 5000)
  });

  $(document).on("click", "#flash", function(){
    $(this).empty().hide()
  });

  $(document).on("click", "#todoClose", function(){
    $(this).parent().parent().remove();
    $('#flash').css("background-color","red").empty().append("<p>Todo Deleted!</p><div class='right' id='flash-close'>X</div>").show();
    setTimeout(function(){
      $('#flash').empty().hide();
    }, 5000);

    completeIsEmpty()
  });

  $(document).on("click", "#todoComplete", function(){
    var todo = $(this).siblings("#todo").text();
    $('#flash').css("background-color","green").empty().append("<p>Todo Completed!</p><div class='right' id='flash-close'>X</div>").show();
    $(this).parent().parent().remove();
    $('#done-table').append('<tr><td><div id="todoDone">'+ todo +'</div><div class="right" id="todoUndo"><h2>⎌</h2></div><div class="right" id="todoClose">X</div></td></tr>');
    $('#done-todo').show();
    setTimeout(function(){
      $('#flash').empty().hide();
    }, 5000)
  });

  var completeIsEmpty = function(){
    var doneTableContents = $('#done-table').find('#todoDone').text();
    if(doneTableContents == ""){
      $('#done-todo').hide()
    }else{
      $('#done-todo').show()
    }
  };


});

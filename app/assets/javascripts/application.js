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
  var flashTimer;

  $('#still-todo').append('<h2>Todo!</h2><div id="flash"></div><table id="todo-table"></table><hr>');
  $('#done-todo').append('<h2>Completed!</h2></div><table id="done-table"></table>');

  $('#create').on("click", function(){
    flashMessage("blue","Todo Created!");
    addTodo($('input').val());
    $('#input').val('');
  });

  $(document).on("click", "#flash", function(){
    $(this).empty().hide()
  });

  $(document).on("click", "#todoClose", function(){
    $(this).parent().parent().remove();
    flashMessage("red","Todo Deleted!");
    completeIsEmpty()
  });

  $(document).on("click", "#todoComplete", function(){
    var todo = $(this).siblings("#todo").text();
    flashMessage("green","Todo Completed!");
    $(this).parents("tr").remove();
    $('#done-table').append('<tr><td><div id="todoDone">'+ todo +'</div> <div class="right"><div id="todoUndo">⎌</div> <div id="todoClose">X</div></div></td></tr>');
    $('#done-todo').show();
  });

  $(document).on("click", "#todoUndo", function(){
    var todo = $(this).parents("tr").find("#todoDone").text();
    $(this).parents("tr").remove();
    flashMessage("blue","Todo Created!");
    addTodo(todo);
    completeIsEmpty()
  });

  var completeIsEmpty = function(){
    var doneTableContents = $('#done-table').find('#todoDone').text();
    if(doneTableContents == ""){
      $('#done-todo').hide()
    }else{
      $('#done-todo').show()
    }
  };

  var flashMessage = function(color,text) {
    clearTimeout(flashTimer);
    $('#flash').css("background-color",color).empty().append("<p>" + text + "</p><div class='right' id='flash-close'>X</div>").show();
    flashTimer = setTimeout(function(){
      $('#flash').empty().hide();
    }, 5000);
  };

  var addTodo = function(todo){
    $('#todo-table').append('<tr><td><div id="todo">'+ todo +'</div><div class="right" id="todoComplete">✓</div> <div class="right" id="todoClose">X</div></td></tr>');
  };

});

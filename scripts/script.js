var ideas = JSON.parse(localStorage.getItem('idea'));

$('.second-section').on('click', '.delete-button', deleteIdea);
$('.second-section').on('click', '.up-vote', upVote);
$('.second-section').on('click', '.down-vote', downVote);
$("form").change(enable);
$('.list').on('keydown', saveIdeaUpdates)
$(':input').parent().on('submit',formActions);

$(document).ready(oldIdeas());

function formActions(e) {
  enable();
  e.preventDefault();
  cloneIdea();
  $(':input').parent().trigger('reset');
  $('.title-input').focus()
};

function enable() {
  if ($('.body-input').val() == "" && $('.title-input').val() == "") {
    setDisableAttribute();
  } else {
    removeDisableAttribute();
  }
};

function removeDisableAttribute() {
  $("input[type=submit]").removeAttr('disabled');
};

function setDisableAttribute() {
  $("input[type=submit").attr('disabled', '')
};

function oldIdeas() {
  ideas.forEach(function(value, a) {
    prependExistingIdeas(value);
  })
};

function cloneIdea() {
  var boxCopy = $('#idea-template').clone(true);
  var ideaObject = ideaStorage();
  var title = $(boxCopy).find('.title').text(ideaObject.title);
  var body = $(boxCopy).find('.example-body').text(ideaObject.body);
  $(boxCopy).attr('id', ideaObject.id);
  $(boxCopy).removeAttr();
  $('.list').prepend(boxCopy);
  disableSave();
};

function disableSave() {
  $("input[type=submit]").attr('disabled','disabled');
};

function prependExistingIdeas(idea) {
  var boxCopy = $('#idea-template').clone(true);
  var title = $(boxCopy).find('.title').text(idea.title);
  var body = $(boxCopy).find('.example-body').text(idea.body);
  var importance = $(boxCopy).find('.qual-type').text(idea.importance);
  $(boxCopy).attr('id', idea.id);
  $('.list').prepend(boxCopy);
};

function ideaStorage() {
  var idea = {}
  idea.title = $('.title-input').val();
  idea.body = $('.body-input').val();
  idea.importance = 'Normal';
  idea.id = $.now();
  ideas.push(idea);
  setItemToLocalStorage();
  return idea;
};

function deleteIdea(ev) {
  var buttonParent = ev.target.closest('.new-ideas');
  buttonParent.remove()
  for(i = 0; i < ideas.length; i++) {
    var existingIdeaId = ideas[i].id;
    if (existingIdeaId == buttonParent.id) {
        ideas.splice(i,1);
        setItemToLocalStorage();
    };
  };
}; 

 function arrayImportance() {
  return [
    'None',
    'Low',
    'Normal', 
    'High',
    'Critical'
  ];
};

function upVote() {
  var importance = arrayImportance()
  var currentImportance = $(this).parent().find('.qual-type').text()
  var myIndex = importance.indexOf(currentImportance)
  if (myIndex < importance.length - 1) {
    myIndex++
    } else {
    myIndex = 4
  }; 
  var newImportance = $(this).parent().find('.qual-type').text(importance[myIndex]);
  var cardId = $(this).parents().closest('.new-ideas').attr('id')
  saveVote(cardId, newImportance);
};

function downVote() {
  var importance = arrayImportance()
  var currentImportance = $(this).parent().find('.qual-type').text()
  var myIndex = importance.indexOf(currentImportance)
  if (myIndex <= 0) {
    myIndex = 0
  } else {
    myIndex--
  }; 
  var newImportance = $(this).parent().find('.qual-type').text(importance[myIndex]);
  var cardId = $(this).parents().closest('.new-ideas').attr('id')
  saveVote(cardId, newImportance);
};

function saveVote(cardId, newImportance) {
  var importance = arrayImportance()
  for(i = 0; i < ideas.length; i++) {
    var existingIdeaId = ideas[i].id;
    if(existingIdeaId == cardId) {
    ideas[i].importance = newImportance.text()
  };
};   
  setItemToLocalStorage();
};

function setItemToLocalStorage() {
  localStorage.setItem('idea', JSON.stringify(ideas));
};

function saveIdeaUpdates(ev) {
  var updatedIdea = ev.target.closest('.new-ideas');
  var updatedIdeaTitle = updatedIdea.querySelector('.title');
  var updatedIdeaBody = updatedIdea.querySelector('.example-body');
  var updatedIdeaId = updatedIdea.id;
  if (ev.which === 13) {
    ev.preventDefault()
    updatedIdeaBody.blur();
    updatedIdeaTitle.blur()
  }
  for(i = 0; i < ideas.length; i++) {
    var existingIdeaId = ideas[i].id;
    if(existingIdeaId == updatedIdeaId) {
    ideas[i].title = updatedIdeaTitle.innerText;
    ideas[i].body = updatedIdeaBody.innerText;
    };
  };
  setItemToLocalStorage();
};

$('.search-box').on('keyup',function() {
  var ideasSearch = document.querySelectorAll('.new-ideas');
  var searchTerm = $(this).val().toLowerCase();
  $('li').each(function() {
  $(this).attr('ideasSearch', $(this).text().toLowerCase())
  })
  $('li').each(function() {
    if($(this).filter('[ideasSearch *= ' + searchTerm + ']').length > 0 || searchTerm.length < 1) {
  $(this).show();
  $('#idea-template').hide();
    } else {
  $(this).hide();
  }  
});
});

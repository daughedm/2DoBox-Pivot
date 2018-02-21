var list = document.querySelector('.secondSection ul');
var form = document.forms['inputForm'];
var ideaBoxContainer = document.querySelector('.list');
var ideaString = localStorage.getItem('idea');
var ideas = JSON.parse(ideaString);

$('.secondSection').on('click', '.delete-button', deleteIdea);
$('.secondSection').on('click', '.up-vote', upVote);
$('.secondSection').on('click', '.down-vote', downVote);
$("form").change(enable);

$(document).ready(oldIdeas());

ideaBoxContainer.addEventListener('input', function(event) {
  saveIdeaUpdates(event);
});

list.addEventListener('input', function(event) {
  saveIdeaUpdates(event);
});

// clone box with the user's input
form.addEventListener('submit',function(e) {
  enable();
  e.preventDefault();
  cloneIdea();
  form.reset();
});

// single responsibility, enables and dsiables the save button based on input fields.
function enable() {
  if ($('.bodyInput').val() == "" && $('.titleInput').val() == "") {
    setDisableAttribute();
  } else {
    removeDisableAttribute();
  }
};

function removeDisableAttribute() {
  $("input[type=submit]").removeAttr('disabled');
}

function setDisableAttribute() {
  $("input[type=submit").attr('disabled', '')
}

function oldIdeas() {
  ideas.forEach(function(value, a) {
    prependExistingIdeas(value);
  })
}

function cloneIdea() {
  var boxCopy = $('#ideaTemplate').clone(true);
  var ideaObject = ideaStorage();
  var title = $(boxCopy).find('.title').text(ideaObject.title);
  var body = $(boxCopy).find('.example-body').text(ideaObject.body);
  $(boxCopy).attr('id', ideaObject.id);
  $(boxCopy).removeAttr();
  $(list).prepend(boxCopy);
  disableSave();
}

function disableSave() {
  $("input[type=submit]").attr('disabled','disabled');
}

function prependExistingIdeas(idea) {
  var boxCopy = $('#ideaTemplate').clone(true);
  var title = $(boxCopy).find('.title').text(idea.title);
  var body = $(boxCopy).find('.example-body').text(idea.body);
  var importance = $(boxCopy).find('.qualType').text(idea.importance);
  $(boxCopy).attr('id', idea.id);
  $(list).prepend(boxCopy);
}

function ideaStorage() {
  var idea = {}
  idea.title = $('.titleInput').val();
  idea.body = $('.bodyInput').val();
  idea.importance = 'Normal';
  idea.id = $.now();
  ideas.push(idea);
  setItemToLocalStorage();
  return idea;
}

function deleteIdea(ev) {
  var buttonParent = ev.target.closest('.newIdeas');
  buttonParent.remove()
  for(i = 0; i < ideas.length; i++) {
    var existingIdeaId = ideas[i].id;
    if (existingIdeaId == buttonParent.id) {
        ideas.splice(i,1);
        setItemToLocalStorage();
    }
  }
} 

 function arrayImportance() {
  return [
    'None',
    'Low',
    'Normal', 
    'High',
    'Critical'
  ];
}

function upVote() {
  var importance = arrayImportance()
  var currentImportance = $(this).parent().find('.qualType').text()
  var myIndex = importance.indexOf(currentImportance)
  if (myIndex < importance.length - 1) {
    myIndex++
  } else {
    myIndex = 4
  } 
  var newImportance = $(this).parent().find('.qualType').text(importance[myIndex]);
  var cardId = $(this).parents().closest('.newIdeas').attr('id')
  saveVote(cardId, newImportance);
}

function downVote() {
  var importance = arrayImportance()
  var currentImportance = $(this).parent().find('.qualType').text()
  var myIndex = importance.indexOf(currentImportance)
  if (myIndex <= 0) {
    myIndex = 0
  } else {
    myIndex--
  } 
  var newImportance = $(this).parent().find('.qualType').text(importance[myIndex]);
  var cardId = $(this).parents().closest('.newIdeas').attr('id')
  saveVote(cardId, newImportance);
}

function saveVote(cardId, newImportance) {
  var importance = arrayImportance()
  for(i = 0; i < ideas.length; i++) {
    var existingIdeaId = ideas[i].id;
    if(existingIdeaId == cardId) {
    ideas[i].importance = newImportance.text()
  }
}   
  setItemToLocalStorage();
}

function setItemToLocalStorage() {
  localStorage.setItem('idea', JSON.stringify(ideas));
}

function saveIdeaUpdates(ev) {
  var updatedIdea = ev.target.closest('.newIdeas');
  var updatedIdeaTitle = updatedIdea.querySelector('.title').innerText;
  var updatedIdeaBody = updatedIdea.querySelector('.example-body').innerText;
  var updatedIdeaId = updatedIdea.id;
  for(i = 0; i < ideas.length; i++) {
  var existingIdeaId = ideas[i].id;
  if(existingIdeaId == updatedIdeaId) {
  ideas[i].title = updatedIdeaTitle;
  ideas[i].body = updatedIdeaBody;
}
}
  setItemToLocalStorage();
}

$('.searchBox').on('keyup',function() {
  var ideasSearch = document.querySelectorAll('.newIdeas');
  var searchTerm = $(this).val().toLowerCase();
  $('li').each(function() {
  $(this).attr('ideasSearch', $(this).text().toLowerCase())
  })
  $('li').each(function() {
    if($(this).filter('[ideasSearch *= ' + searchTerm + ']').length > 0 || searchTerm.length < 1) {
  $(this).show();
  $('#ideaTemplate').hide();
    } else {
  $(this).hide();
  }  
})
})

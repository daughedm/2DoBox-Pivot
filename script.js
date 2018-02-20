// var boxTemplate = document.querySelector('#ideaTemplate');
var saveButton = document.querySelector('.saveButton');
var list = document.querySelector('.secondSection ul');
// var titleInput = document.querySelector('.titleInput').value;
// var bodyInput= document.querySelector('.bodyInput').value;
var form = document.forms['inputForm'];
var ideaBoxContainer = document.querySelector('.list');
var ideaString = localStorage.getItem('idea');
var ideas = JSON.parse(ideaString);

$('.secondSection').on('click', '.delete-button', deleteIdea);
$('.secondSection').on('click', '.up-vote', upVote);
$('.secondSection').on('click', '.down-vote', downVote);
$("form").change(enable);

if(ideas) {
  window.onload = oldIdeas();
  } else {
  ideas = [];
}
ideaBoxContainer.addEventListener('input', function(event) {
  saveIdeaUpdates(event);
});

list.addEventListener('input', function(event) {
  saveIdeaUpdates(event);
});

ideaBoxContainer.addEventListener('blur', editIdea())
list.addEventListener('blur', editIdea())
// clone box with the user's input
form.addEventListener('submit',function(e) {
  enable()
  e.preventDefault();

  cloneIdea();
  form.reset();
});

// single responsibility, enables and dsiables the save button based on input fields.
function enable() {
  if ($('.bodyInput').val() == "" && $('.titleInput').val() == "") {
    setDisableAttribute();
  } else {
    removeDisableAttribute()
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
    prependExistingIdeas(ideas[a]);
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
  disableSave()
}

function disableSave() {
  $("input[type=submit]").attr('disabled','disabled');
}

// single responsibiluty, needs refactoriing, prepends ideas to the ul 
function prependExistingIdeas(idea) {
  var boxCopy = $('#ideaTemplate').clone(true);
  var title = $(boxCopy).find('.title').text(idea.title);
  var body = $(boxCopy).find('.example-body').text(idea.body);
  var importance = $(boxCopy).find('.qualType').text(idea.importance);
  $(boxCopy).attr('id', idea.id);
  $(list).prepend(boxCopy);
  // title.text(idea.title);
  // body.text(idea.body);
  // importance.text(idea.importance);

}

function ideaStorage() {
  var idea = {}
  idea.title = $('.titleInput').val();
  idea.body = $('.bodyInput').val();
  idea.importance = 'Normal';
  idea.id = $.now()
  ideas.push(idea);
  var ideaString = JSON.stringify(ideas);
  localStorage.setItem('idea', ideaString);
  return idea;
}

function deleteIdea(ev) {
  var jack = ev.target.closest('.newIdeas');
  jack.remove()
  for(i = 0; i < ideas.length; i++) {
    var existingIdeaId = ideas[i].id;
    if (existingIdeaId == jack.id) {
        ideas.splice(i,1)
        localStorage.setItem('idea', JSON.stringify(ideas));
       
}
}
} 

function deleteLocalStorage() {
  console.log(i)
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
  var existingIdeasObj = JSON.parse(localStorage.getItem('idea'));
  for(i = 0; i < existingIdeasObj.length; i++) {
    var existingIdeaId = existingIdeasObj[i].id;
    if(existingIdeaId == cardId) {
    existingIdeasObj[i].importance = newImportance.text()
  }
} 
  var newIdeaString = JSON.stringify(existingIdeasObj);
  localStorage.setItem('idea', newIdeaString);
}
 
function saveIdeaUpdates(ev) {
  var updatedIdea = ev.target.closest('.newIdeas');
  var updatedIdeaTitle = updatedIdea.querySelector('.title').innerText;
  var updatedIdeaBody = updatedIdea.querySelector('.example-body').innerText;
  var updatedIdeaId = updatedIdea.id;
  var existingIdeasObj = JSON.parse(localStorage.getItem('idea'));
  for(i = 0; i < existingIdeasObj.length; i++) {
  var existingIdeaId = existingIdeasObj[i].id;
  if(existingIdeaId == updatedIdeaId) {
  existingIdeasObj[i].title = updatedIdeaTitle;
  existingIdeasObj[i].body = updatedIdeaBody;
}
}
  var newIdeaString = JSON.stringify(existingIdeasObj);
  localStorage.setItem('idea', newIdeaString);
}

function editIdea() {
  $('h2, .body-text').keydown(function(e) {
    if (e.which === 13) {
      $(this).blur();
    }
  });
};

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

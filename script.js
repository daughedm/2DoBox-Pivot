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
  
console.log(form)


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

// clone box with the user's input
form.addEventListener('submit',function(e) {
  enable()
  e.preventDefault();

  cloneIdea();
  form.reset();
});

// single responsibility, enables and dsiables the save button based on input fields.
function enable() {
  if ($('.bodyInput').val() !== "" && $('.titleInput').val() !== "") {
    removeDisableAttribute();
}
};

function removeDisableAttribute() {
  $("input[type=submit]").removeAttr('disabled');
}

function oldIdeas() {
  ideas.forEach(function(value, a) {
    prependExistingIdeas(ideas[a]);
  })
}

function cloneIdea() {
  var boxCopy = $('#ideaTemplate').clone(true);
  var ideaObject = ideaStorage();
  console.log(ideaObject);
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
  idea.importance = 'normal';
  idea.id = $.now()
  ideas.push(idea);
  var ideaString = JSON.stringify(ideas);
  localStorage.setItem('idea', ideaString);
  return idea;
}

function deleteIdea(ev) {
  var box = ev.target.closest('.newIdeas');
  var id = box.id;
  list.removeChild(box);
  ideas = ideas.filter(function(el) {
  return el.id !== id;
});
  var ideaStr = JSON.stringify(ideas);
  localStorage.setItem('idea', ideaStr);
}
var importance = [
'None',
'Low',
'Normal', 
'High',
'Critical'
];

var myIndex = 2;
var print = $(this).parent().find('.qualType');
print.innerHTML = importance[2];

function upVote() {
  if (myIndex < importance.length - 1) {
    myIndex++
  } else {
    myIndex = 4
  } 
  $(this).parent().find('.qualType').text(importance[myIndex]);
  // saveVote(event);
}

function downVote() {
  if (myIndex <= 0) {
    myIndex = 0
  } else {
    myIndex--
  } 
  $(this).parent().find('.qualType').text(importance[myIndex]);
  console.log(myIndex)
  // saveVote(event);
}

function saveVote(ev) {
  var updatedIdeaId = ev.target.closest('.newIdeas').attr('id');
  var existingIdeasObj = JSON.parse(localStorage.getItem('idea'));
  for(i = 0; i < existingIdeasObj.length; i++) 
    var existingIdeaId = existingIdeasObj[i].id;
    if(existingIdeaId == updatedIdeaId) {
    // existingIdeasObj[i].title = updatedIdeaTitle;
    // existingIdeasObj[i].body = updatedIdeaBody;
    existingIdeasObj[i].importance = 
   }
}

function saveIdeaUpdates(ev) {
  var updatedIdea = ev.target.closest('.newIdeas');
  var updatedIdeaTitle = updatedIdea.querySelector('.title').innerText;
  var updatedIdeaBody = updatedIdea.querySelector('.example-body').innerText;
  var updatedIdeaId = updatedIdea.id;
  var existingIdeasObj = JSON.parse(localStorage.getItem('idea'));
  for(i = 0; i < existingIdeasObj.length; i++) 
  var existingIdeaId = existingIdeasObj[i].id;
  if(existingIdeaId == updatedIdeaId) {
  existingIdeasObj[i].title = updatedIdeaTitle;
  existingIdeasObj[i].body = updatedIdeaBody;
}
  var newIdeaString = JSON.stringify(existingIdeasObj);
  localStorage.setItem('idea', newIdeaString);
}

// search box
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

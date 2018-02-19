var boxTemplate = document.querySelector('#ideaTemplate');
var saveButton = document.querySelector('.saveButton');
var list = document.querySelector('.secondSection ul');
var titleInput = document.querySelector('.titleInput').value;
var bodyInput= document.querySelector('.bodyInput').value;
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
  if ($('bodyInput') !== "" && $('titleInput') !== "") {
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
  var boxCopy = boxTemplate.cloneNode(true);
  var ideaObject = ideaStorage();
  var title = boxCopy.querySelector('.title');
  var body = boxCopy.querySelector('.example-body');
  boxCopy.id = ideaObject.id;
  title.innerText = ideaObject.title;
  body.innerText = ideaObject.body;
  list.prepend(boxCopy);
  disableSave()
}

function disableSave() {
  $("input[type=submit]").attr('disabled','disabled');
}

// single responsibiluty, needs refactoriing, prepends ideas to the ul 
function prependExistingIdeas(idea) {
  var boxCopy = boxTemplate.cloneNode(true);
  var title = boxCopy.querySelector('.title');
  var body = boxCopy.querySelector('.example-body');
  boxCopy.id = idea.id;
  list.prepend(boxCopy);
  title.innerText = idea.title;
  body.innerText = idea.body;
}

function ideaStorage() {
  var idea = {
    quality: 'swill'
  };
  idea.title = document.querySelector('.titleInput').value;
  idea.body = document.querySelector('.bodyInput').value;
  idea.id = $.now()
  ideas.push(idea);
  var ideaString = JSON.stringify(ideas);
  localStorage.setItem('idea', ideaString);
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
  myIndex = (myIndex+1)%(importance.length);
  console.log(myIndex)
  $(this).parent().find('.qualType').text(importance[myIndex]);



  // var currentIndex = 0;
  // currentIndex.forEach(function () {

  // })
  // currentIndex = currentIndex;
  // console.log(currentIndex)

  // var currentImportance = $(this).parent().find('.qualType');
  // console.log(currentImportance.text(importance[currentIndex]))
  // currentImportance.innerHTML = importance[currentIndex];

}



function downVote() {
  myIndex = (myIndex - 1)%(importance.length);
  console.log(myIndex)
  $(this).parent().find('.qualType').text(importance[myIndex]);  
}

function saveIdeaUpdates(ev) {
  var updatedIdea = ev.target.closest('.newIdeas');
  console.log(updatedIdea)
  var updatedIdeaTitle = updatedIdea.querySelector('.title').innerText;
  var updatedIdeaBody = updatedIdea.querySelector('.example-body').innerText;
  var updatedIdeaId = updatedIdea.id;
  var existingIdeasObj = JSON.parse(localStorage.getItem('idea'));

// existingIdeasObj.forEach(function(value, a) {
//   var jack = existingIdeasObj[a].id
//   console.log(jack)
//   })


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

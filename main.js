'use strict';
console.log("writing to screen");


// var config = {
//     apiKey: FbCreds.apiKey,
//     authDomain: FbCreds.authDomain
//   };

// firebase.initializeApp(config);
// var provider = new firebase.auth.GoogleAuthProvider();



/*Welcome page functions*/
function Authenticate(){
  loginUser()
  .then( (data) => {
  	//check firebase for credentials
    getUserInfo(data.user.uid)
    .then( (userData) => {
      console.log('userData', userData);
      let FBKey = Object.keys(userData)[0];
    	//if user exists - bring back progress, scores, etc.
      if (userData[FBKey]) {
        console.log('we have a user', userData);
        //userData should be all relevant info, where are we storing it?
      } else { //if not user - create new user
        createUserInfo();
      }
    })
    .catch( (error) => {
      console.log('error authenticating', error);
    });
  })
  .catch( (error) => {
    console.log('error loggin in', error);
  })
	//route to main app page
}

function LoadUserSettings(user){
	//take the object from firebase with user information load the correct level/progress
  getUserInfo()
  .then( (userData) => {

  });
}

/*main page functions*/
function GetQuestions(level){
	return new Promise ( (resolve, reject) => {
        $.getJSON("questions.json", function(json) {
            if (json){
            	console.log("JSON: ", json);
                resolve(json[level])
            }else{
                reject(false)
            }
	    });
	})
}
NextQuestion();

function RandomizeQuestionOrder(){
	//take the question and randomize the order of the options
	//choose an option to use for the goal display
	//render the options on the cards


}


//Add event listener to card
$('.optionCard').click(function(event) {
	DisplayAnswer(event);
});
function DisplayAnswer(event){
	var toCurrent = $("p", event.target)[0];
	console.log("toCurrent", toCurrent.innerHTML);
	$('#current').html(toCurrent.innerHTML)
}

function CheckAnswer(){
	//onclick of a card this function checks if the answer is correct
	//totalPoint starts at 25
	//if correct - then add  points to total and move to next question
	//if not correct - then subtract 5 points from the question score and mark the answer as unavailable
}

function ProgressBar() {
	//render the correct progress on the progress bar
}

//Event Handlers for Level buttons
//load and render the level that is clicked
$("#level1Btn").on('click', () => {
	console.log("in level button click 1");
	GetQuestions("one");

});$("#level2Btn").on('click', () => {
	console.log("in level button click 2");
	GetQuestions("two");

});$("#level3Btn").on('click', () => {
	console.log("in level button click 3");
	GetQuestions("three");

});$("#level4Btn").on('click', () => {
	console.log("in level button click 4");
	GetQuestions("four");
});
// function LevelTabs(level){
	//load and render the level that was clicked
// }

function NextQuestion(){
	GetQuestions('one').then(function (levevl_questions) {
		console.log("JSON2: ", levevl_questions);
		// Set new instructions
		$("#instructions").html(levevl_questions.instruction);
		// Set the 4 options
		// Need to randomize the 0 index so we are randomizing questions
	    $("#option1").html(levevl_questions[0].options[0]);
	    $("#option2").html(levevl_questions[0].options[1]);
	    $("#option3").html(levevl_questions[0].options[2]);
	    $("#option4").html(levevl_questions[0].options[3]);
	})
}

function LevelUp() {
	//opens model with badge and congrats
	SaveProgress();
}


function SaveProgress(){
	//save the progress to firebase
}

function logout(){
	//log user out and show credits page
	$("#mainScreen").hide();
	$("#endScreen").show();
}

$("#doneBtn").on('click',logout);


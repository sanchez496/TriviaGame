(function() {
  var questions = [{
            question: 'Who is from the planet Kashyyyk?',
            choices: ["Darth Vader", "Han Solo", "Chewbacca", "R2D2"],
            correctAnswer: 2
        }, {
            question: "Who is the Captain of the Millennium Falcon?",
            choices: ["Darth Vader", "Han Solo", "Lando Calrissian", "C3PO"],
            correctAnswer: 1
        }, {
            question: "Who does Anakin Skywalker become?",
            choices: ["Darth Vader", "James Taylo", "Emperor Palpatine", "R2D2"],
            correctAnswer: 0
        }, {
            question: "Which character seeks to become a Jedi Knight and defeat the empire?",
            choices: ["C3PO", "Luke Skywalker", "Chewbacca", "R2D2"],
            correctAnswer: 1
        }, {
            question: "Who grew up on the plaent of Alderaan?",
            choices: ["Aunt Beru", "Padme Amidala", "Chewbacca", "Leia Organa"],
            correctAnswer: 3
        }, {
            question: "Who is the bounty hunter that was able to caputure Han Solo",
            choices: ["Bilbo Baggins", "Gollum", "Yoda", "Boba Fett"],
            correctAnswer: 3
        }, {
            question: "Which character went into hidding on the planet of Tatooine?",
            choices: ["Han Solo", "Obi Wan Kenobi", "Frodo Baggins", "Darth Maul"],
            correctAnswer: 3
        }, {
            question: "Who was give the mission to find General Kenobi to help the rebellion?",
            choices: ["Kylo Ren", "R2D2", "Luke Skywalker", "BB8"],
            correctAnswer: 1
  }];
  
  var questionCounter = 0; //Tracks question number
  var selections = []; //Array containing user choices
  var quiz = $('#quiz'); //Quiz div object
  
  // Display initial question
  displayNext();
  
  // Click handler for the 'next' button
  $('#next').on('click', function (e) {
    e.preventDefault();
    
    // Suspend click listener during fade animation
    if(quiz.is(':animated')) {        
      return false;
    }
    choose();
    
    // If no user selection, progress is stopped
    if (isNaN(selections[questionCounter])) {
      alert('Please make a selection!');
    } else {
      questionCounter++;
      displayNext();
    }
  });
  
  // Click handler for the 'prev' button
  // $('#prev').on('click', function (e) {
  //   e.preventDefault();
    
  //   if(quiz.is(':animated')) {
  //     return false;
  //   }
  //   choose();
  //   questionCounter--;
  //   displayNext();
  // });
  
  // Click handler for the 'Start Over' button
  // $('#start').on('click', function (e) {
  //   e.preventDefault();
    
  //   if(quiz.is(':animated')) {
  //     return false;
  //   }
  //   questionCounter = 0;
  //   selections = [];
  //   displayNext();
  //   $('#start').hide();
  // });
  
  // Animates buttons on hover
  // $('.button').on('mouseenter', function () {
  //   $(this).addClass('active');
  // });
  // $('.button').on('mouseleave', function () {
  //   $(this).removeClass('active');
  // });
  
  // Creates and returns the div that contains the questions and 
  // the answer selections
  function createQuestionElement(index) {
    var qElement = $('<div>', {
      id: 'question'
    });
    
    var header = $('<h2>Question ' + (index + 1) + ':</h2>');
    qElement.append(header);
    
    var question = $('<p>').append(questions[index].question);
    qElement.append(question);
    
    var radioButtons = createRadios(index);
    qElement.append(radioButtons);
    
    return qElement;
  }
  
  // Creates a list of the answer choices as radio inputs
  function createRadios(index) {
    var radioList = $('<ul>');
    var item;
    var input = '';
    for (var i = 0; i < questions[index].choices.length; i++) {
      item = $('<li>');
      input = '<input type="radio" name="answer" value=' + i + ' />';
      input += questions[index].choices[i];
      item.append(input);
      radioList.append(item);
    }
    return radioList;
  }
  
  // Reads the user selection and pushes the value to an array
  function choose() {
    selections[questionCounter] = +$('input[name="answer"]:checked').val();
  }
  
  // Displays next requested element
  function displayNext() {
    quiz.fadeOut(function() {
      $('#question').remove();
      
      if(questionCounter < questions.length){
        var nextQuestion = createQuestionElement(questionCounter);
        quiz.append(nextQuestion).fadeIn();
        if (!(isNaN(selections[questionCounter]))) {
          $('input[value='+selections[questionCounter]+']').prop('checked', true);
        }
        
        // Controls display of 'prev' button
        if(questionCounter === 1){
          $('#prev').show();
        } else if(questionCounter === 0){
          
          $('#prev').hide();
          $('#next').show();
        }
      }else {
        var scoreElem = displayScore();
        quiz.append(scoreElem).fadeIn();
        $('#next').hide();
        $('#prev').hide();
        $('#start').show();
      }
    });
  }
  
  // Computes score and returns a paragraph element to be displayed
  function displayScore() {
    var score = $('<p>',{id: 'question'});
    
    var numCorrect = 0;
    for (var i = 0; i < selections.length; i++) {
      if (selections[i] === questions[i].correctAnswer) {
        numCorrect++;
      }
    }
    
    score.append('You got ' + numCorrect + ' questions out of ' +
                 questions.length + ' right!!!');
    return score;
  }
})();
function callTimer() {
      var counter = 10;
      setInterval(function() {
      counter--;
      if (counter >= 0) {
          $("#counter").html("00:0" + counter);
      }
      if (counter === 0) {
          $("#counter").empty();
          clearInterval(counter);
      }
      }, 1000);
}

        callTimer();
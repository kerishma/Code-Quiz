# 04 Web APIs: Code Quiz

As you proceed in your career as a web developer, you will probably be asked to complete a coding assessment, which is typically a combination of multiple-choice questions and interactive challenges. Build a timed code quiz with multiple-choice questions. This app will run in the browser and feature dynamically updated HTML and CSS powered by your JavaScript code. It will also feature a clean and polished user interface and be responsive, ensuring that it adapts to multiple screen sizes.

## User Story

```
AS A coding bootcamp student
I WANT to take a timed quiz on JavaScript fundamentals that stores high scores
SO THAT I can gauge my progress compared to my peers
```

## Acceptance Criteria

```
GIVEN I am taking a code quiz
WHEN I click the start button
THEN a timer starts and I am presented with a question
WHEN I answer a question
THEN I am presented with another question
WHEN I answer a question incorrectly
THEN time is subtracted from the clock
WHEN all questions are answered or the timer reaches 0
THEN the game is over
WHEN the game is over
THEN I can save my initials and score
```

The following animation demonstrates the application functionality:

![code quiz](./Assets/04-web-apis-homework-demo.gif)

### Review

You are required to submit the following for review:

* The URL of the functional, deployed application.

* The URL of the GitHub repository. Give the repository a unique name and include a README describing the project.

- - -
© 2019 Trilogy Education Services, a 2U, Inc. brand. All Rights Reserved.


Overview
---------

## make a quiz game
## set up questions for the quiz
## setup timer
## answer question if right go to the next question but if wrong take away 5 sec 
## display score and get initials after timer expired or questions all answered
## save score 


Technical
----------
## event listeners (for buttons)
    - Start Quiz
    - Each question (4 Q's)
    - Submit
    - Go back (at the end, restarts quiz)
    - Clear Highscores
    - View Highscores (top left)

## text
- start of quiz:
    - Heading (quiz challenge)
    - description of quiz
    - display time (zero)
    - highscore link (top left)
- Question:
    - actual question
    - choices
    - bottom (correct or wrong) 
        - *disappears after 2sec*
- finished:
    - All Done
    - show score
    - get initials (input field)
    - submit
    - taken to highscore screenx
- Highscore page:
    - show sections and display all scores
    - go back button (restarts quiz, home)
    - clear highscores button
    - no timeer (top right)
    - no view highscore (top left)

## local storage (for scores, maybe something else too)
## normal timer, count down from XX (ref: tomato example)
## onclick (for questions and button)
## counter (for tracking correct and summing total)

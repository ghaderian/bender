

How to run: 

Npm i 
Ng test


where to find test cases:
src/app/core/service/boardEngine.spec.ts



About implementation: 
multiple robots solution is implemented. As a bonus, a rule that prevents multiple robots from occupying the same square is implemented. Also the sequence of commands is implemented as observable so that commands can come asynchronously and not all at once. A method for resetting the board was also added so the board can refresh and start over. 


This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.1.4.


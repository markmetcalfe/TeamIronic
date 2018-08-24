import { Student, Tutor } from './people';

function main(){
  console.log("loaded");

  (<HTMLImageElement> document.getElementById('marge')).src = 'assets/marge.png';

  console.log(
    new Student("Mark", 20, [ "Computer Science", "History" ]),
    new Student("AyyLmao", -1, [ "asdasd" ]),
    new Tutor("Mark", 20, [ "Computer Science", "History" ], [ "Computer Science" ]),
  )
}

document.addEventListener("DOMContentLoaded", main);
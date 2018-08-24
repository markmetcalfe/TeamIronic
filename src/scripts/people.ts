interface Person {
  name: String;
  age: number;
}

export class Student implements Person {

  name: String;
  age: number;

  courses: String[];

  constructor(name: String, age: number, courses: String[]){
    this.name = name;
    this.age = age;
    this.courses = courses;
  }

  procrastinate(){
    console.log("I'm totally doing my work");
  }

}

export class Tutor extends Student {

  tutoring: String[];

  constructor(name: String, age: number, courses: String[], tutoring: String[]){
    super(name, age, courses);

    this.tutoring = tutoring;
  }

  helpdesk(){
    console.log("Whyyy");
  }

}
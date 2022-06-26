
class Question1 {
  s = 'BOB';

  output1 () {
    console.log(this.s);
  }
  
  output2 = () => console.log(this.s);
}

const question1 = new Question1();
setTimeout(question1.output1.bind(question1), 1000)
setTimeout(question1.output1.bind({ s: 'Jen' }), 1500);
setTimeout(question1.output2.bind({ s: 'Jen' }), 2000);

import { Component, AfterViewInit, OnInit } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';

import { Observable, Subject, of, from, race } from 'rxjs';
import { throttleTime, endWith, catchError, toArray, 
  tap, map, flatMap } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';

import * as jStat from 'jstat';

interface Product {
  _id: string;
  barcode: string;
  plu: number;
  name: string;
}

// const DATA: Product[] = [
//   { name: 'orange', code: 1 },
//   { name: 'apple', code: 2 },
//   { name: 'banana', code: 3 },
//   { name: 'cucumber', code: 4 },
//   { name: 'pear', code: 5 },
//   { name: 'pineapple', code: 6 },
//   { name: 'loose nectarine', code: 7 },
//   { name: 'leek', code: 8 }
// ];


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit, AfterViewInit {

  myTime$;
  noMoreQuestions$ = new Subject<boolean>();
  questionsStream$;
  nextQuestion$ = new Subject<any>();
  currentQuestion;

  startTime;
  endTime;
  timeAllowed = 30 * 1000; // seconds
  timer: number = this.timeAllowed;
  timeRunning = false;
  result = 0;
  clicks = 0;
  rightAnswer: number;
  questionsLoaded = false;
  questions;
  questionsList: any = [];
  questionCounter = 0;
  listOfCodes = [];
  numberOfQuestions = 0;
  isVertical = false;

  constructor( breakpointObserver: BreakpointObserver) {
    const layoutChanges = breakpointObserver.observe([
      '(orientation: portrait)',
      '(orientation: landscape)',
    ]);

    layoutChanges.subscribe(result => {
      if (result.breakpoints['(orientation: portrait)']) {
        this.isVertical = true;
      } else {
        this.isVertical = false;
      }
      console.log(result);
    });
  }

  triggerEnd() {
    this.noMoreQuestions$.next(true);
  }

  updateCurrentQuestion() {
    if ( this.numberOfQuestions <= 0 ) {
      console.log('question no more');
      this.noMoreQuestions$.next(true);
      this.currentQuestion = undefined;
    } else if (this.questionsList.length > 0) {
      this.numberOfQuestions -= 1;
      // console.log('question: '+this.numberOfQuestions+' ', this.questionsList[this.numberOfQuestions]);
      this.currentQuestion =  this.questionsList[this.numberOfQuestions];
    }
  }

  getQuestions() {
    console.log('getQuestions(): ', this.questionsLoaded);
    if (this.questionsLoaded) {
        this.questions = this.questions.sort(() => Math.random() - 0.5);
        for (const q of this.questions) {
          const answer = q.plu;
          let tmpList = this.listOfCodes.filter(x => x !== answer);
          tmpList = tmpList.sort(() => Math.random() - 0.5).slice(0, 2);
          tmpList.push(answer);
          tmpList = tmpList.sort(() => Math.random() - 0.5);
          // console.log({...q, choices: tmpList});
          this.questionsList.push({...q, choices: tmpList});
        }
        this.numberOfQuestions = this.questionsList.length;
    }

  }

  restart() {
    this.result = 0;
    this.clicks = 0;
    this.timeRunning = true;
    // this.noMoreQuestions$.next(false);
    this.myTime$.unsubscribe();
    this.questionsList = [];
    this.getQuestions();
    this.updateCurrentQuestion();
    this.ngAfterViewInit();
  }

  initQuestions() {
    this.questionsStream$ = ajax.get('http://localhost:3000/api/plu/15')
      .pipe(
        map(resp => resp.response ),
        flatMap(x => x),
        tap(x => console.log('first pipe: ', x))
      ); // from(DATA);
    from(this.questionsStream$)
      .pipe(
        tap( x => console.log(x)),
        tap( x => this.listOfCodes.push( (x as Product).plu )),
        toArray(),
        catchError((err, caught) => caught)
      )
      .subscribe(
        res => {
          console.log('initQuestions()');
          console.log(res);
          this.questions = res;
          this.questionsLoaded = true;
        }
      );
  }

  get finalResult() {
    if (this.result < 0) { return(-1); }
    const prob = jStat.binomial.cdf(this.result, this.clicks, 1 / 3);
    // return Math.floor(1000*prob)/10 + "%";
    const dt = 200 * (1.001 - (this.endTime - this.startTime) / this.timeAllowed);
    return Math.floor(dt + this.result * prob * 100);
  }

  get restartButtonLabel() {
    return (this.clicks > 0) ? 'again!' : 'start';
  }


  clicked(value) {
    // this.rightAnswer = this.currentQuestion.code;
    this.clicks += 1;
    if (value === this.currentQuestion.plu) {
      this.result += 1;
    }
    console.log('your answer: ' + value + ', correct answer: ' + this.currentQuestion.plu + ' result: ' + this.result);

    this.updateCurrentQuestion();
  }


  ngAfterViewInit() {
    this.startTime = Date.now();
    this.myTime$ = new Observable(
      observator => {
        const myInterval = setInterval(
          () => {
            const dt = this.timeAllowed - (Date.now() - this.startTime);
            if (dt > 0) {
              observator.next(dt);
            } else {
              setTimeout(() => this.timeRunning = false);
              observator.complete();
              if (!this.timeRunning) {
                clearInterval(myInterval);
              }
            }
          },
          0
        );

      }
    ).pipe(throttleTime(50), endWith(0))
      .subscribe((res) => {
          this.timer = Number(res);
          if (this.timer === 0) {
            this.myTime$.unsubscribe();
          }
        }
    );
    this.noMoreQuestions$
      .subscribe((res) => {
        this.endTime = Date.now();
        this.timeRunning = false;
      }
    );
    // this.restart();

  }

  ngOnInit() {
    this.initQuestions();
    this.getQuestions();
    this.updateCurrentQuestion();
    // this.restart();
  }

}

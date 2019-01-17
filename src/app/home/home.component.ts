import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription, Observer, interval } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy{

  subscriptions : Subscription[] = [];

  constructor() { }

  ngOnInit() {
    const myNumbers = interval(1000);
      

    const subscriptionMyNumbers = myNumbers.subscribe(
      (number:number) => {
        console.log(number);
      }
    );
    this.subscriptions.push(subscriptionMyNumbers);

    const myObservable = Observable.create((observer: Observer<any>) => {
      setTimeout(() => {
        observer.next('first package');
      }, 2000);

      setTimeout(() => {
        observer.next('second package');
      }, 4000);

      setTimeout(() => {
        // observer.error("this does not work");
        observer.complete();
      }, 5000);
      setTimeout(() => {
        // observer.error("this does not work");
        observer.next('third package');
      }, 6000);
    });

    const subscriptionMyObservable = myObservable.subscribe(
      (data:string) => { console.log(data)},
      (error:string) => { console.log(error)},
      () => { console.log('completed.')}
    );
    this.subscriptions.push(subscriptionMyObservable);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(
      (subscription:Subscription) => subscription.unsubscribe());
  }

}

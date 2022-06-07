
import * as rxjs from 'rxjs';

export class TypeAhead {

  rxjs = rxjs;

  continents = (keys) => [
    'africa',
    'antarctica',
    'asia',
    'australia',
    'europe',
    'north america',
    'south america'
  ].filter(e => e.indexOf(keys.toLowerCase()) > -1);

  // <input type="text" (input)="term$.next($event.target.value)" /> {{ term$ | async }}
  term$ = new this.rxjs.BehaviorSubject('');
  result$ = this.term$.pipe(
    this.rxjs.debounceTime(1000),
    this.rxjs.distinctUntilChanged(),
    this.rxjs.switchMap(this.getAutoCompleteSuggestions.bind(this)),
    this.rxjs.tap(results => console.log('--- tapped', results))
  );

  constructor() {
    this.init()
  }

  init = () => {
    this.result$.subscribe(this.handleInputResults.bind(this));
    this.term$.next('a');
    this.term$.next('am');
    console.log('=== init', `"${ this.term$.value }" triggered at ${ new Date() }`);
  };

  handleInputResults = (data) => console.log('--- result', data);

  getAutoCompleteSuggestions(keys) {
    return this.rxjs.of(this.continents(keys)).pipe(
      this.rxjs.tap(_ => console.log(`--- API Call at ${ new Date() }`))
    );
  };

}

const typeahead = new TypeAhead();


import * as rxjs from 'rxjs';

export class TypeAhead {

  rxjs = rxjs;

  continents = [
    'africa',
    'antarctica',
    'asia',
    'australia',
    'europe',
    'north america',
    'south america'
  ];

  getContinents = (keys) => {
    if (keys === '') return [];
    return this.continents.filter(continent => continent.includes(keys.toLowerCase()));
  };

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
  };

  handleInputResults = (data) => console.log('--- result', data);

  getAutoCompleteSuggestions(keys) {
    return this.rxjs.of(this.getContinents(keys)).pipe(
      this.rxjs.tap(_ => console.log(`--- API Call at ${ new Date() }`))
    );
  };

}

const typeahead = new TypeAhead();

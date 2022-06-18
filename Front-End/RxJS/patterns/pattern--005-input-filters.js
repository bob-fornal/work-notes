
// <input type="text" (input)="onCategoryFilterChange($event.target.value)" />
// <input type="text" (input)="onCountryFilterChange($event.target.value)" />

import { BehaviorSubject, combineLatest } from "rxjs";

export class FilterContent {

  categoryFilter$ = new BehaviorSubject('');
  countryFilter$ = new BehaviorSubject('');

  products$ = new BehaviorSubject([
    { title: 'First', category: 'Square', country: 'USA' },
    { title: 'Second', category: 'Circle', country: 'USA' },
    { title: 'Third', category: 'Square', country: 'DE' },
    { title: 'Fourth', category: 'Square', country: 'DE' },
    { title: 'Fifth', category: 'Oval', country: 'ENG' },
    { title: 'Sixth', category: 'Circle', country: 'ENG' }
  ]);
  filtered = [];

  constructor() {
    this.init();
    console.log(this.filtered);
  }

  init = () => {
    combineLatest([
      this.products$,
      this.categoryFilter$,
      this.countryFilter$
    ]).subscribe(this.handleFilter.bind(this));
  };

  handleFilter = ([ products, selectedCategory, selectedCountry]) => {
    this.filtered = products.filter((product) => {
      return product.category.includes(selectedCategory) && product.country.includes(selectedCountry);
    });
    console.log(this.filtered);
  };

  onCategoryFilterChange = (category) => {
    this.categoryFilter$.next(category);
  };

  onCountryFilterChange = (country) => {
    this.countryFilter$.next(country);
  };

}

const content = new FilterContent();
content.onCategoryFilterChange('Square');
content.onCountryFilterChange('DE');

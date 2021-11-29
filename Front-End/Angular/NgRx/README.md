# NgRx

* Collection of Open Source Libraries for Angular.
* Built with Reactivity in Mind
* State Management and Handling Side Effects
* Completely Community Driven


**CODE**: [HERE](https:://www.github.com/thisdot/ngrx-training) ![Link](../../../foreign.png)

## State

```typescript
movies: Array<Movie> = [];
```

## Side Effects

```typescript
findMovies = (searchTerm: string) => {
  this.movieService.findMovies(searchTerm).subscribe(movies => {
    // this.movies = movies;
  });
};
```

## State Change

```typescript
this.movies = movies;
```

## Actions, Reducers, and Selectors

```typescript
@Component({
  template: `
    <search-movies-box (search)="onSearch($event)></search-movies-box>
    <movies-list
      [movies]="movies$ | async"
      (favoriteMovie)="onFavoriteMovie($event)">
    </movies-list>
  `
})
export class SearchMoviesPageComponent {
  movies$: Observable<Array<Movie>>;

  constructor(private store: Store<AppState>) {
    this.movies$ = store.select(selectMovies);
  }

  onSearch = (searchTerm: string) => {
    this.store.dispatch(searchMoviesAction(searchTerm));
  };
}
```

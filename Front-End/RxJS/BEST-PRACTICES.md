# RxJS Best Practices

From [HERE](https://betterprogramming.pub/rxjs-best-practices-7f559d811514)

1. Avoid logic inside the subscribe function
2. Use subjects to force completion
3. Don’t expose subjects

## Avoid Logic Inside the Subscribe Function

```typescript
// BAD PATTERN
pokemon$.subscribe((pokemon: Pokemon) => {
  if (pokemon.type === 'Water') return;

  const pokemonStats = getStats(pokemon);
  logStats(pokemonStats);
  saveToPokedex(pokemonStats);
});

// GOOD PATTERN
pokemon$
  .pipe(
    filter(({ type }) => type !== 'Water'),
    map(pokemon => getStats(pokemon)),
    tap(stats => logStats(stats))
  )
  .subscribe(stats => saveToPokedex(stats));
```

## Using Subjects to Force Completion

```typescript
const stop$ = new Subject<void>();

trainer$.pipe(takeUntil(stop$)).subscribe(trainer => { });
pokemon$.pipe(takeUntil(stop$)).subscribe(pokemon => { });
number$.pipe(takeUntil(stop$)).subscribe(number => { });

function stop() {
  stop$.next();
  stop$.complete();
}
```

## Don't Expose Subjects

```typescript
class DataService {

  private pokemonLevel = new BehaviorSubject<number>(1);
  pokemonLevel$ = this.pokemonLevel.asObservable();

  increaseLevel(level: number) {
    this.pokemonLevel.next(level);
  }
}
```

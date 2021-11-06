# Mocking Dependencies in Unit Tests

It is important to write code in a way that it can be easily extended in the future. As a developer, we should always choose solutions that allow the application to scale and to be improved efficiently.

## The Code

The main class, a basic Angular service ...

```typescript
@Injectable()
class UserService {
  getUsers(): Observable<ReadonlyArray<User>> {...}
}
```

Used in a component like this ...

```typescript
@Component({
  template: `<div *ngFor="let user of users$ | async"></div>`
})
class UserComponent {
  users$ = this.userService.getUsers()
   
  constructor(
    private readonly userService: UserService
  ) { }
}
```

The `UserComponent` uses the `UserService` to get a list of users.

## The Issue

One of the characteristics of unit tests is that they have to work in a specific separated scope, related only to the tested code. All of the external dependencies should be mocked to provide the expected level of isolation. That said, the correctly written test for this component should use a mocked version of the `UserService`.

```typescript
beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [CommonModule],
    declarations: [
      UserComponent
    ],
    providers: [
      { provide: UserService, useValue: { getUsers: () => of([...]) } }
    ]
  });
});

it('shows list of users', () => {
   const fixture = TestBed.createComponent(UserComponent);
   // ...
});
```

This test suite uses a mocked version of the `UserService` ...

```typescript
{ provide: UserService, useValue: {getUsers: () => of([...])} }
```

While this works, this practice makes a project unable to scale nor to be extended. Let’s see what can be done to avoid these issues in the future.

## `Partial<UserService>` with Spies Solution

A clean solution is a variation of the `Partial<UserService>` Solution. Instead of providing the implementation of the object, spies can be used to provide test specific implementations.

```typescript
let mockService: Partial<UserService> = {
  getUsers(): Observable<ReadonlyArray<User>>{}
}
// provide
{ provide: UserService, useValue: mockService }

// Jasmine Solution
jasmine.spyOn(mockService, 'getUsers').and.returnValue(...);
// Jest Solution
jest.spyOn(mockService, 'getUsers').and.return(...)
```

The spyOn function overrides `getUsers` method and allows it to act differently.

## `Partial<UserService>` Solution

This pattern uses the original service, overriding as needed.

```typescript
let mockService: Partial<UserService> = {
  getUsers(): Observable<ReadonlyArray<User>> {
    // mock implementation
  }
};
// provide
{ provide: UserService, useValue: mockService }
```

As you can see you can create a variable with a type `Partial<UserService>` and then assign an object to it which contains only methods that you want to override.

The issue is that it only overrides the functionality specific to the tests and leaves a lot of original code visisble on the `mockService`.

## Polymorphic Resolution

First, let's look at taking advantage of polymorphism as TypeScript implements all of the OOP paradigms.

```typescript
class MockUserService extends UserService {
  getUsers(): Observable<ReadonlyArray<User>> {
    // mock implementation
  }
};
// provide
{ provide: UserService, useClass: MockUserService }
```

The code above shows a simple and quick solution. A mock class can be created that extends the UserService. Then you can override methods that you want to behave differently. This solution is precise and provides full IDE support.

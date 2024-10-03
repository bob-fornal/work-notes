# Partial and Omit

```typescript
interface Book {
  title: string;
  author: string;
  read: boolean;
  description: string;
}
```

## Partial

```typescript
/* Sets all of the properties
   of Book to optional
*/
const book: Partial<Book> = {
  title: 'Buy Books'
};
```

## Omit 

```typescript
/* Omits the specified properties;
   The type contains all the
   properties, except 'description'
*/
const bookPreviou: Omit<Book, 'description'> = {
  title: 'Save the Worms',
  author: 'Someone Famous',
  read: true
};
```
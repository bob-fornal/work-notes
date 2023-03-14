# Java SE - Exception Handling

* **Programs will encounter errors**: Need an effective mechanism for handling and recovery.
* **Exceptions**: Non-intrusive way to signal errors; this allows errors to be handled in a structured manner.

Exception handling relies on `try`/`catch` blocks.

```java
// Main.java
int i = 12;
int j = 5;

try {
  int result = i / (j - 2);
  System.out.println(result);
} catch (Exception ex) {
  System.out.println("ErrorL " + ex.getMessage());
  ex.printStackTrace();
}
```

### Handling Cleanup

* Tasks often require cleanup: Close file, database, etc.
* May be needed, even if exception occurs.

`finally` block: runs in all cases following `try` or `catch`.

### Automated Cleanup

* `try-with-resources`

```java
try (BufferedReader reader = new BufferedReader(new FileReader(args[0]))) {
  String inputLine = null;
  while((inputLine = reader.readLine()) != null)
    performOperation(inputLine);
} catch (Exception ex) {
  System.out.println("ErrorL " + ex.getMessage());
}
```

## Handling Exceptions

## Exception Types

## Creating Custom Exceptions

## Handling Exceptions

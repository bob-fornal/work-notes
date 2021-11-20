# JSON

JSON stands for *JavaScript Object Notation*. It is a lightweight format for storing and transporting data similar to XML or YAML.

It is used widely for almost every single API as well as for configuration files.

JSON is based on a subset of the JavaScript Programming Language Standard originally specified by Douglas Crockford, the writer of "JavaScript: The Good Parts."

* It is easier to read and write compared to something like XML because it has a much cleaner syntax.
* JSON is a text format that is completely language-independent but uses conventions that are familiar to programmers of the C-family of languages, including C, C++, C#, Java, JavaScript, Perl, Python, etc.
* Code for parsing JSON exists in many languages.

## Syntax

* Data is in name/value pairs
• Data is separated by commas
• Curly braces hold objects
• Square brackets hold arrays
• Keys and string values should be wrapped in double quotes

```json
{
  "id": 27,
  "name": "Bob",
  "isValidated": true
}
```

## Data Types

* Number
* String
* Null
* Object (JSON Object)
* Boolean
* Array

Cannot be ...

* Function
* Date
* undefined

## Receiving Data

When receiving data from an API, that data is always a string. In order to use it, parse the data with the `JSON.parse` method and the data becomes a JavaScript object.

## Sending Data

When sending data to an API or web server, the data has to be a string.

Convert a JavaScript object using the `JSON.stringify` method into a string in order to send it to an API or a web server.

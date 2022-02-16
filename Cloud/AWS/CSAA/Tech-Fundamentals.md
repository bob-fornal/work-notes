# Tech Fundamentals

## YAML Ain't Markup Language (YAML)

YAML = Human-readable data-serialization language for all programming languages.

* YAML files can be read into or written out by an application and are commonly used for configuration.
* A YAML document is an unordered collection of key/value pairs, where each key has a value.
* Indentation matters in YAML, same level means the same list.

### Sequences or Lists

* Comma-separated elements enclosed with brackets `[ ]`, this format is known as inline.
* The same list separated on each line.
* Both patterns are valid, but enclosing can be more precise.

```yaml
list1: ["Bob", "Jen", "Time"]

list2:
  - "Bob"
  - "Jen"
  - "Tim"
```

### Dictionary (Structure)

* Three items with one more more key/value pairs.

```yaml
people:
  - last: Fornal
    first: Bob
  - last: [Fornal, Manno]
    first: Jen
  - last: Fornal
    first: Tim
    car: Bullet
```

### CloudFormation

* This YAML template has a `Resources` section (a dictionary).
* `s3bucket` is a dictionary that containes `Type` and `Properties` keys.
* `Type` has a string value.
* `Properties` is a dictionary containing `BucketName`.
* `BucketName` is a key with a string value.

```yaml
Resources:
  s3bucket:
    Type: "AWS::S3::Bucket"
    Properties:
      BucketName: "ac1337peoplepictures"
```

## JavaScript Object Notation (JSON)

JSON (JavaScript Object Notation) is a lightweight data-interchange format.

* It is easy for humans to read and write.
* It is easy for machines to parse and generate.

An **object** is an unordered set of key/value pairs enclosed by `{ }`.

```json
{ "lastname": "Fornal", "firstname": "Bob" }
```

An **array** is an ordered collection of values, separated by commas and enclosed in `[ ]`.

* The top level is a collection of unordered key/value pairs where the value is a JSON object.
* Each nested object is a collection of key/value pairs where the value can be a scalar, a list, or a JSON object.

### CloudFormation

This object references the same S3 Bucket as the example above in YAML.

* This JSON template has a `Resources` key, its value is a JSON object.
* `s3bucket` is a JSON object that containes `Type` and `Properties` keys.
* `Type` has a string value.
* `Properties` is a JSON object containing `BucketName`.
* `BucketName` is a key with a string value.

```json
{
  "Resources": {
    "s3bucket": {
      "Type": "AWS::S3::Bucket",
      "Properties": {
        "BucketName": "ac1337peoplepictures" 
      }
    }
  }
}
```

## Networking Starter Pack

### OSI 7-Layer Model

[Documentation](https://en.wikipedia.org/wiki/OSI_model)

The software that does each of these functions is called the networking stack.

* Media Layers: Physical, Data Link, Network.
* Host Layers: Transport, Session, Presentation, Application.

| Layer | Function |
|-------|----------|
| 7 | Application |
| 6 | Presentation |
| 5 | Session |
| 4 | Transport |
| 3 | Network |
| 2 | Data Link |
| 1 | Physical |

### Layer 1 - Physical

Layer 1 (Physical) specifications defined the transmission and reception of **raw bit streams** between a device and a **shared physical medium**. It defines things like voltage levels, timing, rates, distances, modulation, and connectors.

* Physical Medium can be Copper (electrical), Fiber (light), or WIFI (RF).
* HUB = Anything received on any port is transmitted on every other port (including errors and collisions).

Notes ...

* There is no device addressing, all data is processed by all devices.
* If multiple devices transmit at once, a collision occurs.
* Layer 1 has no media access control and no collision detection.

Detail ...

* Physical shared medium.
* Standards for transmitting onto the medium.
* Standards for receiving from the medium.
* No access control.
* No uniquely identifiable devices.
* No device-to-device communication.

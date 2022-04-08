# Serverless and Application Services

## Architecture Deep Dive

### Event-Driven Architecture

* Monolithic Architecture

  Everything fails, scales, and bills as one.

* Tiered Architecture

  Vertical Scaling of each tier independently. Utilize load balancers (internally) to allow for horizontal scaling.

* Evolving with Queues

  Decouples via queue. ASG based on Queue Length.

* Microservice Architecture

  Collection of microservices. They do individual things very well.

* Collection of Event Components: Event Producers, Event Consumers, or both Producers and Consumers.
* Event Router: Event Bus ... Producers add to Event Router which passes Events to Consumers.

Notes ...

* No constant running or waiting for things to happen.
* Producers generate events when something happens: clicks, errors, criteria met, or actions.
* Events are delivered to Consumers, actions are taken, and the system returns to waiting.
* Mature event-driven architecture only consumes resources while handling events (serverless).

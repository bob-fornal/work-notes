# AWS Step Functions

Model workflows as state machines (one per workflow).

* Written in JSON.
* Visualization, execution, and history.

## Task States

Do some work in a state machine.

* Invoke one AWS Service.
* Run one Activity.

## States

* Choice States (test for a condition to send to a branch).
* Fail or Succeed State (stop execution).
* Pass State (pass input to output or inject fixed data, without performing work).
* Wait State (delay).
* Map State (dynamically iterate steps).
* Parallel State (begin parallel branches of execution).

## Error Handling

Any state can encounter runtime errors for a variety of reasons.

* State machine definition issues.
* Task failures.
* Tansient issues.

Use RETRY and CATCH in the state machine to handle the errors instead of indide the application code.

### Predefined Error Codes

* States.ALL
* States.Timeout
* States.TaskFailed
* States.Permissions

The state may return its own errors.

## Standard versus Express

### Standard Workflow

* ONCE.
* 1-year.
* 2,000 per second execution.
* 4,000 per transition per account.

### Express Workflow

* AT-LEAST ONCE.
* 5-minutes.
* 100K per second execution.
* (nearly unlimited) transition rate.



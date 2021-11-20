# Security Groups

The fundamental of network security in AWS

* Can be attached to multiple instances.
* Locked down to a Region / VPC combination.
* Does live “outside” the EC2 - if traffic is blocked, the EC2 instance won’t see it.
* It is good to maintain one separate Security Group for SSH access.

Issues

* Application not accessible (time out), then it is usually a Security Group issue.
* Application gives a “connection refused” error, then it is an application error or it has not launched.

Defaults

* All inbound traffic is blocked by default.
* All outbound traffic authorized by default.

Security groups act as a firewall on EC2 Instances.

They regulate ...

* Access to ports
* Authorized IP ranges - IPv4 and IPv6
* Control of inbound network
* Control of outbound network

# Network Storage

## Elastic File System (EFS) Architecture

* EFS is an implementation of NFSv4.
* EFS Filesystems can be **mounted in Linux**.
* Shared between many EC2 Instances.
* Private service, via mount targets inside a VPC.
* Can be accessed from on-premise - VPN or DX.

Notes ...

* **Linux only**.
* General Purpose and Max IO Performance Modes.
* General Purpose is the default for 99.9% of uses.
* Bursting and Provisioned Throughput Modes.
* Standard and Infrequent Access (IA) Classes.
* Lifecycle policies can be used with classes.

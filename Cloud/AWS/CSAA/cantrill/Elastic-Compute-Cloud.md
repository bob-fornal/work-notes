# Elastic Compute Cloud (EC2) Basics

## Virtualization 101

* A single piece of hardware running multiple applications.

Software Virtualization ...

* Host OS and Hypervisor (for Binary Translations).
* Guest OS and Application as a Virtual Machine.
* Emulated Virtualization.

Para-Virtualization ...

* Areas of the Guest OS that make Privileged Calls are modified to call the Hypervisor, removing the need for Binary Translation.
* Virtualization Aware.

Hardware-Assisted Virtualization ...

* Hypervisor / VMM, knows that Virtualization exists.

Single Route - IO Virtualization (SR-IOV) ...

* Allows add-on cards to present themselves as multiple cards to the Guest OS. No Hypervisor translation (hardware or software).
* In EC2, this feature is called **Enhanced Networking**.

## EC2 Architecture and Resilience

* EC2 Instances are **virtual machines** (OS and Resources).
* EC2 Instances run on **EC2 Hosts**.
* EC2 Instance Hosts are **Shared** Hosts or **Dedicated** Hosts.
* EC2 is an AZ-Resilient Service: The **Hosts** run inside a single AZ. If that AZ fails, the Host fails, and Instances Fail.

What is EC2 Good For? ...

* Traditional **OS and Application** Compute.
* **Long-Running** Compute.
* **Server**-style applications, either **burst** or **steady-state** load.
* **Monolithic** application loads.
* **Migrated** application workloads or **Disaster Recovery**.

## EC2 Instance Types

* **Raw** amount of resources. CPU, Memory, Local Storage Capacity, and Local Storage Type.
* **Resource Ratios**.
* **Storage** and **Data** Network **Bandwidth**.
* System Architecture and potentially the Vendor.
* Additional Features and Capabilities.

EC2 Categories ...

* **General Purpose - DEFAULT** - Diverse workloads, equal resource ratio.
* **Compute Optimized** = Media Processing, HPC, Scientific Modelling, Gaming, Machine Learning.
* **Memory Optimized** = Processing large in-memory datasets, some database workloads.
* **Accelerated Computing** - Hardware GPU, field programmable gate arrays (FPGAs).
* **Storage Optimized** - Sequential and Random IO - scale-out transactional databases, data warehousing, ElasticSearch, analytics workloads.

Decoding EC2 Types ...

Instance Type (example): `R5db.8xlarge`

| Position                | Detail  |
|-------------------------|---------|
| Instance Family         | R       |
| Instance Generation     | 5       |
| Additional Capabilities | dn      |
| separator               | .       |
| Instance Size           | 8xlarge |

![EC2 Instance Types Chart](../images/EC2-Instance-Types.png)

[EC2Instances.info, Easy Amazon EC2 Instnace Comparison](https://instances.vantage.sh/)

## DEMO: EC2 SSH versus EC2 Instance Connect

1. Go to the EC2 Console.
2. Select the **Key Pairs** link on the left.
3. Create the A4L Key Pair.
4. Connect via SSH.
5. Connect via Instance Connect.

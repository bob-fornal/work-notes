# Cloud Computing Fundamentals

Cloud Computing is not a buzzword - it is a unique type of computing that has a formal set of definitions.

* [NIST Special Publication 800-145](https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-145.pdf)

1. On-Demand Self-Service "... can provision capabilities as needed **without requiring human interaction**."
2. Broad Network Access "... capabilities are available over the network and accessed through **standard mechanisms**."
3. Resource Pooling "...there is a sense of **location independence**, no control or knowledge over the exact location of the resources. Resources are pooled to serve multiple consumers using a **multi-tenant model**."
4. Rapid Elasticity "...Capabilities can be **elastically provisioned and released** to scale rapidly. To the consumer, the capabilities available for provisioning often **appear to be unlimited**."
5. Measured Service "...Resource usage can be **monitored, controlled, reported, ... and BILLED**."

## Public, Private, Multi, Hybrid Cloud

| Platform     | AWS | Azure | Google | Implementation |
|--------------|-----|-------|--------|----------------|
| Public Cloud | ![AWS Logo](./images/aws-small.jpeg) | ![Azure](./images/azure-small.jpeg) | ![Google](./images/google-small.png) | Multi-Cloud |
| | Hybrid Cloud | Hybrid Cloud | Hybrid Cloud | |
| On-Premises | AWS Outposts | Azure Stack | Anthos | Private Cloud |

* Public Cloud = Using 1 Public Cloud.
* Private Cloud = Using on-premises **real** Cloud product.
* Multi-Cloud = Using more and 1 Public Cloud.
* Hybrid Cloud = Using Public and Private Clouds.

**Hybrid Cloud is NOT Public Cloud and legacy on-premises**.

## Cloud Service Models

* Infrastructure Stack: A collection of things stacked on each other needed to run.
* Parts managed by the vendor.
* Parts managed by the user.
* Unit of consumption.

| On Premises | Data Center Hosted | IaaS | PaaS | SaaS |
|-------------|--------------------|------|------|------|
| Application | Application | Application | Application | *Application* |
| Data | Data | Data | Data | **Data** |
| Runtime | Runtime | Runtime | Consume *Runtime* | **Container** |
| Container | Container | Container | **Container** | **Container** |
| OS | OS | Consume *OS* | **OS** | **OS** |
| Virtualization | Virtualization | **Virtualization** | **Virtualization** | **Virtualization** |
| Servers | Servers | **Servers** | **Servers** | **Servers** |
| Infrastructure | Infrastructure | **Infrastructure** | **Infrastructure** | **Infrastructure** |
| Facilities | Vendor **Facilities** | **Facilities** | **Facilities** | **Facilities** |

* IaaS = Infrastructure as a Service
* PaaS = Platform as a Service
* SaaS = Software as a Service



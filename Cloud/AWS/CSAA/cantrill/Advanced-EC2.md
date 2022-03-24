# Advanced EC2

## Bootstrapping EC2 using User Data

EC2 Bootstrapping ...

* Bootstrapping allows **EC2 Build Automation**.
* User Data is accessed via the metadata IP: `http://169.254.169.254/latest/user-data`
* Anything in User data is **executed by the Instance OS**.
* **ONLY AT Launch**.
* EC2 does not interpret this data, the OS needs to understand the User Data.

User Data Key Points ...

* It is **opaque** to EC2, it is just a **block of data**.
* It is **NOT** secure. Do not use it for passwords or long-term credentials (ideally).
* Limited to 16KB in size.
* Can be modified when the instance is stopped.
* But **only executed once at launch**.

## Enhanced Bootstrapping with CFN-INIT

`AWS::CloudFormation::Init` ...

* `cfn-init` helper script installed on EC2 OS.
* Simple configuration management system.
* Procedural (User Data) versus Desired State (cfn-init).
* Packages, Groups, Users, Sources, Files, Commands, and Services.
* Provided with directives via **Metadata** and `AWS::CloudFormation::Init` on a CFN resource.

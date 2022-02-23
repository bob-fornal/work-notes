# AWS Fundamentals

## AWS Public versus Private Services

Networking Perspective ...

1. "Public Internet" Zone
2. "AWS Public" Zone
3. "AWS Private" Zone

AWS Private Zone ...

* VPCs are isolated unless configured otherwise.
* On-premises can only access VPCs if configured via VPN or Direct Connect.
* Private services (example, EC2) can be given a **public IP - 1:1** that is translated by the IGW.

AWS Public Zone ...

* Connected to the Public Internet Zone.

## AWS Global Infrastructure

* AWS Regions (not mapped to countries).
* AWS Edge Locations (local distribution points).

Regions ...

* Geographic Separation - Isolated Fault Domain.
* Geopolitical Separation - Different governance.
* Location Control - Performance.

Availability Zones (AZs) ...

* Isolated infrastructure within a region.

Service Resilience ...

* Globally Resilient (examples, IAM and Route 53).
* Region Resilient.
* AZ Resilient.

## AWS Default Virtual Private Cloud (VPC)

A VPC is a Virtual Network inside AWS.

* A VPC is within one account and one region.
* By default, it is Private and Isolated unless it's configured otherwise.
* Two types - Default VPC (one per Region) and Custom VPCs.

Default VPC Notes ...

* **One Default VPC per Region**, it can be removed and recreated.
* Default VPC CIDR is always `127.31.0.0/16`.
* `/20` Subnet in each AZ in the Region.
* Comes with and Internet Gateway (IGW), Security Group (SG), and NACL preconfigured.
* Subnets assign public IPv4 addresses.

## Elastic Compute Cloud (EC2)

IaaS = Infrastructure as a Service.

* EC2 Provides Virtual Machines, Instances.
* **Private** service by-default, uses VPC networking.
* AZ Resilient, Instance fails if an AZ fails.
* Different instance sizes and capabilities.
* On-Demand Billing, per second or per hour.
* Local on-host storage or Elastic Block Store (EBS).

Instance Lifecycle ...

Involves CPU, Memory, Disk, and Networking.

1. Running - charges for all four.
2. Stopped - charge only for storage.
3. Terminated - no charges.

### Amazon Machine Image (AMI)

* Can be used to create a Machine Image.
* Can be created from a Machine Image.

Contains ...

* Root Volume
* Block Device Mapping
* Permissions

Permissions ...

  1. Public - Everyone allowed.
  2. Owner - Implicit allow.
  3. Explicit - Specific AWS Accounts allowed.

## DEMO: Creating an EC2 Instance

1. Login and navigate to the EC2 Dashboard.
2. Select **Key Pairs**, Create Key Pair.
3. Select PEM if not using Putty.
4. Save the `.CER` file
5. Select EC2 Dashboard, then Launch, and Launch Instance.
6. Select "Amazon Linux 2 AMI (HVM)," the first one **Free Tier Eligible**.
7. Select **t2.micro** Type, **Free Tier Eligible**, then Next (Configure Instance Details). Network, Subnet, and Auto-Assign Public IP can be selected here.
8. Select Next (Add Storage).
9. Select Next (Add Tags).
10. Select Next (Configure Security Groups), set to "My IP Address."
12. Review and Launch, then Launch.
13. Select an existing key pair or create a new key pair. Select the key pair created above.
14. Launch Instance, then View Instances.

Connecting ...

1. Right-click on the instance and select Connect.
2. Select the SSH Tab.
3. Copy the example `SSH` Command (may need to run the `chmod` command to fix permissions).

Exercise ...

1. Click Instances at the top.
2. Select the running Instance, then on the Instance State dropdown choose **Stop Instance**.
2. Select the stopped Instance, then on the Instance State dropdown choose **Start Instance**.

## Simple Storage Service (S3) Basics

* **Global Storage Platform** that is regional-based and regional-resilient.
* **Public service**, unlimited data and multi-user.
* Can handle massive amounts of data (movies, audio, photos, text, large data sets, etc.).
* Economical and accessed via UI, CLI, API, HTTP.
* Delivers Objects and Buckets.

Objects ...

* Key: e.g. `koala.jpg`.
* Value: Content being stored (0-bytes to 5 TB).
* Version ID.
* Metadata.
* Access Control.
* Subresources.

Buckets ...

**Blast Radius** in case of failure or corruption = Region.

* In a specific AWS Region.
* Data inside a bucket has a primary home region; it never leaves the region unless it is configured to leave.
* **Bucket name is Globally Unique**.
* Can hold unlimited Objects.
* Flat Structure, all Objects stored at the same level (root).
* `/old/koala.jpg` is the complete Key; the UI displays the `old` as a file, even though it is actually a part of the Key (or name).

### Summary

* Bucket Limits: 100 is a soft limit, 1,000 hard limit per Account.
* Unlimited Objects in a Bucket, **0-bytes to 5 TB**.
* Key/Value Structure = Name/Data.

**Bucket names** ...

* **Are Globally Unique**.
* 2-63 characters, all lowercase, and no underscores.
* Start with a lowercase letter or a number.
* Cannot be IP formatted (example, 1.1.1.1).

### Patterns and Anti-Patterns

* S3 is an Object store. It is not a file or block storage system.
* **Cannot mount** an S3 Bucket (`k:\` or `/images`).
* Great for large-scale data storage, distribution, or uploads.
* Great for *offloading* things.
* Input and/or Output to many AWS products.

## DEMO: Creating an S3 Bucket

1. Go to the S3 Console.
2. Click the **Create Bucket** button.
3. Select *Globally Unique Name* and *Region*.
4. Uncheck **Block *all* Public Access** and associated acknowledgment.
5. Click **Create Bucket** at the bottom of the page.

Once created ...

1. Click the Bucket Name to see what's inside it.

   * Properties Tab, Amazon Resource Name (ARN) - unique resource identifier.
   * Overview Tab, an overview of all the Objects in this bucket.

2. Click the **Upload** button.
3. Click the **Add Files** button, select files, and open.

   * The system will show the files and size estimates.
   * Destination will be unique to each bucket.
   * Versioning is not enabled at this point.
   * Storage class: Standard.

4. Click the **Upload** button.
5. Once they are all uploaded click the **Close** button to close the dialog.

Folders ...

Technically, there are no folders. This creates an object that allows the UI to display it as a folder. This process creates a file with a "name" that includes the `<foldername>`/`<filename>`.

1. Click the **Create Folder** button.
2. Provide a name for the folder.
3. Click the **Create Folder** button.
4. Click the named folder.
5. Click the **Upload** button.
6. Click the **Add Files** button, select a file, and open.
7. Click the **Upload** button.
8. Once they are all uploaded click the **Close** button to close the dialog.

Open an Object ...

1. Click the name of one of the files. This opens an overview with an **Object URL**.
2. Right-Click and Open in New Tab. This presents an `AccessDenied` Error (private by default).
3. Close the tab.
4. Click the **Open** button (authentication included in the URL).

Delete the Bucket ...

1. Return to the S3 Console.
2. Select the Bucket.
3. Click the **Empty** button.
4. Type in *permanently delete* into the input.
5. Click the **Empty** button.
6. Click the **Exit** button.
7. With the Bucket still selected, click the **Delete** button.
8. Enter the name of the bucket in the input.
9. Click the **Delete bucket** button.

# Simple Storage Service (S3)

## S3 Security

* **S3 is private by default**.

S3 Bucket Policies ...

* A form of resource policy.
* A resource policy is like an identity policy, but attached to a bucket.
* Resource perspective permissions.
* Can `ALLOW` or `DENY` access on the same or different accounts.
* Can `ALLOW` or `DENY` to anonymous principals.

Access Control Lists (ACLs) ...

* Are on objects and buckets.
* A subresource.
* Legacy.
* Inflexible and only allow simple permissions.

| Permission | Bucket | Object |
|----------------|--------|--------|
| READ | Allows grantee to list the objects in the bucket. | Allows grantee to read the object data and its metadata. |
| WRITE | Allows grantee to create, overwrite, and delete any object in the bucket. | NA |
| READ_ACP | Allows grantee to read the bucket ACL. | Allows grantee to read the object ACL. |
| WRITE_ACP | Allows grantee to write the ACL for the applicable bucket. | Allows grantee to write the ACL for the applicable object. |
| FULL_CONTROL | Allow grantee the READ, WRITE, READ_ACP, and WRITE_ACP permissions on the bucket. |  Allow grantee the READ, WRITE, READ_ACP, and WRITE_ACP permissions on the object. |

Security ...

* Identity: Controlling different resources.
* Identity: Preference for IAM.
* Identity: Same account.
* Bucket: Just controlling S3.
* Bucket: Anonymous or Cross-Account.
* ACLs: NEVER - unless there is no choice.

## S3 Static Hosting

* Normal access is via **AWS APIs**.
* This feature allows access via **HTTP** - for example, a simple blog.
* Index and Error documents are set.
* A static **Website Endpoint** is created.
* Custom Domain via Route 53, then **Bucketname Matters**.

## DEMO: Create a static website with S3

1. Go to the S3 Console.
2. Click on the **Create bucket** button.
3. Bucket Name: `top10.<domain-name>.com`.
4. Uncheck "Block all public access" and acknowledge.
5. Click on the **Create bucket** button.
6. Click on the name of the bucket.
7. Go to the Properties tab.
8. Find "Static website hosting" and click on the **Edit** button.
9. Select Enable.
10. Enter the Index and Error documents.
11. Click on the **Save changes** button.
12. Find "Static website hosting" again and copy the Bucket website endpoint.
13. Go to the Objects tab.
14. Click on the **Upload** button.
15. Upload the necessary files and folders.
16. Click on the **Upload** button.
17. Click on the **Close** button.
18. Go to the Permissions tab.
19. Locate Bucket policy and click on the **Edit** button.
20. Replace the policy with an `ALLOW` policy.
21. Click on the **Save changes** button.

Website URL ...

1. Copy the Bucket website endpoint.
2. Go to the Route 53 Console.
3. Click on the **Hostex zones** link to the left.
4. Click on the name previously created.
5. Click on the **Create route** button.
6. (Switch to Wizard Mode).
7. Select Simple routing and click the **Next** button.
8. Click on the **Define simple record** button.
9. Enter the record name as defined above.
10. Under Value/Route traffic to, select Alias to S3 website endpoint, the region, and the S3 Bucket from above.
11. Click on the **Define simple record** button.
12. Click on the **Create records** button.

## Object Versioning and MFA Delete

### Object Versioning

* Versioning is Disabled by default.
* Versioning can be Enabled, but cannot then be Disabled again.
* Versioning can be Suspended and Enabled again.

Versioning ...

Versioning allows storage of **multiple versions** of objects within a bucket. Operations which would modify objects **generate a new version**.

* The Key is the name of the file.
* IDs are used to version objects.
* Deletion places a Delete Marker, hides the previous versions. The Delete Maker can be removed.
* Version Deletion actually removes the object.

Notes ...

* Space is consumed by all versions.
* Billing is applied to all versions.
* The only way to zero costs is to delete the bucket.

MFA Delete ...

* Enabling in versioning configuration.
* MFA is required to change bucket **versioning state**.
* MFA is required to **delete versions**.
* Serial number (MFA), as well as the generated code, is passed to any API calls.

## DEMO: S3 Versioning

1. Go to the S3 Console.
2. Click on the **Create bucket** button.
3. Name the bucket, uncheck "block all public access," acknowledge, enabled "Bucket Versioning," and click the **Create bucket** button.
4. Click on the name of the bucket.
5. Select the Properties tab, find "Static website hosting," and click the **Edit** button.
6. Select Enable, set the Index and Error documents, and click the **Save changes** button.
7. Select the Permissions tab, find "Bucket policy," and click the **Edit** button.
8. Replace the policy with an `ALLOW` policy.
9. Click the **Save changes** button.
10. Select the Objects tab, add the files and folders, and click the **Upload** button.
11. Click the **Close** button.
12. Click the **Show versions** toggle.



# Use Azure Resource Manager

## Azure Resource Manager Benefits

The infrastructure for your application is typically made up of many components – maybe a virtual machine, storage account, and virtual network, or a web app, database, database server, and third-party services. These components are not separate entities, instead they are related and interdependent parts of a single entity. You want to deploy, manage, and monitor them as a group.

Azure Resource Manager enables you to work with the resources in your solution as a group. You can deploy, update, or delete all the resources for your solution in a single, coordinated operation. You use a template for deployment and that template can work for different environments such as testing, staging, and production. Azure Resource Manager provides security, auditing, and tagging features to help you manage your resources after deployment.

## Consistent management layer

Azure Resource Manager provides a consistent management layer to perform tasks through Azure PowerShell, Azure CLI, Azure portal, REST API, and client SDKs. Choose the tools and APIs that work best for you.

## Benefits

Azure Resource Manager provides several benefits:

* You can deploy, manage, and monitor all the resources for your solution as a group, rather than handling these resources individually.
* You can repeatedly deploy your solution throughout the development lifecycle and have confidence your resources are deployed in a consistent state.
* You can manage your infrastructure through declarative templates rather than scripts.
* You can define the dependencies between resources so they're deployed in the correct order.
* You can apply access control to all services in your resource group because Role-Based Access Control (RBAC) is natively integrated into the management platform.
* You can apply tags to resources to logically organize all the resources in your subscription.
* You can clarify your organization's billing by viewing costs for a group of resources sharing the same tag.

## Guidance

The following suggestions help you take full advantage of Azure Resource Manager when working with your solutions.

* Define and deploy your infrastructure through the declarative syntax in Azure Resource Manager templates, rather than through imperative commands.
* Define all deployment and configuration steps in the template. You should have no manual steps for setting up your solution.
* Run imperative commands to manage your resources, such as to start or stop an app or machine.
* Arrange resources with the same lifecycle in a resource group. Use tags for all other organizing of resources.

## Terminology

* **resource** - A manageable item that is available through Azure. Some common resources are a virtual machine, storage account, web app, database, and virtual network, but there are many more.
* **resource group** - A container that holds related resources for an Azure solution. The resource group can include all the resources for the solution, or only those resources that you want to manage as a group. You decide how you want to allocate resources to resource groups based on what makes the most sense for your organization.
* **resource provider** - A service that supplies the resources you can deploy and manage through Resource Manager. Each resource provider offers operations for working with the resources that are deployed. Some common resource providers are `Microsoft.Compute`, which supplies the virtual machine resource, `Microsoft.Storage`, which supplies the storage account resource, and `Microsoft.Web`, which supplies resources related to web apps.
* **template** - A JavaScript Object Notation (JSON) file that defines one or more resources to deploy to a resource group. It also defines the dependencies between the deployed resources. The template can be used to deploy the resources consistently and repeatedly.
* **declarative syntax** - Syntax that lets you state "Here is what I intend to create" without having to write the sequence of programming commands to create it. The Resource Manager template is an example of declarative syntax. In the file, you define the properties for the infrastructure to deploy to Azure.

### Resource providers

Each resource provider offers a set of resources and operations for working with an Azure service. For example, if you want to store keys and secrets, you work with the Microsoft.KeyVault resource provider. This resource provider offers a resource type called vaults for creating the key vault.

The name of a resource type is in the format: `{resource-provider}/{resource-type}`. For example, the key vault type is `Microsoft.KeyVault/vaults`.

## Creating Resource Groups

Resources can be deployed to any new or existing resource group. Deployment of resources to a resource group becomes a job where you can track the template execution. If deployment fails, the output of the job can describe why the deployment failed. Whether the deployment is a single resource to a group or a template to a group, you can use the information to fix any errors and redeploy. Deployments are incremental; if a resource group contains two web apps and you decide to deploy a third, the existing web apps will not be removed.

### Considerations

Resource Groups are at their simplest a logical collection of resources. There are a few rules for resource groups.

* Resources can only exist in one resource group.
* Resource Groups cannot be renamed.
* Resource Groups can have resources of many different types (services).
* Resource Groups can have resources from many different regions.

### Creating resource groups

There are some important factors to consider when defining your resource group:

* All the resources in your group should share the same lifecycle. You deploy, update, and delete them together. If one resource, such as a database server, needs to exist on a different deployment cycle it should be in another resource group.
* Each resource can only exist in one resource group.
* You can add or remove a resource to a resource group at any time.
* You can move a resource from one resource group to another group. Limitations do apply to moving resources.
* A resource group can contain resources that reside in different regions.
* A resource group can be used to scope access control for administrative actions.
* A resource can interact with resources in other resource groups. This interaction is common when the two resources are related but don't share the same lifecycle (for example, web apps connecting to a database).

When creating a resource group, you need to provide a location for that resource group. You may be wondering, "Why does a resource group need a location? And, if the resources can have different locations than the resource group, why does the resource group location matter at all?" The resource group stores metadata about the resources. Therefore, when you specify a location for the resource group, you're specifying where that metadata is stored. For compliance reasons, you may need to ensure that your data is stored in a particular region.

### Crating Resource Manager Locks

A common concern with resources provisioned in Azure is the ease with which they can be deleted. An over-zealous or careless administrator can accidentally erase months of work with a few steps. Resource Manager locks allow organizations to put a structure in place that prevents the accidental deletion of resources in Azure.

* You can associate the lock with a subscription, resource group, or resource.
* Locks are inherited by child resources.

#### Lock types

There are two types of resource locks.

* Read-Only locks, which prevent any changes to the resource.
* Delete locks, which prevent deletion.

## Reorganize Azure Resources

When moving resources, both the source group and the target group are locked during the operation. Write and delete operations are blocked on the resource groups until the move completes. This lock means you can't add, update, or delete resources in the resource groups. Locks don't mean the resources aren't available. For example, if you move a virtual machine to a new resource group, an application can still access the virtual machine.

### Limitations

Before beginning this process be sure to read the Move operation support for resources page. This page details what resources can be moved between resources group, subscriptions, and regions.

### Implementation

To move resources, select the resource group containing those resources, and then select the Move button. Select the resources to move and the destination resource group. Acknowledge that you need to update scripts.

## Remove Resources and Resource Groups

Use caution when deleting a resource group. Deleting a resource group deletes all the resources contained within it. That resource group might contain resources that resources in other resource groups depend on.

### Using PowerShell to delete resource groups

To remove a resource group use, `Remove-AzResourceGroup`. In this example, we are removing the `ContosoRG01` resource group from the subscription. The cmdlet prompts you for confirmation and returns no output.

```powershell
Remove-AzResourceGroup -Name "ContosoRG01"
```

### Removing resources

You can also delete individual resources within a resource group. For example, here we are deleting a virtual network. Instead, of deleting you can move the resource to another resource group.

## Determine Resource Limits

* The limits shown are the limits for your subscription.
* When you need to increase a default limit, there is a Request Increase link.
* All resources have a maximum limit listed in Azure limits.
* If you are at the maximum limit, the limit can't be increased.

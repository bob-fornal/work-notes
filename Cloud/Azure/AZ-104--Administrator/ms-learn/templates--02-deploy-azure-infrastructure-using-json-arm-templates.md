# Deploy Azure Infrastructure using JSON ARM Templates

JSON Azure Resource Manager templates (ARM templates) allow you to specify your project's infrastructure in a declarative and reusable way. You can version and save the templates in the same source control as your development project.

## Azure Resource Manager template structure

### What is infrastructure as code?

Infrastructure as code allows you to describe, through code, the infrastructure that you need for your application.

With infrastructure as code, you can maintain both your application code and everything you need to deploy your application in a central code repository. The advantages to infrastructure as code are:

* Consistent configurations
* Improved scalability
* Faster deployments
* Better traceability

### What is an ARM template?

ARM templates are JavaScript Object Notation (JSON) files that define the infrastructure and configuration for your deployment. The template uses a *declarative syntax*. The declarative syntax is a way of building the structure and elements that outline what resources will look like without describing the control flow. Declarative syntax is different than imperative syntax, which uses commands for the computer to perform. Imperative scripting focuses on specifying each step in deploying the resources.

ARM templates allow you to declare what you intend to deploy without having to write the sequence of programming commands to create it. In an ARM template, you specify the resources and the properties for those resources. Azure Resource Manager then uses that information to deploy the resources in an organized and consistent manner.

### Benefits of using ARM templates

ARM templates allow you to automate deployments and use the practice of infrastructure as code (IaC). The template code becomes part of your infrastructure and development projects. Just like application code, you can store the IaC files in a source repository and version it.

ARM templates are idempotent, which means you can deploy the same template many times and get the same resource types in the same state.

Resource Manager orchestrates deploying the resources so they're created in the correct order. When possible, resources will also be created in parallel, so ARM template deployments finish faster than scripted deployments.

Resource Manager also has built-in validation. It checks the template before starting the deployment to make sure the deployment will succeed.

If your deployments become more complex, you can break your ARM templates into smaller, reusable components. You can link these smaller templates together at deployment time. You can also nest templates inside other templates.

In the Azure portal, you can review your deployment history and get information about the state of the deployment. The portal displays values for all parameters and outputs.

You can also integrate your ARM templates into continuous integration and continuous deployment (CI/CD) tools like Azure Pipelines, which can automate your release pipelines for fast and reliable application and infrastructure updates. By using Azure DevOps and ARM template tasks, you can continuously build and deploy your projects.

### ARM template file structure

When you're writing an ARM template, you need to understand all the parts that make up the template and what they do. ARM template files are made up of the following elements:

| Element | Description |
|---------|-------------|
| schema | A required section that defines the location of the JSON schema file that describes the structure of JSON data. The version number you use depends on the scope of the deployment and your JSON editor. |
| contentVersion | A required section that defines the version of your template (such as 1.0.0.0). You can use this value to document significant changes in your template to ensure you're deploying the right template. |
| apiProfile | An optional section that defines a collection of API versions for resource types. You can use this value to avoid having to specify API versions for each resource in the template. |
| parameters | An optional section where you define values that are provided during deployment. These values can be provided by a parameter file, by command-line parameters, or in the Azure portal. |
| variables | An optional section where you define values that are used to simplify template language expressions. |
| functions | An optional section where you can define user-defined functions that are available within the template. User-defined functions can simplify your template when complicated expressions are used repeatedly in your template. |
| resources | A required section that defines the actual items you want to deploy or update in a resource group or a subscription. |
output | An optional section where you specify the values that will be returned at | the end of the deployment. |

### Deploy an ARM template to Azure

You can deploy an ARM template to Azure in one of the following ways:

* Deploy a local template
* Deploy a linked template
* Deploy in a continuous deployment pipeline

To deploy a local template, you need to have either Azure PowerShell or the Azure CLI installed locally.

### Add resources to the template

To add a resource to your template, you'll need to know the resource provider and its types of resources. The syntax for this combination is in the form of `{resource-provider}/{resource-type}`. For example, to add a storage account resource to your template, you'll need the Microsoft.Storage resource provider. One of the types for this provider is storageAccount. So your resource type will be displayed as `Microsoft.Storage/storageAccounts`. You can use a list of resource providers for Azure services to find the providers you need.

## Add flexibility to your Azure Resource Manager template by using parameters and outputs

### ARM-template parameters

ARM-template parameters let you customize the deployment by providing values that are tailored for a particular environment. For example, you pass in different values based on whether you're deploying to an environment for development, test, production, or others. For example, the previous template uses the *Standard_LRS* storage account SKU. You can reuse this template for other deployments that create a storage account by making the name of the storage account SKU a parameter. Then, you pass in the name of the SKU you want for this particular deployment when the template is deployed. You can do this step either at the command line or by using a parameter file.

In the `parameters` section of the template, you specify which values you can input when you deploy the resources. You're limited to 256 parameters in a template. Parameter definitions can use most template functions.

```json
"parameters": {
  "<parameter-name>": {
    "type": "<type-of-parameter-value>",
    "defaultValue": "<default-value-of-parameter>",
    "allowedValues": [
      "<array-of-allowed-values>"
    ],
    "minValue": <minimum-value-for-int>,
    "maxValue": <maximum-value-for-int>,
    "minLength": <minimum-length-for-string-or-array>,
    "maxLength": <maximum-length-for-string-or-array-parameters>,
    "metadata": {
      "description": "<description-of-the-parameter>"
    }
  }
}
```

### Recommendations for using parameters

Use parameters for settings that vary according to the environment; for example, SKU, size, or capacity. Also use parameters for resource names that you want to specify yourself for easy identification or to comply with internal naming conventions. Provide a description for each parameter, and use default values whenever possible.

For security reasons, never hardcode or provide default values for usernames and/or passwords in templates. Always use parameters for usernames and passwords (or secrets). Use secureString for all passwords and secrets. If you pass sensitive data in a JSON object, use the secureObject type. Template parameters with secureString or secureObject types can't be read or harvested after the deployment of the resource.

### Use parameters in an ARM template

In the parameters section of the ARM template, specify the parameters that you can input when you deploy the resources. You're limited to 256 parameters in a template.

Here's an example of a template file with a parameter for the storage-account SKU defined in the template's parameters section. You can provide a default for the parameter to be used if no value is specified at execution.

```json
"parameters": {
  "storageAccountType": {
    "type": "string",
    "defaultValue": "Standard_LRS",
    "allowedValues": [
      "Standard_LRS",
      "Standard_GRS",
      "Standard_ZRS",
      "Premium_LRS"
    ],
    "metadata": {
      "description": "Storage Account type"
    }
  }
}
```

Then, use the `parameter` in the resource definition. The syntax is `[parameters('name of the parameter')]`. You'll use the parameters function.

```json
"resources": [
  {
    "type": "Microsoft.Storage/storageAccounts",
    "apiVersion": "2019-04-01",
    "name": "learntemplatestorage123",
    "location": "[resourceGroup().location]",
    "sku": {
      "name": "[parameters('storageAccountType')]"
    },
    "kind": "StorageV2",
    "properties": {
      "supportsHttpsTrafficOnly": true
    }
  }
]
```

When you deploy the template, you can provide a value for the parameter. Notice the last line in the following command:

```bash
templateFile="azuredeploy.json"
az deployment group create \
  --name testdeployment1 \
  --template-file $templateFile \
  --parameters storageAccountType=Standard_LRS
```

### ARM template outputs

In your ARM template's outputs section, you can specify values that will be returned after a successful deployment. Here are the elements that make up the outputs section.

```json
"outputs": {
  "<output-name>": {
    "condition": "<boolean-value-whether-to-output-value>",
    "type": "<type-of-output-value>",
    "value": "<output-value-expression>",
    "copy": {
      "count": <number-of-iterations>,
      "input": <values-for-the-variable>
    }
  }
}
```

| Element | Description |
|---------|-------------|
| output-name | Must be a valid JavaScript identifier. |
| condition | (Optional) A Boolean value that indicates whether this output value is returned. When true, the value is included in the output for the deployment. When false, the output value is skipped for this deployment. When not specified, the default value is true. |
| type | The type of the output value. |
| value | (Optional) A template language expression that's evaluated and returned as an output value. |
| copy | (Optional) Copy is used to return more than one value for an output. |

#### Use outputs in an ARM template

Here's an example to output the storage account's endpoints:

```json
"outputs": {
  "storageEndpoint": {
    "type": "object",
    "value": "[reference('learntemplatestorage123').primaryEndpoints]"
  }
}
```

#### Deploy an ARM template again

Recall that ARM templates are idempotent, which means you can deploy the template to the same environment again, and if nothing was changed in the template, nothing will change in the environment. If a change was made to the template (for example, you changed a parameter value), only that change will be deployed. Your template can contain all of the resources you need for your Azure solution, and you can safely execute a template again. Resources will be created only if they didn't already exist and updated only if there's a change.

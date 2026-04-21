# Management and customization considerations with GitHub Copilot

## GitHub Copilot plans and their associated management and customization features

Management Policy Features

| Feature | Free* & Pro | Business | Enterprise |
|---------|-------------|----------|------------|
| Public code filter | ✅ | ✅ | ✅ |
| User management | ❌ | ✅ | ✅ |
| Data excluded from training by default | ❌ | ✅ | ✅ |
| Enterprise-grade security | ❌ | ✅ | ✅ |
| IP indemnity | ❌ | ✅ | ✅ |
| Content exclusions | ❌ | ✅ | ✅ |
| SAML SSO authentication | ❌ | ✅ | ✅ |
| Require GitHub Enterprise Cloud | ❌ | ❌ | ✅ |
| Usage metrics | ❌ | ✅ | ✅ |

* GitHub Copilot Free has usage limitations

Customization features

| Feature | Free* & Pro | Business | Enterprise |
|---------|-------------|----------|------------|
| Tailor chat conversations to your private codebase | ❌ | ❌ | ✅ |
| Unlimited integrations with Copilot Extensions (public beta) | ✅ | ✅ | ✅ |
| Build a private extension for internal tooling (public beta) | ✅ | ✅ | ✅ |
| Attach knowledge bases to chat for organizational context | ❌ | ❌ | ✅ |

* GitHub Copilot Free has usage limitations

When you're selecting a GitHub Copilot pricing plan, you and your organization should consider these key factors:

* **Data privacy and security**: The plans offer varying levels of data privacy and security measures. For instance, GitHub Copilot Business and Enterprise are the only plans that provide more robust privacy controls. These controls include the ability to exclude specific files from GitHub Copilot analysis, access detailed audit logs, and provide IP indemnity.
* **Policy management**: The ability to manage Copilot policies at an organizational level is crucial. Business and Enterprise plans allow for comprehensive policy management, to help ensure that sensitive data is handled according to the organization's privacy policies.
* **Data collection and retention**: Understanding how data is collected and retained is essential for compliance with data privacy regulations. Individual subscribers can choose whether GitHub collects and retains their prompts and Copilot suggestions.
* **IP indemnity and data privacy**: For businesses and enterprises, IP indemnity and data privacy are critical to avoiding legal, security, and customer issues. Evaluating the need for these features can help determine the most suitable pricing plan for your business.

## Explore contractual protections in GitHub Copilot and disabling matching public code

To help ensure that your organization remains compliant with legal requirements, GitHub Copilot offers:

* **IP indemnity**: The GitHub Copilot Business and Enterprise plans include IP indemnity, which provides legal protection against intellectual property claims related to the use of Copilot suggestions. With IP indemnity, if any suggestion from GitHub Copilot is challenged as infringing on third-party IP rights, GitHub assumes legal responsibility. For GitHub to assume legal responsibility, the Matching public code setting must be blocked.
* **Data Protection Agreement (DPA)**: GitHub offers a DPA that outlines the measures taken to protect your data and ensure compliance with data privacy regulations. These agreements provide transparency and assurance that your data is handled securely and responsibly.
* **GitHub Copilot Trust Center**: The GitHub Copilot Trust Center provides detailed information about how GitHub Copilot works, including security, privacy, compliance, and intellectual property safeguards. This resource helps organizations feel confident using GitHub Copilot while adhering to best practices and legal requirements.

Filtering out matching public code

GitHub Copilot can help minimize potential code overlap by identifying and filtering out code suggestions that match publicly available code. This feature is essential for maintaining the originality and security of your codebase. It can reduce the risk of incorporating nonsecure or noncompliant code into your projects.

Key distinctions

| Scope | Who can manage | What it controls | Notes |
|-------|----------------|------------------|-------|
| Organization (Business/Enterprise plans) | Admins | Public Code filter for all members; required for IP indemnity | Organization admins can block suggestions matching public code for all members. This is required to activate Intellectual Property Indemnity. |
| Personal account (Free, Pro, Pro+) – individually paid | Individual user | Toggle to Allow or Block suggestions matching public code | Users who purchase their own Copilot license can fully control this setting in their personal account under Copilot → Features → Privacy. |
| Personal account (Free, Pro, Pro+) – org-provided | Individual user | Toggle to Allow or Block suggestions matching public code | If your seat is assigned by an organization, the toggle may be locked and will reflect the organization’s policy. |

Managing the organizational public code filter

For organizations on **Business or Enterprise** plans, admins can control whether Copilot blocks suggestions that match public code. This is important for compliance and to enable IP indemnity.

Steps for organization admins:

1. In the upper-right corner of GitHub, click your profile picture, then select Your enterprises or Your organizations.
2. Next to the enterprise or organization you want to configure, click Settings.
3. In the left sidebar, click Copilot under Code, planning, and automation.
4. Click Features, then scroll to the Privacy section.
5. Locate Suggestions matching public code and choose the desired option (e.g., Block to prevent matching suggestions across the organization).
6. Click Save to apply the changes.

Managing public code suggestions for personal users

If you are paying for your own Copilot license (Free, Pro, or Pro+), you can control suggestions matching public code directly in your account.

Steps for personal license holders:

1. In the upper-right corner of GitHub, click your profile picture, then select Settings.
2. In the left sidebar, click Copilot under Code, planning, and automation.
3. Click Features, then scroll to the Privacy section.
4. Locate Suggestions matching public code and toggle between Allow or Block according to your preference.
5. Your choice will immediately affect the suggestions Copilot provides in your personal environment.

## Manage content exclusions

The content exclusion feature in GitHub Copilot helps protect sensitive information by preventing the use of specific files, directories, or repositories to inform code-completion suggestions.

### Configurations for content exclusion

To implement content exclusion strategies, repository administrators and organization owners can use the following configurations.

Configure content exclusions for repositories

1. On GitHub, go to the main page of the repository.
2. Under the repository name, select Settings.
3. In the sidebar, in the Code & automation section, select Copilot.
4. In the Repositories and paths to exclude section, specify the files or directories to exclude from Copilot suggestions.

Configure content exclusions for organizations

1. In the upper-right corner of GitHub, select your profile photo, and then select Your organizations.
2. Next to the organization, select Settings.
3. On the left sidebar, select Copilot > Content exclusion.
4. Enter the details of files or repositories to exclude from Copilot suggestions.

### Impact of content exclusion on code suggestions

You can use content exclusions to configure GitHub Copilot to ignore certain files. When you exclude content from GitHub Copilot:

* Code completion is no longer available in the affected files.
* The content in affected files won't inform code completion suggestions in other files.
* The content in affected files won't inform GitHub Copilot Chat responses.

Content exclusions can significantly affect the quality and relevance of code suggestions that GitHub Copilot generates. When you exclude certain files or directories, GitHub Copilot won't use the content in those files to inform its suggestions. This action can lead to more secure and compliant code suggestions, but it might also reduce the overall context available to GitHub Copilot. This reduction could potentially affect the accuracy and usefulness of the suggestions.

You can specify content exclusions only in the settings for an organization or repository. Content exclusion settings that are defined in an organization or repository within an enterprise apply to all members who are licensed as part of a GitHub Copilot Business or GitHub Copilot Enterprise subscription.

### Limitations of content exclusions

Although content exclusions are a valuable tool for managing privacy and security, they might not be fully effective in some scenarios. For instance:

* IDE limitations: In some integrated development environments (IDEs), content exclusions might not apply when you're using certain features, such as Copilot Chat. For example, in Visual Studio Code and Visual Studio, content exclusions are not applied when you use the @github chat participant in your question.
* Semantic information: Copilot might still use semantic information from an excluded file if the IDE provides the information in a nonexcluded file. This includes type information and hover-over definitions for symbols or function calls used in code.
* Policy scope: Content exclusion settings apply only to members of the organization in which you configure the content exclusion. Anyone else who can access the specified files can still see code completion suggestions and Copilot Chat responses referencing the specified files.

## Troubleshoot common problems with GitHub Copilot

### Code suggestions are missing

One of the most common problems that users encounter with GitHub Copilot is the absence of code suggestions. If Copilot isn't providing code suggestions in your editor, try these troubleshooting actions:

* Check your internet connection: Ensure that you have a stable internet connection, because GitHub Copilot requires an active connection to function properly.
* Update the Copilot extension: Make sure you're using the latest version of the GitHub Copilot extension. Older versions might not communicate effectively with the Copilot servers.
* Verify IDE compatibility: Confirm that your IDE is compatible with GitHub Copilot. Some IDEs might require specific configurations or updates to work with Copilot.
* Review content exclusions: If certain files are excluded from a Copilot analysis, suggestions might not appear for those files. Check the content exclusion settings to ensure they're configured correctly.

### Content exclusions aren't working as expected

Content exclusions are designed to prevent GitHub Copilot from using specific files or directories. However, content exclusions might not work as expected in some scenarios. Here are some common problems and their resolutions:

* Delayed application of exclusions: After you add or change content exclusions, the changes can take up to 30 minutes to take effect in IDEs where the settings are already loaded. To apply changes immediately, reload the content exclusion settings in your IDE.
* Inadequate scope of exclusions:

    * Content exclusion settings apply only to members of the organization in which you configured the exclusion. Ensure that all relevant team members have the appropriate settings applied.
    * Check the GitHub Copilot icon on the status bar. If a GitHub Copilot content exclusion applies to the file, the GitHub Copilot icon has a diagonal line through it. Hover over the icon to see whether an organization or the parent repository disabled GitHub Copilot for the file.

* IDE-specific limitations: In some IDEs, content exclusions might not apply when you're using certain features, such as GitHub Copilot Chat. Be aware of these limitations and adjust your workflow accordingly.

### Code suggestions are unsatisfactory

If the suggestions that GitHub Copilot is generating are unsatisfactory, you can use these techniques to prompt Copilot to provide better results:

* Provide clear context: Ensure that your code provides clear context for GitHub Copilot to generate relevant suggestions. This task includes writing descriptive comments and using meaningful variable names.
* Use Copilot commands: In some IDEs, you can use specific commands to prompt Copilot to generate suggestions. For example, in Visual Studio Code, you can use the Ctrl+Enter shortcut to trigger GitHub Copilot.
* Adjust prompt length: Sometimes, providing a longer or more detailed prompt can help Copilot generate better suggestions. Experiment with different prompt lengths to see what works best.



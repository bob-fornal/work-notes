# /wp-cli

Wordpress Command Line Interface (CLI)

The WordPress Command Line interface makes WordPress site administration quick and easy.

Using the dashboard, it would take a good few minutes per site, using WP CLI, the entire process can be completed in a few seconds and importantly, you can run the entire process unattended.

Some of the administration tasks you can complete with wp-cli are:

* install a new WordPress site in seconds.
* update the WP core, themes and plugins in seconds.
* install themes and plugins.
* activate and deactivate themes and plugins.
* create a WordPress child-theme in seconds.
* search-replace the sites database.
* upload media to the site.
* administer users, posts and pages.

With WP CLI you are able to automate the entire update process and even configure unattended updates.

## Important

* Do not run wp-cli as root (plugins can hook into lifecycle / malicious code).
* Ensure the path is correct.
* Watch for blank spaces; don't leave.
* Ensure ownership and/or permissions are correct.

## Ownership & Permissions

### nginx & Apache

wp-cli runs as non-root server user

`www-data` is the web-server user.

1. www-data is owner and group owner (non-root, no rights or permissions): cannot administer without changing ownership and permission.
2. user is owner and www-data is the group owner: right and permission.

### LiteSpeed



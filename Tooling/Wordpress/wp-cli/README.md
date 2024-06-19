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

wp-cli runs as ***non-root server user***

`www-data` is the web-server user.

1. `www-data` is owner and group owner (non-root, no write permissions): cannot administer without changing ownership and permission.
2. `user` is owner and `www-data` is the group owner: write permissions.

### LiteSpeed

* LiteSpeed is the owner and group owner of the wp files and directories.
* ***non-root server user*** (no write permissions). Must change ownership and permissions.

#### Ownership and Permissions Issue

* Install a plugin with the dashboard; cannot delete it using wp-cli.
* Install a plugin with the wp-cli, cannot delete it using dashboard.

Solve: Bash Scripts

Principal of least privelege.

* Prior to using wp-cli
* After using wp-cli

### Template Files (Apache & Nginx)

BEFORE ...

```bash
#!/bin/bash

# Set Ownership and Permissions to Allow Administration using both wp-cli and the Dasbhoard
# Replace example.com with your domain name

sudo chown -R $USER:www-data /var/www/example.com/public_html/
sudo find /var/www/example.com/public_html -type d -exec chmod 775 {} \;
sudo find /var/www/example.com/public_html -type f -exec chmod 664 {} \;
```

AFTER (www-data:www-data ownership scheme) ...

```bash
#!/bin/bash

# Set Ownership and Permissions to Allow for www-data:www-data ownership scheme
# Replace example.com with your domain name

sudo chown -R www-data:www-data /var/www/example.com/public_html/
sudo find /var/www/example.com/public_html -type d -exec chmod 755 {} \;
sudo find /var/www/example.com/public_html -type f -exec chmod 644 {} \;
```

... OR ($USER:www-data ownership scheme) ...

```bash
#!/bin/bash

# Set Ownership and Permissions to Allow for www-data:www-data ownership scheme
# Replace example.com with your domain name

sudo chown -R $USER:www-data /var/www/example.com/public_html/
sudo find /var/www/example.com/public_html -type d -exec chmod 755 {} \;
sudo find /var/www/example.com/public_html -type f -exec chmod 644 {} \;
sudo find /var/www/example.com/public_html/wp-content/ -type d -exec chmod 775 {} \;
sudo find /var/www/example.com/public_html/wp-content/ -type f -exec chmod 664 {} \;
```

### Template Files (LiteSpeed)

BEFORE ...

```bash
#!/bin/bash

# Set Ownership and Permissions to Allow Administration using both wp-cli and the Dasbhoard
# Replace example.com with your domain name

sudo chown -R nobody:nogroup /usr/local/lsws/example.com/html/
sudo find /usr/local/lsws/example.com/html/ -type d -exec chmod 775 {} \;
sudo find /usr/local/lsws/example.com/html/ -type f -exec chmod 664 {} \;
```

AFTER (nobody:nogroup ownership scheme) ...

```bash
#!/bin/bash

# Set Ownership and Permissions to Allow for nobody:nogroup ownership scheme
# Replace example.com with your domain name

sudo chown -R nobody:nogroup /usr/local/lsws/example.com/html/
sudo find /usr/local/lsws/example.com/html/ -type d -exec chmod 755 {} \;
sudo find /usr/local/lsws/example.com/html/ -type f -exec chmod 644 {} \;
```
### Execution

```bash
chmod -x [filename].sh
```

## Installation

1. Download the wp-cli phar file.
2. Confirm it runs correctly.
3. Set executable permissions.
4. Move wp-cli into the "path."

`phar` file is a PHP Archive file

## Updating

* `sudo wp cli update` command needs to be run as root.
* Recommend: cron job 3x per week.

```bash
sudo crontab -e
```

```script
# m h dom mon command
00 11 * * 1,3,5 /usr/local/bin/wp cli update --yes >/dev/nill 2>&1
```

```bash
sudo crontab -l
```

## /wp-cli Command Completion

### "tab" completion

1. Create a script file.
2. Add the script file to the `.bashrc` file.
3. "source" the `.bashrc` file.

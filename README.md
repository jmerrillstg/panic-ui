# Panic UI

This application provides an interface to manage recipients and messages for the Raspberry Pi Panic Button

## Installation

This application must be run on an apache 2 web server with mod_rewrite enabled. You will also need NPM and Bower to install packages.

To install the project clone the repo and then run the following commands in the terminal while in the clone directory.
```
npm install gulp -g
npm install gulp-cli -g
npm install bower -g
npm install
bower install
```

Edit the file **/config.json** to configure the environment based API URL.

Once installed and configured you can build the project by running the following command in the project's root directory

```
gulp buildDev
```

Once built, the contents of the **/public** directory can be placed in the webroot of the web server.

The apache server will need to have the following setting enabled in the site configuration

```apacheconfig
FallbackResource /index.html
```
And in the apache directory configuration the following setting

```apacheconfig
AllowOverride All
```

## Development

To use browsersync create an apache vhost with the hostname of **localhost.panic** with the webroot pointing to the **/public** directory of the project running on port 80 on your local machine and add the following entry to your hosts file

```
127.0.0.1 localhost.panic
```
Once this apache setup is complete you can run the default gulp task to enable browsersync.  This will automatically refresh your browser and update the **/public** directory when changes are made to the files under **/source**

```
gulp default
```
Once the task is running your default browser will start automatically and open **http://localhost:3000**

## Deployment

Once installed and configured on your production server you can build the project by running the following command in the project's root directory

```
gulp buildProd
```

## Application Details
The Angular routes are defined in **/source/js/scripts.js**

## Login Info
The default login information for the application is

**Username:** adminuser@stgconsulting.com

**Password:** password

On your first login you will be prompted to change your password.
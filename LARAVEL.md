Laravel integration
================
Requirements
----------------
This tutorial assumes you have a working Laravel installation and using Homestead.

Installation
--------------

Add dependency inside bower.json
```json
"am2-admin": "git@bitbucket.org:am2studio/am2-admin.git#dev",
```
and then run
```
bower install
```
to install the package.

Next you need to have installed Ruby's package [http://compass-style.org](http://compass-style.org). If your project is [SaltStack enabled](http://saltstack.com), inside .salt/general/init.sls file add following line:
```
compass:
	gem.installed
```
and then run ```vagrant provision```

If not, follow http://compass-style.org/install/, essentialy:
```
$ vagrant ssh
gem install compass
```


Usage
-------
This theme will now be available in your bower folder (usually in resources/assets/bower) and has to be included in gulpfile.js. To do so you have to add following in gulpfile.js:
insert this after ```var elixir = require('laravel-elixir');```
```js
require('laravel-elixir-sass-compass');
```

```js
.compass(
        'style.scss', 'public/css', {
          sass: "resources/assets/bower/am2-admin/html/admin/assets/scss",
          sourcemap: true
        }
      )
.scripts([
        '../bower/am2-admin/html/admin/assets/js/functions.js',
      ], 'public/js/style.js')
.version([
        'css/style.css',
        'js/style.js',
      ])
.copy('resources/assets/bower/am2-admin/html/admin/assets/fonts', 'public/build/fonts')
.copy('resources/assets/bower/am2-admin/html/admin/assets/images','public/build/images')
```
Then after running ```gulp``` your file will be generated in public folder and will be available to be used in templates like so: 

```html
<link href="{{ elixir('css/all.css') }}" rel="stylesheet">
```

```html
<script src="{{ elixir('js/style.js') }}"></script>
```

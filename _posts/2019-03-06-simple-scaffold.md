---
layout: post
title:  "Simple Scaffold: Generating multiple files for faster coding"
date:   2019-03-06 15:43:40 +0200
excerpt_separator: <!--more-->
categories: projects, node, tools
---

As most prople who have been working a lot in front end development, I will acknowledge that
no matter what framework, library set or tools you work with, you end up replicating a lot of files,
especially with modern component-based frameworks, such as React, Angular and Vue.js.

They usually grow to be very different, but they almost alway start with the same some sort of base-skeleton,
which gets built upon later. A lot of pipeline code written, and time wasted.

<!--more-->

## What have we got?

There are some existing solutions to these problems, but they usually are not very flexible, or are tied
to one library or implementation. Let's take a look at a few examples.

- *IDE snippets*, such as VS Code's easy snippet extensions/configurations are very helpful.
Basically, you can either use configuration JSON files to add snippets to your code quickly, or use
extensions that simply fill these up for you.

  There are nice benefits to this, as you can start typing the 'prefix' of the snippet and hit <kbd>Tab</kbd>
quickly to add small snippets of code. You can also predefine stopping points, which you can navigate using
<kbd>Tab</kbd> after inserting the snippet, and insert arguments, method names, etc.

  These are nice, but only for small snippets. When you have to create an entire component, made by multiple
files, you're stuck with the option to create multiple files yourself, name them appropriately, and paste
different snippets on each file.

- *Some npm libraries* provide ways to scaffold files based on templates, but from what I've seen they are either
tied to specific task runners, libraries or frameworks, or they are simply quite difficult to set up and customize.


## Enter: Simple Scaffold

I was frustrated with this, and all I wanted was to have different sets of files I could generate, simply by
copying them at predefined directory structures, and fill them with some variable data.

For instance: I create a lot of React components at work. We have recently moved to a single-file component
structure for starting components; but we have different types of components that we want to generate based on
context, like different file contents for page containers versus general-use components.

Being fed up with my options, I made this small npm package, that does just this, in a very easy and quick way
to setup. Simply put your files wherever you want, and either use the CLI tool or the package as an import -
and you're good to go.

## Example: Jekyll Posts

Creating Jekyll posts is very simple! However I still had a little bit missing - I have to manually add the date
every time? Oh, man. What about the file identifier name, and title? My `excerpt_separator`?

So I just made the simplest script in Ruby (to fit in with the Jekyll theme) to run the Simple Scaffold CLI
with some custom parameters.

```ruby
#!/usr/bin/env ruby
require 'date'
SCAFFOLD_DIR = 'scaffold_templates'

name, *args = ARGV
short_date = Time.now.strftime('%Y-%m-%d')
full_date = Time.now.strftime('%Y-%m-%d %H:%M:%S %z')
snake_dash_name = name.split(/[^a-z0-9]/i).map(&:downcase).join('-')

`
npx simple-scaffold "#{name}" \
  --templates #{SCAFFOLD_DIR}/**/* \
  --output _posts/ \
  --create-sub-folder false \
  -locals "date=#{short_date}" \
  -locals "fullDate=#{full_date}" \
  -locals snakeDashName=#{snake_dash_name} \
`
puts 'Done'
```

Let's run by this real quick:

- *Lines 1-8* - setting up locals such as template directory base, and some variables to pass to the templates.
- *Lines 10-17* - We pass the parameters via a shell call (`\`` (backticks) in ruby), and immediately run using npx.

Locals are passed to [Handlebars][handlebars], and can be used both in file/directory names and file contents.

Now all I had to do is create a place for my templates, and add a template inside:

```
- scaffold_templates/
  -- {%raw%}{{date}}-{{snakeDashName}}.markdown{%endraw%}
```

And fill it up with some basic post:

```markdown
{% raw %}
---
layout: post
title:  "{{Name}}"
date:   {{fullDate}}
excerpt_separator: <!--more-->
categories:
---
{% endraw %}

```

And voila! Running the script, along with a name generates the structure for me:

```shell
./scaffold.rb "Billy Jean is not my lover"
```

Which gives us the following file:

```
- _posts/
  -- 2019-03-06-billy-jean-is-not-my-lover.markdown
```

```markdown
---
layout: post
title:  "Billy Jean is not my lover"
date:   2019-03-06 16:43:38 +0200
excerpt_separator: <!--more-->
categories:
---
```

Check out the documentation at [the project's NPM page][simple-scaffold]!

[handlebars]: https://handlebarsjs.com
[simple-scaffold]: https://npmjs.com/package/simple-scaffold

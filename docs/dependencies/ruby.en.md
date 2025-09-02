---
hide:
- footer
---

# Working with dependencies in Ruby

## Bundler

### Creating a `Gemfile.lock` file

1. Initialize the project:

	```sh
	bundle init
	```

2. Install dependencies:

	```sh
	bundle install
	```
	or create a lock-file directly:

	```sh
	bundle lock
	```
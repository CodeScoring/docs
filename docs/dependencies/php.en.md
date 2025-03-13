---
hide:
- footer
---
# Working with dependencies in PHP

## Composer

### Creating a `composer.lock` file

1. Initialize the project:

	```sh
	composer init
	```

2. Install dependencies:

	```sh
	composer install
	```
	or create a lock-file directly:
	```sh
	composer update
	```
---
hide:
- footer
---

# Working with dependencies in Go

## Go Modules

### Creating a `go.sum` file

1. Initialize the module:
	```sh
	go mod init <module_name>
	```

2. Install dependencies:
	```sh
	go get <package>
	```

3. After installing dependencies, `go.mod` and `go.sum` files are automatically created and updated.

4. Fixate dependency versions:
	```sh
	go mod tidy
	```
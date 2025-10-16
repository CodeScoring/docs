- [Русский](../../dependencies/go/)

# Working with dependencies in Go

## Go Modules

### Creating a `go.sum` file

1. Initialize the module:

   ```
   go mod init <module_name>
   ```

1. Install dependencies:

   ```
   go get <package>
   ```

1. After installing dependencies, `go.mod` and `go.sum` files are automatically created and updated.

1. Fixate dependency versions:

   ```
   go mod tidy
   ```

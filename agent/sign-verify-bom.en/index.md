- [Русский](https://docs.codescoring.ru/agent/sign-verify-bom/index.md)

# SBOM signing and verification

Signing and verification using RSA SHA256 digital signatures is supported to confirm the integrity and authenticity of SBOM files. This functionality is available starting with binary agent version **2025.29.0**.

Both commands can be used without setting parameters `--api_url` and `--api_token`.

**Important**: only RSA keys are supported, and they must be in PEM format.

## SBOM file signing

The `sign bom` command is used to create a digital signature for an SBOM file. It has the following parameters:

- `--private-key <path>` - path to the RSA private key in PEM format (**required**);
- `--include-public-key` - include the public key in the SBOM file (optional).

### Launch examples

```
# Signing a file with a private key
./johnny sign bom <bom_json> \
--api_token <api_token> \
--api_url <api_url> \
--private-key <private_key_pem>

# Signing a file with a public key included in SBOM
./johnny sign bom <bom_json> \
--api_token <api_token> \
--api_url <api_url> \
--private-key <private_key_pem> \
--include-public-key
```

## Verifying the signature of an SBOM file

The `verify bom` command is used to verify the signature of an SBOM file. It has the following parameters:

- `--public-key <path>` - path to the RSA public key in PEM format (optional). If this parameter is set and SBOM file contains public key, key from SBOM file will be used.

### Run examples

```
# Verification using a public key from a file
./johnny verify bom <bom_json> \
--api_token <api_token> \
--api_url <api_url> \
--public-key <public_key_pem>

# Verification using a key from an SBOM file
./johnny verify bom <bom_json> \
--api_token <api_token> \
--api_url <api_url>
```

## Results

The agent returns the following exit code:

- 0: successful run;
- 4: signature verification error.

# BOM Signing and Verification

To confirm integrity and authenticity, signing and verification of BOM files using RSA SHA256 digital signatures is supported.

## Commands

### sign bom - BOM File Signing

The `sign bom` command creates a digital signature for a BOM file.

#### Parameters

- `--private-key <path>` - path to RSA private key in PEM format (required)
- `--include-public-key` - include public key in BOM file (optional)

#### Usage Examples

```bash
# Sign file with private key
./johnny sign bom <bom_json> \
--api_token <api_token> \
--api_url <api_url> \
--private-key <private_key_pem>

# Sign file and include public key in the signature body
./johnny sign bom <bom_json> \
--api_token <api_token> \
--api_url <api_url> \
--private-key <private_key_pem> \
--include-public-key 
```

### verify bom - BOM File Signature Verification

The `verify bom` command verifies the digital signature of a BOM file.

#### Parameters

- `--public-key <path>` - path to RSA public key in PEM format (optional)

#### Usage Examples

```bash
# Verification using public key from file
./johnny verify bom <bom_json> \
--api_token <api_token> \
--api_url <api_url> \
--public-key <public_key_pem>

# Verification using key from BOM file
./johnny verify bom <bom_json> \
--api_token <api_token> \
--api_url <api_url>
```

## Exit Codes

- `0` - successful operation
- `4` - signature verification error

## Requirements

- Only RSA keys are supported
- Keys must be in PEM format
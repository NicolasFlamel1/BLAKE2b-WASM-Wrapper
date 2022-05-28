# BLAKE2b WASM Wrapper

### Description
WASM wrapper around parts of [the official BLAKE2b implementation](https://github.com/BLAKE2/BLAKE2).

### Building
Run the following commands to build this wrapper as WASM. The resulting files will be in the `dist` folder.
```
make dependencies
make wasm
```

Run the following commands to build this wrapper as asm.js. The resulting file will be in the `dist` folder.
```
make dependencies
make asmjs
```

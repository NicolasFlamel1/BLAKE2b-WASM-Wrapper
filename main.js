// Use strict
"use strict";


// Classes

// BLAKE2b class
class Blake2b {

	// Public
	
		// Initialize
		static initialize() {
		
			// Set instance to invalid
			Blake2b.instance = Blake2b.INVALID;
		
			// Return promise
			return new Promise(function(resolve, reject) {
		
				// Set settings
				var settings = {
				
					// On abort
					"onAbort": function(error) {
					
						// Prevent on abort from being called again
						delete settings["onAbort"];
						
						// Reject error
						reject("Failed to download resource");
					}
				};
				
				// Create BLAKE2b instance
				blake2b(settings).then(function(instance) {
				
					// Prevent on abort from being called
					delete settings["onAbort"];
				
					// Set instance
					Blake2b.instance = instance;
					
					// Resolve
					resolve();
				});
			});
		}
		
		// Compute
		static compute(resultSize, input, key) {
		
			// Check if instance doesn't exist
			if(typeof Blake2b.instance === "undefined")
			
				// Set instance
				Blake2b.instance = blake2b();
			
			// Check if instance is invalid
			if(Blake2b.instance === Blake2b.INVALID)
			
				// Return operation failed
				return Blake2b.OPERATION_FAILED;
			
			// Initialize result to result size
			var result = new Uint8Array(resultSize);
			
			// Allocate and fill memory
			var resultBuffer = Blake2b.instance._malloc(result["length"] * result["BYTES_PER_ELEMENT"]);
			
			var inputBuffer = Blake2b.instance._malloc(input["length"] * input["BYTES_PER_ELEMENT"]);
			Blake2b.instance["HEAPU8"].set(input, inputBuffer / input["BYTES_PER_ELEMENT"]);
			
			var keyBuffer = Blake2b.instance._malloc(key["length"] * key["BYTES_PER_ELEMENT"]);
			Blake2b.instance["HEAPU8"].set(key, keyBuffer / key["BYTES_PER_ELEMENT"]);
			
			// Check if computing BLAKE2b failed
			if(Blake2b.instance._compute(resultBuffer, result["length"] * result["BYTES_PER_ELEMENT"], inputBuffer, input["length"] * input["BYTES_PER_ELEMENT"], keyBuffer, key["length"] * key["BYTES_PER_ELEMENT"]) === Blake2b.C_FALSE) {
			
				// Clear memory
				Blake2b.instance["HEAPU8"].fill(0, resultBuffer / result["BYTES_PER_ELEMENT"], resultBuffer / result["BYTES_PER_ELEMENT"] + result["length"]);
				Blake2b.instance["HEAPU8"].fill(0, inputBuffer / input["BYTES_PER_ELEMENT"], inputBuffer / input["BYTES_PER_ELEMENT"] + input["length"]);
				Blake2b.instance["HEAPU8"].fill(0, keyBuffer / key["BYTES_PER_ELEMENT"], keyBuffer / key["BYTES_PER_ELEMENT"] + key["length"]);
				
				// Free memory
				Blake2b.instance._free(resultBuffer);
				Blake2b.instance._free(inputBuffer);
				Blake2b.instance._free(keyBuffer);
			
				// Return operation failed
				return Blake2b.OPERATION_FAILED;
			}
			
			// Get result
			result = new Uint8Array(Blake2b.instance["HEAPU8"].subarray(resultBuffer, resultBuffer + result["length"]));
			
			// Clear memory
			Blake2b.instance["HEAPU8"].fill(0, resultBuffer / result["BYTES_PER_ELEMENT"], resultBuffer / result["BYTES_PER_ELEMENT"] + result["length"]);
			Blake2b.instance["HEAPU8"].fill(0, inputBuffer / input["BYTES_PER_ELEMENT"], inputBuffer / input["BYTES_PER_ELEMENT"] + input["length"]);
			Blake2b.instance["HEAPU8"].fill(0, keyBuffer / key["BYTES_PER_ELEMENT"], keyBuffer / key["BYTES_PER_ELEMENT"] + key["length"]);
			
			// Free memory
			Blake2b.instance._free(resultBuffer);
			Blake2b.instance._free(inputBuffer);
			Blake2b.instance._free(keyBuffer);
			
			// Return result
			return result;
		}
		
		// Operation failed
		static get OPERATION_FAILED() {
		
			// Return operation failed
			return null;
		}
	
	// Private
	
		// Invalid
		static get INVALID() {
		
			// Return invalid
			return null;
		}
		
		// C false
		static get C_FALSE() {
		
			// Return C false
			return 0;
		}
}


// Supporting fuction implementation

// Check if document doesn't exist
if(typeof document === "undefined") {

	// Create document
	var document = {};
}

// Check if module exports exists
if(typeof module === "object" && module !== null && "exports" in module === true) {

	// Exports
	module["exports"] = Blake2b;
}

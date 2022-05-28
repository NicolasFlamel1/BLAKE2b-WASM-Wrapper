// Header files
#include <emscripten.h>
#include "blake2.h"

using namespace std;


// Function prototypes

// Compute
extern "C" bool EMSCRIPTEN_KEEPALIVE compute(uint8_t *result, size_t resultSize, const uint8_t *input, size_t inputSize, const uint8_t *key, size_t keySize);


// Supporting function implementation

// Compute
bool compute(uint8_t *result, size_t resultSize, const uint8_t *input, size_t inputSize, const uint8_t *key, size_t keySize) {

	// Check if computing BLAKE2b failed
	if(blake2b(result, resultSize, input, inputSize, key, keySize)) {
	
		// Return false
		return false;
	}
	
	// Return true
	return true;
}

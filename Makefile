# Library parameters
NAME = "BLAKE2b"
CC = "em++"
CFLAGS = -Wall -D NDEBUG -Oz -finput-charset=UTF-8 -fexec-charset=UTF-8 -funsigned-char -ffunction-sections -fdata-sections -I "./BLAKE2-master/ref/" -s MODULARIZE=1 --memory-init-file=0 -s ABORTING_MALLOC=0 -s ALLOW_MEMORY_GROWTH=1 --closure 1 -flto -fno-rtti -fno-exceptions -s NO_FILESYSTEM=1 -s DISABLE_EXCEPTION_CATCHING=1 -s EXPORTED_FUNCTIONS="['_malloc', '_free']" -s EXPORT_NAME="blake2b"
LIBS =
SRCS = "./main.cpp" "./BLAKE2-master/ref/blake2b-ref.c"
PROGRAM_NAME = $(subst $\",,$(NAME))

# Make WASM
wasm:
	rm -rf "./dist"
	mkdir "./dist"
	$(CC) $(CFLAGS) -s WASM=1 -s ENVIRONMENT=web -o "./dist/$(PROGRAM_NAME).js" $(SRCS) $(LIBS)
	cat "./main.js" >> "./dist/$(PROGRAM_NAME).js"

# Make asm.js
asmjs:
	rm -rf "./dist"
	mkdir "./dist"
	$(CC) $(CFLAGS) -s WASM=0 -s ENVIRONMENT=web -o "./dist/$(PROGRAM_NAME).js" $(SRCS) $(LIBS)
	cat "./main.js" >> "./dist/$(PROGRAM_NAME).js"

# Make clean
clean:
	rm -rf "./master.zip" "./BLAKE2-master" "./dist"

# Make dependencies
dependencies:
	wget "https://github.com/BLAKE2/BLAKE2/archive/master.zip"
	unzip "./master.zip"
	rm "./master.zip"

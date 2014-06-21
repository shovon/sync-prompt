#include <node.h>
#include <v8.h>
#include <iostream>
#include <string>

#ifndef WIN32
#include <unistd.h>
#endif

using namespace v8;
using namespace std;

// Here's an article: http://www.cplusplus.com/articles/E6vU7k9E/
// It explains how to replace entered characters with asterisks, in case anyone
// asks for such a feature be implemented.

void setStdinEcho(bool enable) {
  // I'm not taking any credit for this. The code came directly from
  // http://stackoverflow.com/a/1455007/538570

#ifdef WIN32
  HANDLE hStdin = GetStdHandle(STD_INPUT_HANDLE); 
  DWORD mode;
  GetConsoleMode(hStdin, &mode);

  if( !enable )
    mode &= ~ENABLE_ECHO_INPUT;
  else
    mode |= ENABLE_ECHO_INPUT;

  SetConsoleMode(hStdin, mode );
#else
  struct termios tty;
  tcgetattr(STDIN_FILENO, &tty);
  if( !enable )
    tty.c_lflag &= ~ECHO;
  else
    tty.c_lflag |= ECHO;

  (void) tcsetattr(STDIN_FILENO, TCSANOW, &tty);
#endif
}

#if NODE_MODULE_VERSION > 0x000B
string prompt(Isolate * isolate) {
#else
string prompt() {
#endif
  string retval;
  getline(cin, retval);
  return retval;
}

#if NODE_MODULE_VERSION > 0x000B
void SetStdinEcho(const FunctionCallbackInfo<Value>& args) {
  Isolate * isolate = Isolate::GetCurrent();
  HandleScope scope(isolate);
  Local<Value> undefined;

  setStdinEcho(args[0]->BooleanValue());
  args.GetReturnValue().Set(undefined);
}
#else
Handle<Value> SetStdinEcho(const Arguments& args) {
  HandleScope scope;
  Local<Value> undefined;

  setStdinEcho(args[0]->BooleanValue());
  return scope.Close(undefined);
}
#endif

#if NODE_MODULE_VERSION > 0x000B
void Prompt(const FunctionCallbackInfo<Value>& args) {
  Isolate * isolate = Isolate::GetCurrent();
  HandleScope scope(isolate);
  string retval = prompt(isolate);
  args.GetReturnValue().Set(String::NewFromUtf8(isolate, retval.c_str()));
}
#else
Handle<Value> Prompt(const Arguments& args) {
  HandleScope scope;
  string retval = prompt();
  return scope.Close(String::New(retval.c_str()));
}
#endif

#if NODE_MODULE_VERSION > 0x000B
void IsEOF(const FunctionCallbackInfo<Value>& args) {
  Isolate * isolate = Isolate::GetCurrent();
  HandleScope scope(isolate);
  string retval = prompt(isolate);
  args.GetReturnValue().Set(Boolean::New(isolate, cin.eof()));
}
#else
Handle<Value> IsEOF(const Arguments& args) {
  HandleScope scope;
  return scope.Close(Boolean::New(cin.eof()));
}
#endif

void init(Handle<Object> exports) {
#if NODE_MODULE_VERSION > 0x000B
  NODE_SET_METHOD(exports, "prompt", Prompt);
  NODE_SET_METHOD(exports, "setStdinEcho", SetStdinEcho);
  NODE_SET_METHOD(exports, "isEOF", IsEOF);
#else
  exports->Set(String::NewSymbol("prompt"),
    FunctionTemplate::New(Prompt)->GetFunction());
  exports->Set(String::NewSymbol("setStdinEcho"),
    FunctionTemplate::New(SetStdinEcho)->GetFunction());
  exports->Set(String::NewSymbol("isEOF"),
    FunctionTemplate::New(IsEOF)->GetFunction());
#endif
}

NODE_MODULE(sync_prompt, init)

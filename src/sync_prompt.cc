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

string prompt() {
  string retval;
  getline(cin, retval);
  return retval;
}

Handle<Value> HiddenPrompt(const Arguments& args) {
  HandleScope scope;
  setStdinEcho(false);
  string retval = prompt();
  setStdinEcho(true);
  return scope.Close(String::New(retval.c_str()));
}

Handle<Value> Prompt(const Arguments& args) {
  HandleScope scope;
  string retval = prompt();
  return scope.Close(String::New(retval.c_str()));
}

void init(Handle<Object> exports) {
  exports->Set(String::NewSymbol("prompt"),
    FunctionTemplate::New(Prompt)->GetFunction());
  exports->Set(String::NewSymbol("hiddenPrompt"),
    FunctionTemplate::New(HiddenPrompt)->GetFunction());
}

NODE_MODULE(sync_prompt, init)

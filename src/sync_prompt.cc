#include <node.h>
#include <v8.h>
#include <iostream>
#include <string>

using namespace v8;
using namespace std;

Handle<Value> Prompt(const Arguments& args) {
  HandleScope scope;
  string retval;
  cin >> retval;
  return scope.Close(String::New(retval.c_str()));
}

void init(Handle<Object> exports) {
  exports->Set(String::NewSymbol("prompt"),
      FunctionTemplate::New(Prompt)->GetFunction());
}

NODE_MODULE(sync_prompt, init)
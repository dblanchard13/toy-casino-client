
import angular from 'angular';
import mocks from 'angular-mocks';

// Below, context will be an function/object with file names as keys.
// using that regex we are saying look in client/app and find
// any file that ends with spec.js and get its path. By passing in true
// we say do this recursively
let context = require.context('./client/app', true, /\.spec\.js/);

// get all the files, for each file, call the context function
// that will require the file and load it up here. Context will
// loop and require those spec files here
context.keys().forEach(context);

function testFunction() {
  console.log('Hello World!');
  let unusedVar = 42;
  if (true) {
    return;
    return;
  }
  if ('1' == 1) {
    console.log('Loose equality');
  }
}

export { scrubAPIKey, looksLikeAKey };

function scrubAPIKey(key) {
  //remove all spaces
  let regEx = / /g;
  return key.replaceAll(regEx, "");
}

function looksLikeAKey(key) {
  return key.length > 20;
}

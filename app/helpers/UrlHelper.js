export default class UrlHelper {
  readParamsFromUrl = (url) => {
    var vars = [];
    var parts = url.replace(
      /[?&]+([^=&]+)=([^&]*)/gi,
      function (m, key, value) {
        vars[key] = value;
      }
    );
    return vars;
  };
  readParam = (url, paramName) => {
    const vars = this.readParamsFromUrl(url);
    return vars[paramName];
  };
}

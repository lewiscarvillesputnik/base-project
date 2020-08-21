module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
        targets: {
          browsers: 'Edge >= 15, Firefox >= 53, FirefoxAndroid  >= 53, Chrome >= 55, ChromeAndroid >= 55, Opera >= 42, OperaMobile >= 42, Safari >= 10.1, iOS >= 10.1',
        },
      }
    ]
  ]
};

// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  configAPIUrl: 'http://api2.droneez.com/config/read.php',
  articlesCreateUrl: 'http://api2.droneez.com/article/create/',
  articlesReadUrl:'http://api2.droneez.com/article/read/',
  articlesUpdateUrl: 'http://api2.droneez.com/article/update/',
  articlesInfosUrl: 'http://api2.droneez.com/article/infos/',
  articlesFilesUrl: "http://api2.droneez.com/00_articles_files",
  imageUploadURL: "http://api2.droneez.com/article/media/create/",
  imageManagerLoadURL: "http://api2.droneez.com/article/media/read/",
  imageManagerDeleteURL: "http://api2.droneez.com/article/media/delete/"
};

const fs = require('fs');
const yargs =  require('yargs');

const targetPath = './src/environments/environment.prod.ts';

const backend_uri = yargs.argv.backend_uri;
const disqus_shortname = yargs.argv.disqus_shortname;

const envConfigurations = `
export const environment = {
  production: true,
  BACKEND_URI:"${backend_uri}",
  DISQUS_SHORTNAME:"${disqus_shortname}"
};
`

fs.writeFile(targetPath, envConfigurations, function(err) {
	if(err) {
		console.log(err);
	}

	console.log('Output was generated');
});

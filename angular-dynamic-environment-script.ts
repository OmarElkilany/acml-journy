var fs =  require('fs');

const targetPath = './src/environments/environment.prod.ts';

const envConfigurations = `
export const environment = {
  production: true,
  BACKEND_URI:"${process.env.BACKEND_URI}",
  DISQUS_SHORTNAME:"${process.env.DISQUS_SHORTNAME}"
};
`

fs.writeFile(targetPath, envConfigurations, function(err) {
	if(err) {
		console.log(err);
	}

	console.log('Output was generated');
});

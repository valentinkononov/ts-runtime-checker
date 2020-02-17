function isTrue(value) {
    return !!value && value !== '0' && value !== 'false';
}

const envDisable = isTrue(process.env.CI);
const logLevel = process.env.npm_config_loglevel;
const logLevelDisplay = ['silent', 'error', 'warn'].indexOf(logLevel) > -1;

if (!envDisable && !logLevelDisplay) {
    const pkg = require(require('path').resolve('./package.json'));
    console.log(`\u001b[96m\u001b[1mThank you for using ${pkg.name}!\u001b[96m\u001b[1m`);
    console.log(`\u001b[0m\u001b[96mIf you tried this package, please consider giving usage feedback:\u001b[22m\u001b[39m`);
    console.log(`> \u001b[94m${pkg.issues}\u001b[0m\n`);
}

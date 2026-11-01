var path = require('path');

var settings = {
    webDir: "./dist",
    port: 7111,
    database: 'mongodb://localhost/bisbal26',
};

var baseDir = path.dirname(require.main.filename);

try {
    settings = Object.assign({}, settings, require(path.join(baseDir, "settings.json")));
}
catch (err) {
}

module.exports = Object.assign(settings, { baseDir });


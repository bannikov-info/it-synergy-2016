var debug = require('debug')('app-server:models');
module.exports = function (sequelize, DataType) {
    var Project = sequelize.define('Project',
        {
            name: {type: DataType.STRING, field: 'project_name', allowNull: false}
        },
        {
            classMethods: {
                associate: function (models) {
                    debug('associate Project...');
                    Project.hasMany(models.User, {as: 'Member'});
                    Project.hasMany(models.File, {as: 'Files'})
                }
            }
        }
    );

    return Project;
}

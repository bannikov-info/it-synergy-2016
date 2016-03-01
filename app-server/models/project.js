module.exports = function (sequelize, DataType) {
    var Project = sequelize.define('Project',
        {
            name: {type: DataType.STRING, field: 'project_name', allowNull: false}
        },
        {
            classMethods: {
                associate: function (models) {
                    Project.hasMany(models.User, {as: 'Members'});
                    Project.hasMany(models.File, {as: 'Files'})
                }
            }
        }
    );

    return Project;
}

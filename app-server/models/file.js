module.exports = function (sequelize, DataType) {
    var File = sequelize.define('File',
        {
            filename: {type: DataType.STRING, field: 'file_name', allowNull: false},
            path: {type: DataType.STRING, field: 'file_path', allowNull: false},
            mimetype: {type: DataType.STRING, field: 'mimetype', allowNull: false},
            encoding: {type: DataType.STRING, field: 'encoding'},
            size: {type: DataType.INTEGER, field: 'size', allowNull:false},
            uri: {type: DataType.STRING, field: 'uri', allowNull: true}
        }
    )

    return File;
}

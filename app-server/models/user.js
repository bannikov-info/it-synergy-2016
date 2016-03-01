// var Project = require('./index').Project;

module.exports = function (sequelize, DataType) {
    var User = sequelize.define('User',
        {
            ldap_id: {type: DataType.STRING, field: 'ldap_code', unique: true},
            firstName: {type: DataType.STRING, field: 'first_name', allowNull: false},
            lastName: {type: DataType.STRING, field: 'last_name'},
            roles:{type:DataType.INTEGER, field: 'roles', defaultValue: 2}
        },
        {
            getterMethods:{
                fullName: function () {
                    return [this.firstName, this.lastName].join(' ');
                }
            },

            setterMethods:{
                fullName: function (value) {
                    var names = value.split(' ');

                    this.setDataValue('firstName', null);
                    this.setDataValue('lastName', null);
                    if(names.length > 1){
                        this.setDataValue('firstName', names.slice(0, -1).join(' '));
                        this.setDataValue('lastName', names.slice(-1).join(''));
                    }else{
                        this.setDataValue('firstName', value);
                    }

                }
            },

            instanceMethods: {
                hasRole: function (role) {
                    // body...
                    role = getRoleCode(role);

                    return (this.roles & role) === role;
                },
                addRole: function (role) {
                    role = getRoleCode(role);

                    return this.roles |= role;
                },
                removeRole: function (role) {
                    role = getRoleCode(role);

                    return this.roles &= ~role;
                }
            }
        }
    );

    return User;

    function getRoleCode(role){
        var roles = {
            inactive: 1,
            user: 2,
            moderator: 4,
            admin: 8
        };

        if(typeof(role) === 'string'){ role = getRoleCode(role)};

        return roles[role];
    }

}

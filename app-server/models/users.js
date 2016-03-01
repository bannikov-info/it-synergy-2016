var users = {
    admin: {
        id: 0,
        username: "admin",
        roles: (1|2|4|8)
    },
    moderator: {
        id: 2,
        username: "moderator",
        roles: (1|2|4)
    },
    eugene: {
        id:3,
        username: "eugene",
        roles: (1|2)
    },
    public: {
        id: 1,
        username: "public",
        roles: 1
    }
};

var roles = {
    admin: (1|2|4|8),
    moderator: (1|2|4),
    user: (1|2),
    public: (1)
};

roles.prototype = {
    getRoleCode: function (roleName) {
        if (!(typeof roleName === 'string')){
            throw new ArgumentError('Expected string value');
        };
        if (this[roleName] === undefined){
            throw new Error('Required role not exist')
        }

        return this[roleName];
    }
};

function User(options) {
    // options.prototype = new User();

    options.prototype={
        hasRole: function(role){
            if(typeof role === 'string'){
                role = roles.getRoleCode(role);
            };

            return (this.roles & role) === role;
        }
    }
    return options;
};

users.User = User;

module.exports = users;

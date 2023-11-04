const {Schema, model} = require('mongoose');

const rolSchema = Schema ({
    rol:{
        type: String,
        required: [true, 'Rol obligatorio']
    }

});

module.exports = model('Role', rolSchema);
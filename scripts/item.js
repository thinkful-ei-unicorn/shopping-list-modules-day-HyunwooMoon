/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

const validateName = (name) => {
    if(!name){
        throw new TypeError('Name must not be blank');
    }
};

const create = (name) => {
    return {id: cuid(), 
                name : name,
                checked : false
                };
            };

export default {
    validateName, 
    create
};
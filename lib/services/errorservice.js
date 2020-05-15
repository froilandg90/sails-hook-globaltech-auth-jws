module.exports = function (code, options) {
    if (!options) { options = {}; }

    const errorsList = {
        /** *****************************  MODELS  *****************************************/
        20001: {
            error: 'E_SERVER_ERROR',
            code: code,
            summary: 'Internal server error.',
            description: `The model ${options.modelName} was not found.`,
            status: 500
        },

        /** *****************************  USER  *****************************************/
        21001: {
            error: 'E_NOT_FOUND',
            code: code,
            summary: 'Resource not found',
            description: `The email ${options.email} does not exist.`,
            status: 404
        },
        21002: {
            error: 'E_CONFLICT',
            code: code,
            summary: 'Conflicts',
            description: 'Wrong password.',
            status: 409
        },
    };
    const err = errorsList[code];
    return (err) ? err : {
        error: 'E_SERVER_ERROR',
        code: 10000,
        summary: 'Error code is not implemented yet',
        description: `The error code ${code} does not exist`,
        status: 501
    };
};


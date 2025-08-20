module.exports = (schema, property = 'body') => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req[property], { abortEarly: false });
        if (error) {
            return res.status(400).json({
                ok: false,
                message: error.details[0].message,
            });
        }
        req[property] = value;
        next();
    };
};
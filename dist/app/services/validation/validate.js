export function validate(schema, dataKey) {
    return (req, next) => {
        const data = dataKey ? req.body[dataKey] : req.body;
        next();
    };
}

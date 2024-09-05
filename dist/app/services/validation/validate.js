export function validate(schema, dataKey) {
    return (req, res, next) => {
        var _a, _b, _c;
        const data = (dataKey) ? req.body[dataKey] : req.body;
        const error = schema.validate(data);
        if (error && ((_a = error.error) === null || _a === void 0 ? void 0 : _a.details)) {
            for (const a of (_b = error.error) === null || _b === void 0 ? void 0 : _b.details) {
                switch ((_c = a.context) === null || _c === void 0 ? void 0 : _c.key) {
                    case 'password':
                        req.session.error = 'Le mot de passe doit contenir entre 8 et 12 caractères, avec au moins une majuscule.';
                        break;
                    case 'email':
                        req.session.error = `Le format de l'adresse email est incorrect, veuillez la ressaisir.`;
                        break;
                }
            }
        }
        next();
    };
}

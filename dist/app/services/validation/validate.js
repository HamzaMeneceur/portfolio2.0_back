export function validate(schema, dataKey) {
    return (req, res, next) => {
        var _a, _b, _c;
        const data = (dataKey) ? req.body[dataKey] : req.body;
        const error = schema.validate(data);
        if (error && ((_a = error.error) === null || _a === void 0 ? void 0 : _a.details)) {
            for (const a of (_b = error.error) === null || _b === void 0 ? void 0 : _b.details) {
                console.log(a);
                switch ((_c = a.context) === null || _c === void 0 ? void 0 : _c.key) {
                    case 'password':
                        console.log('Le mot de passe dois contenir entre 8-12 caractère et avoir au minimum une majuscule');
                        break;
                    case 'email':
                        console.log(`Le format de l'adresse email n'est pas reconnu veuillez la resaisir`);
                }
            }
        }
        next();
    };
}

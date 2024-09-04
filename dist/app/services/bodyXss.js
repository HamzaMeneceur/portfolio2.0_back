import xss from "xss";
export default function bodyProtect(req, res, next) {
    if (req.body) {
        for (let property in req.body) {
            req.body[property] = xss(req.body[property]);
        }
    }
    next();
}

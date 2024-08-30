import APIError from "../services/error/APIError.js";
import adminDataMapper from "../dataMappers/adminDataMapper.js";
export async function verifyUser(req, res, next) {
    let error;
    const email = req.body;
    const result = await adminDataMapper.ifUser(email);
    console.log('controller', result);
    if (result) {
        error = new APIError("L'email que vous avez entré est déjà utilisé.", 409);
        delete req.session.error;
        req.session.error = error.message;
        console.log("Dans le service => ", req.session.error);
        res.status(409).redirect("/v1/admin/s/signup");
    }
    else {
        next();
    }
}

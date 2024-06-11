import adminDataMapper from "../dataMappers/adminDataMapper.js";
export default {
    async haveUser(req, res, next) {
        try {
            const result = await adminDataMapper.getUser();
            res.status(200).json(result);
        }
        catch (err) {
            console.log(err);
        }
    }
};

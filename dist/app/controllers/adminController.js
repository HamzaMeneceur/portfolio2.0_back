import adminDataMapper from "../dataMappers/adminDataMapper.js";
export default {
    async haveUser(req, res, next) {
        try {
            console.log('3');
            const result = await adminDataMapper.getUser();
            res.json(result);
        }
        catch (err) {
            console.log(err);
        }
    }
};

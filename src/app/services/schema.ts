import Joi from "joi";
const emailRegExp = new RegExp('^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$');
const passwordRegExp = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$');
const schema = Joi.object({
    email: Joi.string().email().pattern(emailRegExp).required(),
    password: Joi.string().pattern(passwordRegExp).required()
})
// interface user
interface user {
    email: string,
    password: string
}
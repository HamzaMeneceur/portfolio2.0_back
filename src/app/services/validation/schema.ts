import Joi from "joi";
import type {user,project,social_network} from './schema.d'
const passwordRegExp = new RegExp(/^[a-zA-Z0-9!?*_%]{8,12}$/);
const validLinkRegExp = new RegExp('(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})');

const adminSchema = Joi.object<user>({
    email: Joi.string().email().required(),
    password: Joi.string().pattern(passwordRegExp).required(),
    updated_at: Joi.date().optional()
});
const socialSchema = Joi.object<social_network>({
    label: Joi.string().max(50).required(),
    link: Joi.string().pattern(validLinkRegExp).required(),
    user_email: Joi.string().email().pattern(passwordRegExp).optional(),
    updated_at: Joi.date().optional()
});
const projectSchema = Joi.object<project>({
    name: Joi.string().max(50).required(),
    link: Joi.string().pattern(validLinkRegExp).required(),
    user_email: Joi.string().email().pattern(passwordRegExp).optional(),
    type_of_project: Joi.string().valid('Solo','Professionnelle','Académique').required(),
    project_date: Joi.date().optional(),
    updated_at: Joi.date().optional()
});

export {
    adminSchema,
    socialSchema,
    projectSchema
}
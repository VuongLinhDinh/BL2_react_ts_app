import Joi from "joi";

export const registerSchema = Joi.object({
	email: Joi.string().email().required().messages({
		"string.empty": "Email không được để trống!",
		"string.email": "Email không đúng định dạng!",
	}),
	password: Joi.string().required().min(6).max(255).messages({
		"string.empty": "Password không được để trống!",
		"string.min": "Password phải có ít nhất 6 ký tự!",
		"string.max": "Password không được quá 255 ký tự!",
	}),
});

export const loginSchema = Joi.object({
	email: Joi.string().email().required().messages({
		"string.empty": "Email không được để trống!",
		"string.email": "Email không đúng định dạng!",
	}),
	password: Joi.string().required().min(6).max(255).messages({
		"string.empty": "Password không được để trống!",
		"string.min": "Password phải có ít nhất 6 ký tự!",
		"string.max": "Password không được quá 255 ký tự!",
	}),
});

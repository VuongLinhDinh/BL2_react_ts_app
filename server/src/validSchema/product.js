import Joi from "joi";

export const productSchema = Joi.object({
	title: Joi.string().required().min(6).max(255).messages({
		"string.base": "Name phải là một chuỗi!",
		"string.empty": "Name không được để trống!",
		"string.min": "Name phải có ít nhất 6 ký tự!",
		"string.max": "Name không được quá 255 ký tự!",
	}),
	price: Joi.number().required().min(0).messages({
		"number.base": "Price phải là một số!",
		"number.empty": "Price không được để trống!",
		"number.min": "Price phải lớn hơn 0!",
	}),
	description: Joi.string().messages({
		"string.base": "Desc phải là một chuỗi!",
		"string.empty": "Desc không được để trống!",
	}),
	category: Joi.string().messages({
		"string.base": "Category phải là một chuỗi!",
	}),
	thumbnail: Joi.string().messages({
		"string.base": "Thumbnail phải là một chuỗi!",
	}),
});

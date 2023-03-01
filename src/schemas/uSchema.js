
import joi from "joi";

export const uSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().required(),
  confirmpassword: joi.string().valid(joi.ref('password')).required()
});


export const lSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required()
});

import Joi from 'joi';

const examValidation = Joi.object({
  year: Joi.string().min(4).required(),
  semester: Joi.string().required(),
  link: Joi.string().uri().required(),
  categoryId: Joi.number().required(),
  subjectId: Joi.number().required(),
  teacherId: Joi.number().required(),
});

export default examValidation;
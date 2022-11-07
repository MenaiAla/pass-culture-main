import * as yup from 'yup'

export const validationSchema = {
  name: yup.string().max(90).required('Veuillez renseigner un titre'),
  description: yup.string().max(1000),
  author: yup.string(),
  isbn: yup.string(),
  performer: yup.string(),
  speaker: yup.string(),
  stageDirector: yup.string(),
  visa: yup.string(),
  durationMinutes: yup.string().when('subCategoryFields', {
    is: (subCategoryFields: string[]) =>
      subCategoryFields.includes('durationMinutes'),

    then: yup.string().nullable(),
  }),
}

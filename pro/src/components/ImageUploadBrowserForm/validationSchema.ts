import * as yup from 'yup'

import { getImageBitmap } from 'utils/image'

export interface IGetValidationSchemaArgs {
  types?: string[]
  minWidth?: number
  maxSize?: number
}

const getValidationSchema = ({
  maxSize,
  minWidth,
  types,
}: IGetValidationSchemaArgs) => {
  const validationSchema: {
    size?: yup.AnySchema
    format?: yup.AnySchema
    width?: yup.AnySchema
  } = {}

  /* istanbul ignore next: DEBT, TO FIX */
  if (maxSize) {
    const displayedMaxSize = maxSize / 1000000
    validationSchema.size = yup.mixed().test({
      message: `Poids maximal du fichier : ${displayedMaxSize} Mo`,
      test: (_size, context: yup.TestContext) => {
        return context.parent.image.size < maxSize
      },
    })
  }

  /* istanbul ignore next: DEBT, TO FIX */
  if (types) {
    const displayedFileTypes = types
      .map((fileType: string) => fileType.split('/')[1].toUpperCase())
      .join(', ')
    validationSchema.format = yup.mixed().test({
      message: `Formats supportés: ${displayedFileTypes}`,
      test: (_type, context: yup.TestContext) => {
        const isValid = types.includes(context.parent.image.type)
        return isValid
      },
    })
  }

  /* istanbul ignore next: DEBT, TO FIX */
  if (minWidth) {
    validationSchema.width = yup.mixed().test({
      message: `Largeur minimale de l’image : ${minWidth} px`,
      test: async (_width, context: yup.TestContext) => {
        const imageBitmap = await getImageBitmap(context.parent.image)
        return imageBitmap !== null && imageBitmap.width >= minWidth
      },
    })
  }
  return yup.object().shape(validationSchema)
}

export default getValidationSchema
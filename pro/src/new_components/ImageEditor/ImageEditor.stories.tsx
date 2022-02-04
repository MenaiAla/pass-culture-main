import { Story } from '@storybook/react'
import React from 'react'

import ImageEditor, { ImageEditorProps } from './ImageEditor'
import sampleImage from './sample-image.jpg'

export default {
  title: 'components/ImageEditor',
  component: ImageEditor,
}

const Template: Story<ImageEditorProps> = props => (
  <ImageEditor {...props} ref={null} />
)

export const Default = Template.bind({})
Default.args = {
  canvasHeight: 300,
  canvasWidth: 400,
  cropBorderColor: '#FFF',
  cropBorderHeight: 30,
  cropBorderWidth: 40,
  image: sampleImage,
}

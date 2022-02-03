import React, { FunctionComponent } from 'react'

import { ImagePreview } from 'new_components/ImagePreview/ImagePreview'
import { ImagePreviewMode } from 'new_components/ImagePreview/types'

import style from './VenueImagePreview.module.scss'

interface Props {
  preview: string
}

export const VenueImagePreview: FunctionComponent<Props> = ({ preview }) => (
  <div className={style['container']}>
    <header>
      <h1 className={style['header']}>Image du lieu</h1>
    </header>
    <div className={style['subtitle']}>
      Prévisualisation de votre image dans l’application pass Culture
    </div>
    <ImagePreview mode={ImagePreviewMode.VENUE} preview={preview} />
    <div className={style['actions']}>
      <button
        className="secondary-button"
        onClick={() => alert('Pas encore dispo : il faut attendre PC-13201')}
        title="Retour"
        type="button"
      >
        Retour
      </button>
      <button
        className="primary-button"
        onClick={() => alert('Pas encore dispo : il faut attendre PC-13201')}
        title="Suivant"
        type="button"
      >
        Valider
      </button>
    </div>
  </div>
)

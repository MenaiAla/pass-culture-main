import PropTypes from 'prop-types'
import React, { useCallback, useEffect, useState } from 'react'

import { DialogBox } from 'components/layout/DialogBox/DialogBox'
import { IMPORT_TAB_ID } from 'components/pages/Offer/Offer/Thumbnail/_constants'
import Advices from 'components/pages/Offer/Offer/Thumbnail/Advices/Advices'
import Credit from 'components/pages/Offer/Offer/Thumbnail/Credit/Credit'
import ImageEditor from 'components/pages/Offer/Offer/Thumbnail/ImageEditor/ImageEditor'
import ImportFromComputer from 'components/pages/Offer/Offer/Thumbnail/ImportFromComputer/ImportFromComputer'
import ImportFromURL from 'components/pages/Offer/Offer/Thumbnail/ImportFromURL/ImportFromURL'
import ImportTab from 'components/pages/Offer/Offer/Thumbnail/ImportTab/ImportTab'
import Preview from 'components/pages/Offer/Offer/Thumbnail/Preview/Preview'

const ThumbnailDialog = ({ setIsModalOpened }) => {
  const DIALOG_LABEL_ID = 'label_for_aria'

  const [activeTab, setActiveTab] = useState(IMPORT_TAB_ID)
  const [credit, setCredit] = useState('')
  const [editedThumbnail, setEditedThumbnail] = useState('')
  const [hidden, setHidden] = useState(true)
  const [step, setStep] = useState(1)
  const [tabId, setTabId] = useState(IMPORT_TAB_ID)
  const [thumbnail, setThumbnail] = useState({})
  const [url, setURL] = useState('')

  useEffect(() => {
    setHidden(true)
  }, [activeTab])

  const closeModal = useCallback(() => {
    setIsModalOpened(false)
  }, [setIsModalOpened])

  const changeTab = useCallback(
    tabId => () => {
      setTabId(tabId)
      setActiveTab(tabId)
    },
    []
  )

  return (
    <DialogBox
      extraClassNames={step === 1 ? 'thumbnail-dialog tnd-step1' : 'thumbnail-dialog'}
      hasCloseButton
      labelledBy={DIALOG_LABEL_ID}
      onDismiss={closeModal}
    >
      <header>
        <h1
          className="tnd-header"
          id={DIALOG_LABEL_ID}
        >
          {'Ajouter une image'}
        </h1>
      </header>
      <>
        {step === 1 && (
          <>
            <ImportTab
              activeTab={activeTab}
              changeTab={changeTab}
              setHidden={setHidden}
            />
            {tabId === IMPORT_TAB_ID ? (
              <ImportFromComputer
                setStep={setStep}
                setThumbnail={setThumbnail}
              />
            ) : (
              <ImportFromURL
                setStep={setStep}
                setURL={setURL}
              />
            )}
            <hr className="tnd-hr" />
            <Advices
              hidden={hidden}
              setHidden={setHidden}
            />
          </>
        )}
        {step === 2 && (
          <Credit
            credit={credit}
            setCredit={setCredit}
            setStep={setStep}
          />
        )}
        {step === 3 && (
          <ImageEditor
            setEditedThumbnail={setEditedThumbnail}
            setStep={setStep}
            thumbnail={thumbnail}
            url={url}
          />
        )}
        {step === 4 && (
          <Preview
            preview={editedThumbnail}
            setStep={setStep}
          />
        )}
      </>
    </DialogBox>
  )
}

ThumbnailDialog.propTypes = {
  setIsModalOpened: PropTypes.func.isRequired,
}

export default ThumbnailDialog

import { useField, useFormikContext } from 'formik'
import React, { useState } from 'react'

import { CircleArrowIcon } from 'icons'
import { Button } from 'ui-kit/Button'
import { ButtonVariant, IconPositionEnum } from 'ui-kit/Button/types'
import { TextInput } from 'ui-kit/form/index'

import styles from './EmailSpellCheckInput.module.scss'

export interface IEmailSpellCheckInputProps {
  name: string
  placeholder: string
  label: string
  overrideInitialTip?: string | null
}

const EmailSpellCheckInput = ({
  name,
  placeholder,
  label,
  overrideInitialTip = null,
}: IEmailSpellCheckInputProps): JSX.Element => {
  const { setFieldValue } = useFormikContext<any>()
  const [field] = useField<string | string[]>(name)
  const [emailValidationTip, setEmailValidationTip] = useState<string | null>(
    overrideInitialTip
  )

  const handleEmailValidation = () => {
    if (field.value.length > 0) {
      // This will be impremented later
      setEmailValidationTip('marie.dupont@gmail.com')
    }
  }
  const resetEmailValidation = () => {
    setEmailValidationTip(null)
  }

  const applyTip = () => {
    setFieldValue(name, emailValidationTip, true)
    setEmailValidationTip(null)
  }

  return (
    <>
      <TextInput
        label={label}
        name={name}
        placeholder={placeholder}
        onBlur={handleEmailValidation}
        onFocus={resetEmailValidation}
        hideFooter={emailValidationTip != null} // This is needed to hide the footer div that takes some space
      />
      {emailValidationTip && (
        <div className={styles['email-validation-error']}>
          <div className={styles['email-validation-tip']}>
            Voulez-vous plutôt dire {emailValidationTip} ?
          </div>
          <Button
            variant={ButtonVariant.TERNARY}
            Icon={CircleArrowIcon}
            iconPosition={IconPositionEnum.LEFT}
            onClick={applyTip}
          >
            Appliquer la modification
          </Button>
        </div>
      )}
    </>
  )
}

export default EmailSpellCheckInput

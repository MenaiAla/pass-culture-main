import { useField } from 'formik'
import { parsePhoneNumberFromString } from 'libphonenumber-js'
import type { CountryCode } from 'libphonenumber-js'
import React, { ChangeEvent, FocusEvent, useEffect, useState } from 'react'

import { BaseInput, FieldLayout } from '../shared'

import CodeCountrySelect from './CodeCountrySelect/CountryCodeSelect'
import { PHONE_CODE_COUNTRY_CODE_OPTIONS, PLACEHOLDER_MAP } from './constants'
import styles from './PhoneNumberInput.module.scss'
import { getPhoneNumberInputAndCountryCode } from './utils/getPhoneNumberInputAndCountryCode'

export interface PhoneNumberInputProps {
  name: string
  disabled?: boolean
  isOptional?: boolean
}

const PhoneNumberInput = ({
  name,
  disabled,
  isOptional = false,
}: PhoneNumberInputProps) => {
  const [field, meta, helpers] = useField({ name })

  const [countryCode, setCountryCode] = useState<CountryCode>(
    PHONE_CODE_COUNTRY_CODE_OPTIONS[0].value
  )
  const [phoneInutValue, setPhoneInputValue] = useState<string>()

  const validatePhoneNumber = (
    phoneNumberInputValue: string
  ): string | undefined => {
    const phoneNumber = parsePhoneNumberFromString(
      phoneNumberInputValue,
      countryCode
    )

    // save formatted phone number i.e +33639980101 even if user types 0639980101 or 639980101
    helpers.setValue(phoneNumber?.number, false)
    setPhoneInputValue(phoneNumberInputValue)

    if (!phoneNumber || !phoneNumber.isValid()) {
      helpers.setError('Veuillez entrer un numéro de téléphone valide')
      return phoneNumberInputValue
    }

    helpers.setError(undefined)
    return phoneNumber?.nationalNumber
  }

  const onPhoneNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
    const phoneNumberInputValue = event.target.value
    validatePhoneNumber(phoneNumberInputValue)
  }

  const onPhoneCodeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setCountryCode(e.target.value as CountryCode)
    if (phoneInutValue) {
      validatePhoneNumber(phoneInutValue)
    }
  }

  const onPhoneNumberBlur = (event: FocusEvent<HTMLInputElement>) => {
    if (!meta.touched) {
      helpers.setTouched(true, false)
    }

    const phoneNumberInputValue = validatePhoneNumber(event.target.value)
    setPhoneInputValue(phoneNumberInputValue)
  }

  useEffect(() => {
    const { inputValue, countryCode: computedCountryCode } =
      getPhoneNumberInputAndCountryCode(field.value)
    setCountryCode(computedCountryCode)
    setPhoneInputValue(inputValue)
  }, [])

  return (
    <FieldLayout
      label="Téléphone"
      name={name}
      isOptional={isOptional}
      showError={meta.touched && !!meta.error}
      error={meta.error}
    >
      <div className={styles['phone-number-input-wrapper']}>
        <CodeCountrySelect
          disabled={Boolean(disabled)}
          options={PHONE_CODE_COUNTRY_CODE_OPTIONS}
          className={styles['country-code-select']}
          value={countryCode}
          onChange={onPhoneCodeChange}
        />

        <BaseInput
          disabled={disabled}
          hasError={meta.touched && !!meta.error}
          placeholder={PLACEHOLDER_MAP[countryCode]}
          type="text"
          name={name}
          value={phoneInutValue}
          onChange={onPhoneNumberChange}
          className={styles['phone-number-input']}
          onBlur={onPhoneNumberBlur}
        />
      </div>
    </FieldLayout>
  )
}

export default PhoneNumberInput
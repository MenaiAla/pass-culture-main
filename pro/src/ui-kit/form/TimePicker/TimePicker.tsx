import fr from 'date-fns/locale/fr'
import { useField } from 'formik'
import React, { createRef } from 'react'
import ReactDatePicker, { registerLocale } from 'react-datepicker'

import { FORMAT_HH_mm } from 'utils/date'

import { BaseInput, FieldLayout } from '../shared'

registerLocale('fr', fr)

interface ITimePickerProps {
  name: string
  className?: string
  disabled?: boolean
  label: string
  dateTime?: Date
  smallLabel?: boolean
  classNameFooter?: string
  isOptional?: boolean
}

const TimePicker = ({
  name,
  className,
  classNameFooter,
  disabled,
  label,
  smallLabel,
  isOptional = false,
}: ITimePickerProps): JSX.Element => {
  const [field, meta, helpers] = useField({ name, type: 'text' })
  const ref = createRef<HTMLInputElement>()

  /* istanbul ignore next: DEBT, TO FIX */
  return (
    <FieldLayout
      className={className}
      error={meta.error}
      label={label}
      name={name}
      isOptional={isOptional}
      showError={meta.touched && !!meta.error}
      smallLabel={smallLabel}
      classNameFooter={classNameFooter}
    >
      <ReactDatePicker
        {...field}
        customInput={
          <BaseInput hasError={meta.touched && !!meta.error} ref={ref} />
        }
        dateFormat={FORMAT_HH_mm}
        disabled={disabled}
        dropdownMode="scroll"
        locale="fr"
        onChange={time => {
          /* istanbul ignore next: DEBT, TO FIX */
          helpers.setTouched(true)
          /* istanbul ignore next: DEBT, TO FIX */
          helpers.setValue(time)
        }}
        placeholderText="HH:MM"
        selected={field.value}
        showTimeSelect
        showTimeSelectOnly
        timeCaption="Horaire"
        timeFormat={FORMAT_HH_mm}
        timeIntervals={15}
      />
    </FieldLayout>
  )
}

export default TimePicker

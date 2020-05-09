import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import PatchEvent, { set, unset } from 'part:@sanity/form-builder/patch-event'
import FormField from 'part:@sanity/components/formfields/default'

import styles from '../styles/cooking-time.css'

// Helper functions 
const parseTimeString = str => ({ hours: Number(str.split(':')[0]) || undefined, mins: Number(str.split(':')[1]) || undefined }) // Change time string to object
const setTimeString = ({ hours, mins }) => `${Number(hours) || 0}:${Number(mins) || 0}` // Change time object to string
const createPatchFrom = str => PatchEvent.from(str === '0:0' ? unset() : set(str)) // Update value in Sanity

/**
 * TimeInput component
 */
const TimeInput = ({ max, value, handleChange, title }) => (
    <div className={styles.cookingTime}>
        <input
            className={styles.cookingTimeInput}
            type="number"
            placeholder="0"
            min="0"
            max={max}
            value={value}
            onFocus={e => e.target.select()}
            onChange={handleChange}
        />
        <p>{title}</p>
    </div>
)

/**
 * CookingTime component
 */
const CookingTime = forwardRef(({ type: { title, description }, value, onChange }, ref) => {
    // Destructure value
    const currentValue = value !== undefined ? parseTimeString(value) : { hours: undefined, mins: undefined }
    const { hours, mins } = currentValue

    // Set new number
    const updateNumber = (number, maxNumber, numberToSet) => {
        const newTimeString = setTimeString({ ...currentValue, [numberToSet]: Math.min(number, maxNumber) })
        onChange(createPatchFrom(newTimeString))
    }

    const focus = a => console.log('focussed')

    return (
        <FormField label={title} description={description}>
            <TimeInput max={23} value={hours} handleChange={e => updateNumber(e.target.value, e.target.max, 'hours')} title="Hour(s)" />
            <TimeInput max={59} value={mins} handleChange={e => updateNumber(e.target.value, e.target.max, 'mins')} title="Min(s)" />
        </FormField>
    )
})

/**
 * PropTypes
 */
CookingTime.propTypes = {
    type: PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string
    }).isRequired,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired
}

export default CookingTime
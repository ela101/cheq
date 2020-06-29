export const FORM_VALIDATION_ERR = {
    VAST_URL_REQUIRED: 'vast url is required',
    VALID_URL: 'must be a valid url',
    WIDTH_RANGE: 'value should be between 100 and 1000',
    HEIGHT_RANGE: 'value should be between 100 and 1000',
    ONE_OPTIONAL_VALUE_IS_REQUIRED: 'please provide width or height or position',
    INTEGER_VALUE: 'please provide a valid integer'
}

export const FORM_POSITION_OPTIONS = [
    { key: 'tl', text: 'Top Left', value: 'top_left' },
    { key: 'tm', text: 'Top Middle', value: 'top_middle' },
    { key: 'tr', text: 'Top Right', value: 'top_right' },
    { key: 'ml', text: 'Middle Left', value: 'middle_left' },
    { key: 'mr', text: 'Middle Right', value: 'middle_right' },
    { key: 'bm', text: 'Bottom Middle', value: 'bottom_middle' },
    { key: 'br', text: 'Bottom Right', value: 'bottom_right' },
];


import validUrl from 'valid-url';
import { FORM_VALIDATION_ERR } from './constants';

export const validateFormValues = (data) => {
    const errors = {};
    if (!data.vastUrl) errors.vastUrl = FORM_VALIDATION_ERR.VAST_URL_REQUIRED;
    if (!validUrl.isUri(data.vastUrl)) errors.vastUrlValid = FORM_VALIDATION_ERR.VALID_URL;
    if (data.width && (data.width < 100 || data.width > 1000 || isNaN(data.width))) errors.width = FORM_VALIDATION_ERR.WIDTH_RANGE;
    if (data.height && (data.height < 100 || data.height > 1000 || isNaN(data.height))) errors.height = FORM_VALIDATION_ERR.HEIGHT_RANGE;
    if ((!data.width) && (!data.height) && (!data.position)) errors.optionalValueRequired = FORM_VALIDATION_ERR.ONE_OPTIONAL_VALUE_IS_REQUIRED;
    console.log(isNaN(data.width))
    return errors;
};

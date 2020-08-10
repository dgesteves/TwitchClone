import React from 'react';
import {Field, reduxForm} from "redux-form";

function StreamForm({handleSubmit, onSubmit}) {

    const onFormSubmit = (formValues) => {
        onSubmit(formValues)
    }

    const renderInput = ({input, label, meta}) => (
        <div className={`field ${meta.error && meta.touched ? 'error' : ''}`}>
            <label>{label}</label>
            <input type="text" {...input}/>
            {renderError(meta)}
        </div>
    )

    const renderError = ({error, touched}) => (
        touched && error && <div className='ui error message'>
            <div className='header'>
                {error}
            </div>
        </div>
    )

    return (
        <form className='ui form error' onSubmit={handleSubmit(onFormSubmit)}>
            <Field
                name='title'
                component={renderInput}
                label='Enter Title'
            />
            <Field
                name='description'
                component={renderInput}
                label='Enter Description'
            />
            <button className='ui button primary'>Submit</button>
        </form>
    );
}

const validate = (formValues) => {
    const errors = {}

    if (!formValues.title) {
        errors.title = 'You must enter a title'
    }
    if (!formValues.description) {
        errors.description = 'You must enter a description'
    }
    return errors
}

export default reduxForm({
    form: 'streamForm',
    validate
})(StreamForm);
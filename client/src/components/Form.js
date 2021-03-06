import React from 'react';

const Form = (props) => {
    const { elements, cancel, submit, errors, buttonText } = props;

    function handleSubmit(event) {
        event.preventDefault();
        submit()
    }

    function handleCancel(event) {
        event.preventDefault();
        cancel()
    }

    return(
        <div className="form">
            <ErrorsDisplay errors={errors} />
            <form onSubmit={handleSubmit}>
                {elements()}
                <div className="grid-100 pad-bottom">
                    <button className="button" type="submit" onClick={handleSubmit}> {buttonText} </button>
                    <button className="button button-secondary" onClick = { handleCancel } > Cancel </button>
                </div>
            </form>
        </div>
    )
}

const ErrorsDisplay = ({ errors }) => {
    let errorsDisplay = null;

    if (errors.length) {
        errorsDisplay = (
            <div>
                <h2 className="validation--errors--label">Validation errors</h2>
                <div className="validation-errors">
                    <ul>
                        {errors.map((error, i) => <li key={i}>{error}</li>)}
                    </ul>
                </div>
            </div>
        )
    }
    return errorsDisplay
}

export default Form;
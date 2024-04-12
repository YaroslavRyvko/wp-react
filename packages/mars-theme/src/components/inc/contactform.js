import { useState } from 'react';

const ContactForm = ({ isLoading, isSent, hasError, handler }) => {
  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    company: '',
    city: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleFieldChange = (field, e) => {
    setFormState({
      ...formState,
      [field]: e.target.value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handler(e, formState);
  };

  return (
    <form
      onSubmit={handleFormSubmit}
    >
      {['first-name', 'last-name', 'company', 'city', 'email', 'phone'].map(field => (
        <div className="contact-page__form-row" key={field}>
          <div className="contact-page__form-field">
            <span className="wpcf7-form-control-wrap" data-name={field}>
              <input
                size="40"
                className={`wpcf7-form-control wpcf7-text ${field === 'email' ? 'wpcf7-email' : ''} ${field === 'phone' ? 'wpcf7-tel' : ''} wpcf7-validates-as-required`}
                aria-required="true"
                aria-invalid="false"
                value={formState[field]}
                onChange={(e) => handleFieldChange(field, e)}
                type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'}
                name={field}
              />
            </span>
            <label className="contact-page__form-field-label">
              {field.charAt(0).toUpperCase() + field.slice(1).replace('-', ' ')}*
            </label>
          </div>
        </div>
      ))}
      <div className="contact-page__form-row">
        <div className="contact-page__form-field textarea">
          <span className="wpcf7-form-control-wrap" data-name="message">
            <textarea
              cols="40"
              rows="10"
              className="wpcf7-form-control wpcf7-textarea"
              aria-invalid="false"
              name="message"
              onChange={(e) => handleFieldChange('message', e)}
            />
          </span>
          <label className="contact-page__form-field-label">Message</label>
        </div>
      </div>
      <div className="contact-page__form-row">
        <div className="contact-page__form-field">
          <input
            className="wpcf7-form-control has-spinner wpcf7-submit black-cta-l"
            type="submit"
            value="Submit"
          />
        </div>
      </div>
      <div className='form-response'> {isSent ? "Form submitted Sucessfully" : hasError}</div>
    </form>
  );
};

export default ContactForm;

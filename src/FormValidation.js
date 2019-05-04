import React, { useState, useReducer } from 'react';

const CONTROL_NAMES = {
  EMAIL: 'email',
  PWD: 'password',
};

const INIT_ERR_STATE = {
  [CONTROL_NAMES.EMAIL]: '',
  [CONTROL_NAMES.PWD]: '',
};

const useSetState = initialState => {
  return useReducer((state, newState) => ({ ...state, ...newState }), initialState);
};

const FormValidation = () => {
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const formRef = React.createRef();

  const [errMsg, setErrMsg] = useSetState(INIT_ERR_STATE);

  const handleSubmit = e => {
    e.preventDefault();

    if (validate()) {
      alert('form submitted');
      setEmail('');
      setPwd('');
      setErrMsg(INIT_ERR_STATE);
    }
  };

  const validate = () => {
    const form = formRef.current;

    if (form.checkValidity()) {
      return true;
    } else {
      const form = formRef.current;

      for (let i = 0; i < form.elements.length; i++) {
        const element = form.elements[i];

        if (element.tagName !== 'button' && element.willValidate && !element.validity.valid) {
          if (element.validity.valueMissing) {
            setErrMsg({ [element.name]: element.validationMessage });
          } else {
            setErrMsg({ [element.name]: element.title });
          }
        }
      }

      return false;
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} ref={formRef} noValidate>
        <div className='field'>
          <label className='label'>Email</label>
          <div className='control'>
            <input
              name={CONTROL_NAMES.EMAIL}
              className='input'
              type='email'
              value={email}
              required
              pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'
              title='格式不符'
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className='has-text-danger'>{errMsg[CONTROL_NAMES.EMAIL]}</div>
        </div>
        <div className='field'>
          <label className='label'>Password</label>
          <div className='control'>
            <input
              name={CONTROL_NAMES.PWD}
              className='input'
              type='password'
              value={pwd}
              required
              minLength='8'
              title='長度至少為8個字元'
              onChange={e => setPwd(e.target.value)}
            />
            <div className='has-text-danger'>{errMsg[CONTROL_NAMES.PWD]}</div>
          </div>
        </div>
        <button className='button' type='submit' onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </>
  );
};

export default FormValidation;

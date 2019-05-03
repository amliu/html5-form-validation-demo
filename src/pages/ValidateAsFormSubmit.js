import React, { useState } from 'react';

const ValidateAsFormSubmit = () => {
  const [email, setEmail] = useState('amdis@xxx.com');
  const [pwd, setPwd] = useState('');
  const formRef = React.createRef();

  const handleSubmit = e => {
    e.preventDefault();
    if (validate()) {
      console.log('form submitted');
    }
  };

  const validate = () => {
    const form = formRef.current;

    if (form.checkValidity()) {
      return true;
    } else {
      form.reportValidity();

      return false;
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} ref={formRef}>
        <div className='field'>
          <label className='label'>Email</label>
          <div className='control'>
            <input
              className='input'
              type='email'
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className='field'>
          <label className='label'>Password</label>
          <div className='control'>
            <input
              className='input'
              type='password'
              value={pwd}
              minLength='8'
              onChange={e => setPwd(e.target.value)}
            />
          </div>
        </div>
        <button className='button' type='submit' onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </>
  );
};

export default ValidateAsFormSubmit;

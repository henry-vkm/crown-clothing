import { useState } from 'react';

import FormInput from '../form-input/form-input.component';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
import {
  signInAuthUserWithEmailAndPassword, 
  signInWithGooglePopUp
} from '../../utils/firebase/firebase.utils';

import './sign-in-form.styles.scss';

const defaultFormField = {
  email: '',
  password: ''
}

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormField);
  const { email, password } = formFields;

  const signInGoogleUser = async () => {
    await signInWithGooglePopUp();
  }

  const resetFormFields = () => {
    setFormFields(defaultFormField);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await signInAuthUserWithEmailAndPassword(email, password);
      resetFormFields();
    } catch (error) {
      if (error.code === 'auth/invalid-login-credentials') {
        alert('Email and Password do not match');
      } else {
        console.log(error);
      }
      // switch (error.code) {
      //   case 'auth/invalid-login-credential':
      //     alert('Email and Password do not match!');
      //     break;
      //   default:
      //     console.log(error.code);
      // }
    }

  }

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value })
  }

  return (
    <div className="sign-in-container">
      <h2>Already have an Account? Sign In Here!</h2>
      <span>Sign In with your email and password.</span>
      <form onSubmit={handleSubmit}>
        <FormInput 
          label='Email'
          inputOptions={{
            type: 'email',
            onChange: handleChange,
            required: true,
            name: 'email',
            value: email
          }}
        />

        <FormInput 
          label='Password'
          inputOptions={{
            type: 'password',
            onChange: handleChange,
            required: true,
            name: 'password',
            value: password
          }}
        />
        <div className='buttons-container'>
          <Button type='submit'>Sign In</Button>
          <Button 
            type='button' 
            buttonType={BUTTON_TYPE_CLASSES.google} 
            onClick={signInGoogleUser}
          >Google Sign In</Button>
        </div>
      </form>
    </div>
  )
}

export default SignInForm;
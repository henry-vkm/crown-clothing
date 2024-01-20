import { useState } from "react";
import { 
  createAuthUserWithEmailAndPassword,
  createUserDocFromAuth  
} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";

import './sign-up-form.styles.scss';
import Button from "../button/button.component";

const defaultFormField = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: ''
}

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormField);
  const { displayName, email, password, confirmPassword } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormField);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!"); 
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(email, password);
      
      await createUserDocFromAuth(user, { displayName });
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        alert("User with this email already exists!");
      } else {
        console.log("Error in creating user, ", error);
      }
    }

    resetFormFields();
  }

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value })
  }

  return (
    <div className="sign-up-container">
      <h2>Don't have an account? Sign Up Here!</h2>
      <span>Sign Up with your email and password.</span>
      <form onSubmit={handleSubmit}>
        
        <FormInput 
          label='Display Name'
          inputOptions={{
            type: 'text',
            onChange: handleChange,
            required: true,
            name: 'displayName',
            value: displayName
          }}
        />

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

        <FormInput 
          label='Confirm Password'
          inputOptions={{
            type: 'password',
            onChange: handleChange,
            required: true,
            name: 'confirmPassword',
            value: confirmPassword
          }}
        />
        <Button type='submit'>Sign Up</Button>
      </form>
    </div>
    
  )
}

export default SignUpForm;
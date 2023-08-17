import { useState } from "react";
import { 
  createAuthUserWithEmailAndPassword,
  createUserDocFromAuth
} from "../../utils/firebase/firebase.util";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: ""
}

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const handleChange = (event) => {
    const { name, value } = event.target;
    
    setFormFields({ ...formFields, [name]: value });
    console.log(formFields);
  }

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  }

  const handleSubmit =  async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match!');

      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(email, password);
      
      await createUserDocFromAuth(user , {displayName});

      resetFormFields();
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        alert('Cannot Create User, Email Already in use!');
      } else {
        console.log('User creation encountered an error, ', error);
      }
    }
  }
 
  return (
    <form onSubmit={handleSubmit}>
      <label>Display Name</label>
      <input 
        type="text" 
        name="displayName" 
        value={displayName} 
        onChange={handleChange}
        required 
      />

      <label>Email</label>
      <input 
        type="email" 
        name="email" 
        value={email} 
        onChange={handleChange}
        required 
      />

      <label>Password</label>
      <input 
        type="password" 
        name="password" 
        value={password} 
        onChange={handleChange}
        required 
      />

      <label>Confirm Password</label>
      <input 
        type="password" 
        name="confirmPassword" 
        value={confirmPassword}
        onChange={handleChange}
        required 
      />

      <button type="submit">Submit</button>
    </form>
  )
}

export default SignUpForm;
import { 
  signInWithGooglePopUp,
  createUserDocFromAuth
 } from '../../utils/firebase/firebase.util';
import './sign-in.styles.scss';

const SignIn = () => {
  const logInGoogleUser = async () => {
    const { user } = await signInWithGooglePopUp();
    const userDocRef = await createUserDocFromAuth(user);
    console.log(userDocRef);
  }

  return (
    <div>
      <button onClick={logInGoogleUser}>
        Sign In With Google
      </button>
    </div>
  )
}

export default SignIn;
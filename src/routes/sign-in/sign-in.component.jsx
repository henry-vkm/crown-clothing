import { 
  signInWithGooglePopUp,
  createUserDocFromAuth
} from '../../utils/firebase/firebase.util';
import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
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
      <SignUpForm />
    </div>
  )
}

export default SignIn;
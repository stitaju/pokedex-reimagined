import { useAuth0 } from '@auth0/auth0-react';

function SignupButton() {
  const { loginWithRedirect } = useAuth0();

  const handleSignup = () =>
    loginWithRedirect({
      authorizationParams: {
        screen_hint: 'signup',
      },
    });

  return (
    <button
      className="p-3 bg-blue-600 rounded-md"
      onClick={handleSignup}
    >
      Sign Up
    </button>
  );
}
export const LoginPage = () => {
  return (
    <div className="text-white p-6 flex flex-col gap-4">
      <p>Pokemon Login Page</p>
      <div>
        <SignupButton />
      </div>
    </div>
  );
};

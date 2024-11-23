import { SignIn } from "@clerk/clerk-react";
import { useUser } from "@clerk/clerk-react";
import { BarLoader } from "react-spinners";

const SignInPage = () => {
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded) {
    return <BarLoader className="mb-4" width="100%" color="#36d7b7" />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 sm:mt-10">
      {!isSignedIn && (
        <div className="flex flex-col justify-center items-center p-6 sm:p-10">
          <div className="w-24 h-24 bg-gray-300 flex justify-center items-center rounded-full mb-6">
            <img
              src="/logo-dark.png"
              alt="Hirrd Logo"
              className="w-16 h-16 object-contain"
            />
          </div>
          <h1 className="gradient-title font-extrabold pb-3 text-3xl sm:text-5xl text-center">
            Welcome to Hirrd
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 text-center mb-6">
            Join the platform that connects job seekers with amazing
            opportunities!
          </p>
          <p className="text-center text-gray-500 max-w-xs sm:max-w-sm">
            Empowering your career journey with seamless connections and easy
            applications.
          </p>
        </div>
      )}

      <div className="flex justify-center items-center p-6 sm:p-10">
        <SignIn
          appearance={{
            elements: {
              footer: "hidden",
            },
          }}
          signUpForceRedirectUrl="/jobs"
          signUpFallbackRedirectUrl="/jobs"
        />
      </div>
    </div>
  );
};

export default SignInPage;

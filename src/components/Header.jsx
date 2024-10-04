import { Link, useSearchParams } from "react-router-dom";
import { SignedIn, SignedOut, SignIn, UserButton } from "@clerk/clerk-react";
import { Button } from "./ui/button";
import { BriefcaseBusiness, Heart, PenBox } from "lucide-react";
import { useEffect, useState } from "react";
const Header = () => {
  const [showSignIn, setShowSignIn] = useState(false);
  const [searchParam] = useSearchParams();

  useEffect(() => {
    if (searchParam.get("sign-in")) {
      setShowSignIn(true);
    }
  }, [searchParam]);
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowSignIn(false);
    }
  };

  return (
    <>
      <nav className="py-4 flex justify-between items-center">
        <Link to="/">
          <img src="/logo.png" className="h-20" alt="Hirrd Logo" />
        </Link>

        <div className="flex gap-8">
          <SignedOut>
            <Button
              variant="outline"
              onClick={() => setShowSignIn(!showSignIn)}
            >
              Login
            </Button>
          </SignedOut>
          {
            // if he/she is recruiter
            <Button variant="destructive" className="rounded-full">
              <PenBox size={20} className="mr-2" />
              Post a Job
            </Button>
          }
          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                },
              }}
            >
              <UserButton.MenuItems>
                <UserButton.Link
                  label="My Jobs"
                  labelIcon={<BriefcaseBusiness size={15} />}
                  href="/my-jobs"
                ></UserButton.Link>
                <UserButton.Link
                  label="Saved Jobs"
                  labelIcon={<Heart size={15} />}
                  href="/saved-jobs"
                ></UserButton.Link>
              </UserButton.MenuItems>
            </UserButton>
          </SignedIn>
        </div>

        {showSignIn && (
          <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
            onClick={handleOverlayClick}
          >
            <SignIn
              signUpForceRedirectUrl="/onboarding"
              signUpFallbackRedirectUrl="/onboarding"
            />
          </div>
        )}
      </nav>
    </>
  );
};

export default Header;

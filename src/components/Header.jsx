import { Link, useNavigate } from "react-router-dom";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/clerk-react";
import { Button } from "./ui/button";
import { BriefcaseBusiness, Heart, PenBox } from "lucide-react";
const Header = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  return (
    <>
      <nav className="py-4 flex justify-between items-center">
        <Link to="/">
          <img src="/logo.png" className="h-20" alt="Hirrd Logo" />
        </Link>

        <div className="flex gap-8">
          <SignedOut>
            <Button variant="outline" onClick={() => navigate("sign-in")}>
              Login
            </Button>
            <Button variant="outline" onClick={() => navigate("sign-up")}>
              Signup
            </Button>
          </SignedOut>

          <SignedIn>
            {user?.unsafeMetadata?.role == "recruiter" && (
              <Link to="/post-jobs">
                <Button variant="destructive" className="rounded-full">
                  <PenBox size={20} className="mr-2" />
                  Post a Job
                </Button>
              </Link>
            )}
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                },
              }}
            >
              <UserButton.MenuItems>
                {user?.unsafeMetadata?.role === "recruiter" && (
                  <UserButton.Link
                    label={"My Jobs"}
                    labelIcon={<BriefcaseBusiness size={15} />}
                    href={"my-jobs"}
                  ></UserButton.Link>
                )}
                <UserButton.Link
                  label="My Applications"
                  labelIcon={<BriefcaseBusiness size={15} />}
                  href="/my-applications"
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
      </nav>
    </>
  );
};

export default Header;

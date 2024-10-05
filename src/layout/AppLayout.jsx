import Header from "@/components/Header";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div>
      <div className="grid-background"></div>
      <main className="min-h-screen container">
        <Header />
        <Outlet />
      </main>
      <div className="mt-4 sm:mt-6 p-10 text-center bg-gray-800">
        Made with ❤️ by Vinay Chhabra
      </div>
    </div>
  );
};

export default AppLayout;

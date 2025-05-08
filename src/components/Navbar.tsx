
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  // Check if the user is authenticated
  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    setIsLoggedIn(!!token);
  }, [location]); // Re-run when location changes to update login state

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link to="/" className="mr-6 flex items-center space-x-2">
          <span className="hidden font-bold sm:inline-block">
            D.Y. Patil Salokhenagar API Nexus
          </span>
        </Link>

        <div className="hidden md:flex flex-1">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Home
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/api-docs">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    API Docs
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              {isLoggedIn && (
                <NavigationMenuItem>
                  <Link to="/dashboard">
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      Dashboard
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              )}
              {isLoggedIn && (
                <NavigationMenuItem>
                  <Link to="/get-api-key">
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      Get API Key
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              )}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          {!isLoggedIn ? (
            <>
              <Link to="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link to="/signup">
                <Button>Sign Up</Button>
              </Link>
            </>
          ) : (
            <Link to="/dashboard">
              <Button>Dashboard</Button>
            </Link>
          )}
        </div>

        <div className="md:hidden ml-auto">
          <Button variant="ghost" size="icon" onClick={toggleMenu}>
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 top-16 z-50 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto p-6 pb-32 shadow-md animate-in slide-in-from-bottom-80 md:hidden bg-background",
          {
            hidden: !isMenuOpen,
          }
        )}
      >
        <div className="grid grid-flow-row auto-rows-max text-center divide-y">
          <Link
            to="/"
            className="py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/api-docs"
            className="py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            API Docs
          </Link>
          {isLoggedIn && (
            <Link
              to="/dashboard"
              className="py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </Link>
          )}
          {isLoggedIn && (
            <Link
              to="/get-api-key"
              className="py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Get API Key
            </Link>
          )}

          <div className="flex flex-col gap-4 pt-4">
            {!isLoggedIn ? (
              <>
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" className="w-full">
                    Login
                  </Button>
                </Link>
                <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full">Sign Up</Button>
                </Link>
              </>
            ) : (
              <Button
                onClick={() => {
                  localStorage.removeItem("auth_token");
                  setIsLoggedIn(false);
                  setIsMenuOpen(false);
                  window.location.href = "/login";
                }}
                variant="outline"
                className="w-full"
              >
                Logout
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

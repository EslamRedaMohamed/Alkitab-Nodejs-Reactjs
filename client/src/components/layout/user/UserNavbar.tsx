import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../../index.css";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItems,
  MenuItem,
} from "@headlessui/react";
import { UserOutlined } from "@ant-design/icons";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import SearchBar from "../../common/SearchBar";

// Define the type for navigation items
type NavigationItem = {
  name: string;
  path: string;
  current: boolean;
};

const navigation: NavigationItem[] = [
  { name: "My Books", path: "/myBooks", current: false },
  { name: "Books", path: "/users/books", current: false },
  { name: "Categories", path: "/users/categories", current: false },
  { name: "Authors", path: "/users/Authors", current: false }
];

function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(" ");
}

interface UserNavbarProps {
  isTransparent: boolean;
}

const UserNavbar: React.FC<UserNavbarProps> = ({ isTransparent }) => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Retrieve the token from localStorage
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  const handleSignout = () => {
    // Remove the token and user data from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null); // Set token state to null
  };

  return (
    <Disclosure
      as="nav"
      className={`fixed w-full top-0 left-0 z-20 ${
        isTransparent
          ? "bg-transparent text-white"
          : "bg-primary text-white shadow-md"
      }`}
    >
      <div className="mt-3 mx-auto max-w-fit px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button */}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="block h-6 w-6 group-data-[open]:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden h-6 w-6 group-data-[open]:block"
              />
            </DisclosureButton>
          </div>
          <div
            style={{ width: 180 }}
            className="flex items-center mr-32 mb-2 logo"
          >
            <Link to="/">
              <img src="../../../../public/elkitabV2.png" alt="Alkitab Logo" />
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    aria-current={item.current ? "page" : undefined}
                    className={classNames(
                      item.current
                        ? "bg-gray-900 text-white"
                        : "text-white-300 hover:bg-gray-700 hover:text-white",
                      "rounded-md px-3 py-2 text-lg font-bold "
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <SearchBar />
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <Menu as="div" className="relative ml-3">
              <div>
                <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Open user menu</span>
                  <UserOutlined style={{ fontSize: "25px" }} />
                </MenuButton>
              </div>
              <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <MenuItem>
                  {({ active }) => (
                    <Link
                      to="/profile"
                      className={classNames(
                        active ? "bg-gray-100" : "",
                        "block px-4 py-2 text-sm text-gray-700"
                      )}
                    >
                      Your Profile
                    </Link>
                  )}
                </MenuItem>
                {token ? (
                  <MenuItem>
                    {({ active }) => (
                      <Link
                        to="/"
                        onClick={handleSignout}
                        className={classNames(
                          active ? "bg-gray-100" : "",
                          "block px-4 py-2 text-sm text-gray-700"
                        )}
                      >
                        Sign out
                      </Link>
                    )}
                  </MenuItem>
                ) : (
                  <Link
                    to="/login"
                    // onClick={handleSignout}
                    className={classNames(
                      "block px-4 py-2 text-sm text-gray-700"
                    )}
                  >
                    Sign in
                  </Link>
                  // <Link
                  //   to="/login"
                  //   className="text-white-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-lg font-bold"
                  // >
                  //   Sign in
                  // </Link>
                )}
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>
      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as={Link}
              to={item.path}
              className={classNames(
                item.current
                  ? "bg-gray-900 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white",
                "block rounded-md px-3 py-2 text-base font-medium"
              )}
              aria-current={item.current ? "page" : undefined}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
};

export default UserNavbar;

"use client";

import { PhoneIcon } from "@heroicons/react/20/solid";

export default function UserFooter() {
  return (
    <footer className="bg-primary text-white py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul>
              <li>
                <a href="#" className="hover:underline">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  History
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul>
              <li>
                <a href="#" className="hover:underline">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul>
              {/* <li className="flex items-center">
                <MailIcon className="h-5 w-5 mr-2" />
                <a
                  href="mailto:support@yourcompany.com"
                  className="hover:underline"
                >
                  support@yourcompany.com
                </a>
              </li> */}
              <li className="flex items-center mt-2">
                <PhoneIcon className="h-5 w-5 mr-2" />
                <a href="tel:+123456789" className="hover:underline">
                  +1 (234) 567-89
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-700 pt-8 text-center">
          <p>
            &copy; {new Date().getFullYear()} AL KITAB. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

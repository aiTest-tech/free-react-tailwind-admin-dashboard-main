import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import SidebarLinkGroup from './SidebarLinkGroup';
// import Logo from 'images/logo/logo.svg';
import Logo from "../../../public/images/cmoswarlogo1.svg"
import { FaAngleUp, FaMicrophone, FaProjectDiagram } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa";




interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const location = useLocation();
  const { pathname } = location;
  const [isProjectDropdownOpen, setisProjectDropdownOpen] = useState(false)
  const [isWtcDropdownOpen, setisWtcDropdownOpen] = useState(false);
  const [isJsDropdownOpen, setisJsDropdownOpen] = useState(false);

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true'
  );

  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector('body')?.classList.add('sidebar-expanded');
    } else {
      document.querySelector('body')?.classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
    >
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <NavLink to="/dashboard">
          <img src={Logo} alt="Logo" />
        </NavLink>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button>
      </div>

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
              MENU
            </h3>

            <ul className="mb-6 flex flex-col gap-1.5">
              <li className="relative">
                <NavLink to="/">
                  <button
                    className="flex justify-between items-center w-full px-6 py-3 rounded-lg bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-200 ease-in-out transform hover:scale-105"
                    onClick={() => setisProjectDropdownOpen(!isProjectDropdownOpen)}
                  >
                    <span className="flex items-center gap-4 text-white">
                      {/* Icon */}
                      <svg
                        className="fill-current"
                        width="20"
                        height="20"
                        viewBox="0 0 18 18"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M15.7499 2.9812H14.2874V2.36245C14.2874 2.02495 14.0062 1.71558 13.6405 1.71558C13.2749 1.71558 12.9937 1.99683 12.9937 2.36245V2.9812H4.97803V2.36245C4.97803 2.02495 4.69678 1.71558 4.33115 1.71558C3.96553 1.71558 3.68428 1.99683 3.68428 2.36245V2.9812H2.2499C1.29365 2.9812 0.478027 3.7687 0.478027 4.75308V14.5406C0.478027 15.4968 1.26553 16.3125 2.2499 16.3125H15.7499C16.7062 16.3125 17.5218 15.525 17.5218 14.5406V4.72495C17.5218 3.7687 16.7062 2.9812 15.7499 2.9812Z"
                          fill="currentColor"
                        />
                      </svg>
                      Projects
                    </span>
                    {isProjectDropdownOpen ? (
                      <FaAngleUp className="text-white transform transition duration-200 ease-in-out" />
                    ) : (
                      <FaAngleDown className="text-white transform transition duration-200 ease-in-out" />
                    )}
                  </button>
                </NavLink>

                {/* Dropdown Menu */}
                {isProjectDropdownOpen && (
                  <ul className="mt-2 space-y-2 pl-6 transition-all duration-300 ease-in-out">
                    {/* Write To CMO Button */}
                    <li>
                      <NavLink to={'/project/wtc/'}>
                        <button
                          className="flex justify-between items-center w-full px-6 py-3 rounded-lg bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-200 ease-in-out transform hover:scale-105"
                          onClick={() => setisWtcDropdownOpen(!isWtcDropdownOpen)}
                        >
                          <span className="flex items-center gap-4 text-white">
                            {/* Icon */}
                            <FaProjectDiagram />
                            Write To CMO
                          </span>
                          {isWtcDropdownOpen ? (
                            <FaAngleUp className="text-white transform transition duration-200 ease-in-out" />
                          ) : (
                            <FaAngleDown className="text-white transform transition duration-200 ease-in-out" />
                          )}
                        </button>
                      </NavLink>

                      {/* Nested Dropdown */}
                      {isWtcDropdownOpen && (
                        <ul className="pl-6 space-y-2">
                          <li>
                            <NavLink
                              to={'/project/wtc/l0'}
                              className={`block px-6 py-2 rounded-lg text-gray-300 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-200 ease-in-out transform hover:scale-105 ${pathname.includes("L0") ? "bg-gray-700" : ""}`}
                            >
                              <span className="flex items-center gap-4">
                                Level 0
                              </span>
                            </NavLink>
                          </li>
                        </ul>
                      )}
                    </li>


                    <li>
                      <NavLink to={'/project/js/'}>
                        <button
                          className="flex justify-between items-center w-full px-6 py-3 rounded-lg bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-200 ease-in-out transform hover:scale-105"
                          onClick={() => setisJsDropdownOpen(!isJsDropdownOpen)}
                        >
                          <span className="flex items-center gap-4 text-white">
                            {/* Icon */}
                            <FaProjectDiagram />
                            Jansanvad
                          </span>
                          {isJsDropdownOpen ? (
                            <FaAngleUp className="text-white transform transition duration-200 ease-in-out" />
                          ) : (
                            <FaAngleDown className="text-white transform transition duration-200 ease-in-out" />
                          )}
                        </button>
                      </NavLink>

                      {/* Nested Dropdown */}
                      {isJsDropdownOpen && (
                        <ul className="pl-6 space-y-2">
                          <li>
                            <NavLink
                              to={'/project/wtc/l0'}
                              className={`block px-6 py-2 rounded-lg text-gray-300 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-200 ease-in-out transform hover:scale-105 ${pathname.includes("L0") ? "bg-gray-700" : ""}`}
                            >
                              <span className="flex items-center gap-4">
                                Level 0
                              </span>
                            </NavLink>
                          </li>
                        </ul>
                      )}
                    </li>
                  </ul>
                )}
              </li>
              {/* <li>
                <NavLink
                  to="/demo"
                  className={`group relative flex items-center gap-2.5 rounded-xl py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname.includes('demo') && 'bg-graydark dark:bg-meta-4 rounded-xl'}`}
                >
                  <FaMicrophone className="w-5 h-5" />
                  Demo
                </NavLink>
              </li> */}

              <li>
                <NavLink
                  to="/demo"
                  className={`block px-6 py-2 rounded-lg text-gray-300 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-200 ease-in-out transform hover:scale-105 ${pathname.includes("demo") ? "bg-gray-700" : ""}`}
                >
                  <span className="flex items-center gap-4 text-white">
                    {/* Icon */}
                    <FaMicrophone size={25} />
                    Demo
                  </span>
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;

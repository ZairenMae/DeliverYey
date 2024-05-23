import React, { useState } from "react"

export default function SideNavigationSearchBar() {
  const [isSideNavOpen, setIsSideNavOpen] = useState(false)

  return (
    <>
        <button
            title="Side navigation"
            type="button"
            className={`visible fixed left-6 top-6 z-40 order-10 block h-10 w-10 self-center rounded bg-[#F9E4C9] opacity-100 lg:hidden ${
              isSideNavOpen
                ? "visible opacity-100 [&_span:nth-child(1)]:w-6 [&_span:nth-child(1)]:translate-y-0 [&_span:nth-child(1)]:rotate-45 [&_span:nth-child(3)]:w-0 [&_span:nth-child(2)]:-rotate-45 "
                : ""
            }`}
            aria-haspopup="menu"
            aria-label="Side navigation"
            aria-expanded={isSideNavOpen ? " true" : "false"}
            aria-controls="nav-menu-3"
            onClick={() => setIsSideNavOpen(!isSideNavOpen)}
          >
            <div className="absolute top-1/2 left-1/2 w-6 -translate-x-1/2 -translate-y-1/2 transform">
              <span
                aria-hidden="true"
                className="absolute block h-0.5 w-9/12 -translate-y-2 transform rounded-full bg-[#F97108] transition-all duration-300"
              ></span>
              <span
                aria-hidden="true"
                className="absolute block h-0.5 w-6 transform rounded-full bg-[#F97108] transition duration-300"
              ></span>
              <span
                aria-hidden="true"
                className="absolute block h-0.5 w-1/2 origin-top-left translate-y-2 transform rounded-full bg-[#F97108] transition-all duration-300"
              ></span>
            </div>
          </button>
      {/*  <!-- Side Navigation --> */}
      <aside
        id="nav-menu-3"
        aria-label="Side navigation"
        className={`fixed top-0 bottom-0 left-0 z-40 flex w-72 flex-col border-r border-r-[#F97108] bg-[#F9E4C9] transition-transform lg:translate-x-0 ${
          isSideNavOpen ? "translate-x-0" : " -translate-x-full"
        }`}
      >
        <a
          className="flex items-center gap-2 whitespace-nowrap p-6 text-xl font-medium focus:outline-none justify-center"
          href="/Homepage"
        >
          <img
            className="h-12 w-auto" 
            src="src/image/deliveryey logo.png"
            alt="Your Company"
            href="Homepage"
          />
        </a>
        <div className="border-b border-[#F97108] ">
        </div>
        <nav
          aria-label="side navigation"
          className="flex-1 divide-y divide-slate-100 overflow-auto"
        >
          <div>
            <ul className="flex flex-1 flex-col gap-1 py-3">
              <li className="px-3">
                <a
                  href="/Orders"
                  className="flex items-center gap-3 rounded p-3 text-[#F97108] transition-colors hover:bg-[#F97108] hover:text-[#F9E4C9] focus:bg-[#F97108] aria-[current=page]:bg-[#F97108]  aria-[current=page]:text-[#F9E4C9] "
                >
                  <div className="flex items-center self-center ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-6 w-6"
                      aria-label="Dashboard icon"
                      role="graphics-symbol"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                      />
                    </svg>
                  </div>
                  <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm">
                    Orders
                  </div>
                </a>
              </li>
              <li className="px-3">
                <a
                  href="/Menu"
                  className="flex items-center gap-3 rounded p-3 text-[#F97108] transition-colors hover:bg-[#F97108] hover:text-[#F9E4C9] focus:bg-[#F97108] aria-[current=page]:bg-[#F97108]  aria-[current=page]:text-[#F9E4C9] "
                >
                  <div className="flex items-center self-center ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-6 w-6"
                      aria-label="Dashboard icon"
                      role="graphics-symbol"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
                      />
                    </svg>
                  </div>
                  <div className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm">
                    Menu
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </nav>
        <footer className="border-t border-[#F97108] p-3">
          <a
            href="/signin"
            className="flex items-center gap-3 rounded p-3 text-[#F97108] transition-colors hover:text-[#F97108] "
          >
            <div className="flex items-center self-center ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6"
                aria-label="Dashboard icon"
                role="graphics-symbol"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div 
            className="flex w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate text-sm font-medium">
              Logout
            </div>
          </a>
        </footer>
      </aside>

      {/*  <!-- Backdrop --> */}
      <div
        className={`fixed top-0 bottom-0 left-0 right-0 z-30 bg-slate-900/20 transition-colors sm:hidden ${
          isSideNavOpen ? "block" : "hidden"
        }`}
        onClick={() => setIsSideNavOpen(false)}
      ></div>
      {/*  <!-- End Side navigation menu with search bar and alert message --> */}
    </>
  )
}

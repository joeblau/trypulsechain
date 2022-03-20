import { Switch } from "@headlessui/react";
import { useTheme } from "next-themes";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
    
    const { resolvedTheme, setTheme } = useTheme();
    const isDark = resolvedTheme === "dark";

    const ToggleSwitch = (
    <Switch
      checked={isDark}
      onChange={() => setTheme(isDark ? "light" : "dark")}
      className={classNames(
        isDark ? "bg-gray-700" : "bg-gray-200",
        "relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      )}
    >
      <span className="sr-only">Use setting</span>
      <span
        className={classNames(
          isDark ? "translate-x-5" : "translate-x-0",
          "pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
        )}
      >
        <span
          className={classNames(
            isDark
              ? "opacity-0 ease-out duration-100"
              : "opacity-100 ease-in duration-200",
            "absolute inset-0 h-full w-full flex items-center justify-center transition-opacity"
          )}
          aria-hidden="true"
        >
          <svg
            className="h-3 w-3 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
              clipRule="evenodd"
            />
          </svg>
        </span>
        <span
          className={classNames(
            isDark
              ? "opacity-100 ease-in duration-200"
              : "opacity-0 ease-out duration-100",
            "absolute inset-0 h-full w-full flex items-center justify-center transition-opacity"
          )}
          aria-hidden="true"
        >
          <svg
            className="h-3 w-3 text-gray-700"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        </span>
      </span>
    </Switch>
  );

  return (
     <div className="max-w-7xl mx-auto ">
      <nav className="flex items-center justify-between flex-wrap p-6 ">
        <div className="flex items-center flex-shrink-0 text-black mr-6">
          <svg
            className="h-8 w-8 mr-3 primary-text"
            width="340px"
            height="340px"
            viewBox="0 0 340 340"
          >
            <g
              id="favicon"
              stroke="none"
              strokeWidth="1"
              fill="none"
              fillRule="evenodd"
            >
              <path
                d="M80.55,311.47 L57.63,271.77 C56.92,270.49 56.92,268.38 57.65,267.12 L83.1,223.05 C83.83,221.78 85.7,220.7 87.17,220.7 L138.06,220.7 C139.53,220.7 141.39,221.78 142.13,223.05 L167.58,267.12 C168.31,268.39 168.31,270.54 167.58,271.82 L142.13,315.89 C141.41,317.14 139.61,318.18 138.16,318.23 L92.36,318.23 C88.04,318.19 82.79,315.18 80.55,311.47 Z M245.83,220.78 L195.13,132.97 C194.12,131.23 191.58,129.76 189.56,129.76 L88.16,129.76 C86.15,129.76 83.6,131.23 82.59,132.97 L31.89,220.78 C30.88,222.52 30.88,225.47 31.89,227.21 L46.75,252.96 L72.71,207.99 C73.89,205.94 76.78,204.28 79.14,204.28 L145.96,204.28 C148.32,204.28 151.21,205.95 152.39,207.99 L185.8,265.85 C186.98,267.9 186.98,271.23 185.8,273.28 L159.84,318.24 L189.54,318.24 C191.55,318.24 194.1,316.77 195.11,315.03 L245.81,227.22 C246.83,225.47 246.83,222.52 245.83,220.78 Z M337.86,162.69 L260.06,27.93 C257.86,24.12 252.46,21 248.06,21 L92.45,21 C88.05,21 82.65,24.12 80.45,27.93 L2.65,162.69 C0.45,166.5 0.45,172.74 2.65,176.55 L20.48,207.43 L72.19,117.87 C73.65,115.34 77.21,113.29 80.12,113.29 L197.54,113.29 C200.46,113.29 204.01,115.34 205.47,117.87 L264.18,219.56 C265.64,222.09 265.64,226.19 264.18,228.72 L212.49,318.24 L248.06,318.24 C252.46,318.24 257.86,315.12 260.06,311.31 L337.86,176.55 C340.06,172.74 340.06,166.5 337.86,162.69 Z"
                id="Shape"
                fill="currentColor"
                fillRule="nonzero"
              ></path>
            </g>
          </svg>
          <span className="self-center text-lg font-semibold whitespace-nowrap primary-text">
            Try Pulse Chain
          </span>
        </div>
        <div className="w-full block w-auto">{ToggleSwitch}</div>
      </nav>
    </div>
  );
}
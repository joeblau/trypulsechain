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
            width="433px"
            height="401px"
            viewBox="0 0 433 401"
          >
            <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g id="pulse" fill="currentColor" fillRule="nonzero">
                    <path d="M432.098765,223.457379 C432.098765,225.508758 431.623895,227.458855 430.72332,229.151199 L338.058363,389.651507 C334.128442,396.458331 326.865648,400.651507 319.005805,400.651507 L113.092961,400.651507 C105.233118,400.651507 97.970323,396.458331 94.040402,389.651507 L1.36679,229.135903 C0.468844,227.446373 0,225.505653 0,223.457379 C0,216.814252 5.385318,211.428934 12.028445,211.428934 L113.699342,211.428934 L139.465382,255.1943 L139.623755,255.455803 C143.06213,260.976493 150.296681,262.775813 155.933324,259.457386 L155.933324,259.457386 L156.225027,259.280038 C158.823961,257.649043 160.705446,255.083126 161.476025,252.104256 L161.476025,252.104256 L194.307505,125.184056 L222.498349,329.518236 L222.541062,329.803098 C223.582331,336.231171 229.572426,340.684651 236.057845,339.789899 L236.057845,339.789899 L236.35245,339.745554 C241.048041,338.979494 244.862876,335.510845 246.059058,330.886703 L246.059058,330.886703 L285.633013,177.902881 L301.881735,205.502917 L302.043066,205.769045 C304.235954,209.283361 308.09028,211.428934 312.247249,211.428934 L312.247249,211.428934 L420.07032,211.428934 L420.07032,211.428934 C426.713447,211.428934 432.098765,216.814252 432.098765,223.457379 Z M319.005805,0 C326.865648,0 334.128442,4.193176 338.058363,11 L430.729106,171.50761 C431.625282,173.198183 432.098765,175.147189 432.098765,177.194128 C432.098765,183.837255 426.713447,189.222573 420.07032,189.222573 L318.066328,189.222573 L292.300288,145.457207 L292.12294,145.165504 C290.491945,142.566569 287.926028,140.685085 284.947158,139.914506 L284.947158,139.914506 L284.667463,139.845646 C278.326545,138.363381 271.929227,142.209033 270.289645,148.547252 L270.289645,148.547252 L237.45724,275.466526 L209.267321,71.133271 L209.222976,70.838665 C208.456916,66.143074 204.988267,62.32824 200.364125,61.132058 C193.932698,59.468365 187.370306,63.333377 185.706612,69.764804 L185.706612,69.764804 L146.131731,222.747701 L129.883935,195.148591 L129.722604,194.882463 C127.529716,191.368147 123.67539,189.222573 119.518421,189.222573 L119.518421,189.222573 L12.028445,189.222573 L12.028445,189.222573 C5.385318,189.222573 0,183.837255 0,177.194128 C0,175.162881 0.456256,173.241767 1.337658,171.562508 L94.040402,11 C97.970323,4.193176 105.233118,0 113.092961,0 L319.005805,0 Z"></path>
                </g>
            </g>
          </svg>
          <span className="self-center text-lg font-semibold whitespace-nowrap primary-text">
            Try PulseChain
          </span>
        </div>
        <div className="w-full block w-auto">{ToggleSwitch}</div>
      </nav>
    </div>
  );
}
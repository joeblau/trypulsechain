import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import { useTheme } from "next-themes";
import { useAccount } from "wagmi";
import { shortAddress } from "../lib/short-address";
import Avatar from "boring-avatars";

export default function Navbar() {
  const { address } = useAccount();
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <div className="navbar pb-12">
      <div className="flex-1">
        <div className="flex items-center flex-shrink-0 text-black mr-6">
          <svg
            className="h-10 w-10 mr-3 primary-text"
            width="433px"
            height="401px"
            viewBox="0 0 433 401"
          >
            <g
              id="Page-1"
              stroke="none"
              strokeWidth="1"
              fill="none"
              fillRule="evenodd"
            >
              <g id="pulse" fill="currentColor" fillRule="nonzero">
                <path d="M432.098765,223.457379 C432.098765,225.508758 431.623895,227.458855 430.72332,229.151199 L338.058363,389.651507 C334.128442,396.458331 326.865648,400.651507 319.005805,400.651507 L113.092961,400.651507 C105.233118,400.651507 97.970323,396.458331 94.040402,389.651507 L1.36679,229.135903 C0.468844,227.446373 0,225.505653 0,223.457379 C0,216.814252 5.385318,211.428934 12.028445,211.428934 L113.699342,211.428934 L139.465382,255.1943 L139.623755,255.455803 C143.06213,260.976493 150.296681,262.775813 155.933324,259.457386 L155.933324,259.457386 L156.225027,259.280038 C158.823961,257.649043 160.705446,255.083126 161.476025,252.104256 L161.476025,252.104256 L194.307505,125.184056 L222.498349,329.518236 L222.541062,329.803098 C223.582331,336.231171 229.572426,340.684651 236.057845,339.789899 L236.057845,339.789899 L236.35245,339.745554 C241.048041,338.979494 244.862876,335.510845 246.059058,330.886703 L246.059058,330.886703 L285.633013,177.902881 L301.881735,205.502917 L302.043066,205.769045 C304.235954,209.283361 308.09028,211.428934 312.247249,211.428934 L312.247249,211.428934 L420.07032,211.428934 L420.07032,211.428934 C426.713447,211.428934 432.098765,216.814252 432.098765,223.457379 Z M319.005805,0 C326.865648,0 334.128442,4.193176 338.058363,11 L430.729106,171.50761 C431.625282,173.198183 432.098765,175.147189 432.098765,177.194128 C432.098765,183.837255 426.713447,189.222573 420.07032,189.222573 L318.066328,189.222573 L292.300288,145.457207 L292.12294,145.165504 C290.491945,142.566569 287.926028,140.685085 284.947158,139.914506 L284.947158,139.914506 L284.667463,139.845646 C278.326545,138.363381 271.929227,142.209033 270.289645,148.547252 L270.289645,148.547252 L237.45724,275.466526 L209.267321,71.133271 L209.222976,70.838665 C208.456916,66.143074 204.988267,62.32824 200.364125,61.132058 C193.932698,59.468365 187.370306,63.333377 185.706612,69.764804 L185.706612,69.764804 L146.131731,222.747701 L129.883935,195.148591 L129.722604,194.882463 C127.529716,191.368147 123.67539,189.222573 119.518421,189.222573 L119.518421,189.222573 L12.028445,189.222573 L12.028445,189.222573 C5.385318,189.222573 0,183.837255 0,177.194128 C0,175.162881 0.456256,173.241767 1.337658,171.562508 L94.040402,11 C97.970323,4.193176 105.233118,0 113.092961,0 L319.005805,0 Z"></path>
              </g>
            </g>
          </svg>
        </div>
      </div>
      <div className="flex-none flex space-x-4">
        <button className="btn gap-4">
          {address ? (
            <>
              <div className="avatar">
                <div className="-ml-3 w-10 h-10 rounded-lg">
                  <Avatar
                    square={true}
                    name={address}
                    variant="pixel"
                    colors={[
                      "#ff0000",
                      "#e619e6",
                      "#8000ff",
                      "#0080ff",
                      "#00eaff",
                    ]}
                  />
                </div>
              </div>
              <code> {shortAddress(address)}</code>
            </>
          ) : (
            <p>Not Connected</p>
          )}
        </button>
        <label className="swap swap-rotate">
          <input
            type="checkbox"
            onChange={() => {
              const t = isDark ? "light" : "dark";
              document
                .getElementsByTagName("html")[0]
                .setAttribute("data-theme", t);
              window.localStorage.setItem("sb-react-daisyui-preview-theme", t);
              setTheme(t);
            }}
          />

          <MoonIcon className="swap-on fill-current w-10 h-10" />
          <SunIcon className="swap-off fill-current w-10 h-10" />
        </label>
      </div>
    </div>
  );
}

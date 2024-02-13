import Link from "next/link";
import Image from "next/image";

const FeatureSection = () => {
  return (
    <>
      <div className="mx-auto mt-32 sm:mt-56">
        <div className="mb-12">
          <div className="mx-auto max-w-4xl sm:text-center">
            <h2 className="mt-2 font-bold text-4xl text-gray-900 sm:text-5xl">
              Start creating link in seconds
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Creating shareable links of your documents has never been easier
              than with Quicklinkr.
            </p>
          </div>
        </div>

        {/* steps */}
        <ol className="my-8 space-y-4 pt-8 md:flex md:space-x-12 md:space-y-0">
          <li className="md:flex-1">
            <div className="flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4">
              <span className="text-sm font-medium text-blue-600">Step 1</span>
              <span className="text-xl font-semibold">
                Sign up for an account
              </span>
              <span className="mt-2 text-zinc-700">
                Now starting out with our offering free plan with a limited
                storage.
              </span>
            </div>
          </li>
          <li className="md:flex-1">
            <div className="flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4">
              <span className="text-sm font-medium text-blue-600">Step 2</span>
              <span className="text-xl font-semibold">
                Upload your media files
              </span>
              <span className="mt-2 text-zinc-700">
                We&apos;ll process your file and make a shareable link for you.
              </span>
            </div>
          </li>
          <li className="md:flex-1">
            <div className="flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4">
              <span className="text-sm font-medium text-blue-600">Step 3</span>
              <span className="text-xl font-semibold">
                Start asking questions
              </span>
              <span className="mt-2 text-zinc-700">
                It&apos;s that simple. Try out Quicklinkr today - it really
                takes less than a minute.
              </span>
            </div>
          </li>
        </ol>

        <div className="mt-16 flow-root sm:mt-24">
          <div className="rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:rounded-2xl">
            <Image
              src="/file-upload-preview.png"
              alt="uploading preview"
              width={1419}
              height={732}
              quality={100}
              className="rounded-md bg-white p-2 sm:p-8 md:p-20 shadow-2xl ring-1 ring-gray-900/10"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default FeatureSection;

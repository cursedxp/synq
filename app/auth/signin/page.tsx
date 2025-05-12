import Image from "next/image";
import PhotoBy from "@/app/components/auth/common/photoBy/photoBy";
import Link from "next/link";
import Input from "@/app/components/auth/common/input/input";
import Button from "@/app/components/auth/common/button/button";
export default function SignIn() {
  return (
    <div className="flex w-full h-screen">
      <div className="hidden md:flex flex-1">
        <div className="relative w-full h-full ">
          <Image
            src="/images/auth/signin.jpg"
            alt="Yellow National Park"
            fill
            className="object-cover"
          />
          <PhotoBy
            location="Yellowstone National Park, United States"
            photographer="Kimon Maritz"
            photoUrl="https://unsplash.com/@kimonmaritz"
          />
        </div>
      </div>
      <div className="flex flex-1">
        <div className="flex flex-col items-center justify-center w-full ">
          <div className="flex flex-col w-sm gap-2">
            <h1 className="text-4xl font-bold text-left ">Sign in</h1>
            <p className="text-gray-500 mb-4">
              Welcome back! Let&apos;s continue your journey
            </p>
            <form className="flex flex-col gap-4 w-full">
              {/* Email */}
              <Input
                label="Email"
                type="email"
                name="email"
                placeholder="Email"
              />
              {/* Password */}
              <Input
                label="Password"
                type="password"
                name="password"
                placeholder="Password"
              />
              <Button>Sign in</Button>

              <div className="text-gray-500 text-sm flex justify-between">
                <div>
                  Are you new here?{" "}
                  <Link
                    href="/auth/signup"
                    className="font-bold text-black underline"
                  >
                    Sign up
                  </Link>
                </div>
                <div className="flex text-sm text-black font-semibold underline">
                  <Link href="/auth/forgot-password">Forgot password?</Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

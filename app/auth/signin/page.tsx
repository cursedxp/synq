import Image from "next/image";
import PhotoBy from "@/app/components/auth/common/photoBy/photoBy";
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
        <div className="flex flex-col items-center justify-center w-full">
          <h1 className="text-4xl font-bold">Sign in</h1>
          <p className="text-gray-500">Sign in to your account to continue</p>
        </div>
      </div>
    </div>
  );
}

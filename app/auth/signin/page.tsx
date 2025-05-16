import Image from "next/image";
import PhotoBy from "@/app/components/auth/common/photoBy/photoBy";
import SignInForm from "@/app/components/auth/signIn/signIn";
import SplitScreen from "@/app/components/auth/common/splitScreen/splitScreen";

export default function SignIn() {
  return (
    <SplitScreen
      left={
        <div className="relative w-full h-full">
          <Image
            src="/images/auth/signin.jpg"
            alt="Yellow National Park"
            fill
            priority
            sizes="(max-width: 768px) 0vw, 100vw"
            className="object-cover"
          />
          <PhotoBy
            location="Yellowstone National Park, United States"
            photographer="Kimon Maritz"
            photoUrl="https://unsplash.com/@kimonmaritz"
          />
        </div>
      }
      right={
        <div className="flex flex-1">
          <SignInForm />
        </div>
      }
    />
  );
}

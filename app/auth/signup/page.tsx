import PhotoBy from "@/app/components/auth/common/photoBy/photoBy";
import Image from "next/image";
import SplitScreen from "@/app/components/auth/common/splitScreen/splitScreen";
import { SignUpForms } from "@/app/components/auth/signUpForms/signUpForms";
export default function SignUp() {
  return (
    <SplitScreen
      left={
        <div className="relative w-full h-full">
          <Image
            src="/images/auth/signup.jpg"
            alt="Majorca, Spain"
            fill
            priority
            sizes="(max-width: 768px) 0vw, 100vw"
            className="object-cover"
          />
          <PhotoBy
            location="Majorca, Spain"
            photographer="Linus Nylund"
            photoUrl="https://unsplash.com/@dreamsoftheoceans"
          />
        </div>
      }
      right={<SignUpForms />}
    />
  );
}

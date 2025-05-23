import SplitScreen from "@/app/components/auth/common/splitScreen/splitScreen";
import Image from "next/image";
import PhotoBy from "@/app/components/auth/common/photoBy/photoBy";
import ForgotPassword from "@/app/components/auth/forgotPassword/forgotPassword";

export default function ForgotPasswordPage() {
  return (
    <SplitScreen
      left={
        <div className="relative w-full h-full">
          <Image
            src="/images/auth/forgotPassword.jpg"
            alt="Don't forget to Live"
            fill
            priority
            sizes="(max-width: 768px) 0vw, 100vw"
            className="object-cover"
          />
          <PhotoBy
            location="Lago Limides, BL, Italy"
            photographer="Alessio Furlan"
            photoUrl="https://unsplash.com/@alessiofurlan"
          />
        </div>
      }
      right={<ForgotPassword />}
    ></SplitScreen>
  );
}

import { HiXMark, HiCheck, HiEnvelope } from "react-icons/hi2";
import { useRouter } from "next/navigation";
import Button from "../auth/common/button/button";

type IconType = "success" | "error" | "email";

type CardStatus = {
  success: boolean;
  message?: string;
  title?: string;
  buttonLabel?: string;
  redirectRoute?: string;
  iconType?: IconType;
};

export default function VerificationCard({
  success,
  message,
  title,
  buttonLabel = "Continue",
  redirectRoute = "/auth/signup",
  iconType = success ? "success" : "error",
}: CardStatus) {
  const router = useRouter();

  const getIcon = () => {
    switch (iconType) {
      case "email":
        return <HiEnvelope className="text-blue-500 text-6xl" />;
      case "success":
        return <HiCheck className="text-green-500 text-6xl" />;
      case "error":
        return <HiXMark className="text-red-500 text-6xl" />;
      default:
        return success ? (
          <HiCheck className="text-green-500 text-6xl" />
        ) : (
          <HiXMark className="text-red-500 text-6xl" />
        );
    }
  };

  const getIconBackgroundColor = () => {
    switch (iconType) {
      case "email":
        return "bg-blue-100";
      case "success":
        return "bg-green-100";
      case "error":
        return "bg-red-100";
      default:
        return success ? "bg-green-100" : "bg-red-100";
    }
  };

  return (
    <div className="flex flex-col justify-center">
      <div className="flex justify-center mb-6">
        <div
          className={`w-32 h-32 rounded-full ${getIconBackgroundColor()} flex items-center justify-center`}
        >
          {getIcon()}
        </div>
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
        {title ||
          (success ? "Verification Successful!" : "Verification Failed")}
      </h2>
      <p className="text-gray-600 mb-4">{message}</p>
      {success && (
        <Button
          onClick={() => router.push(redirectRoute)}
          label={buttonLabel}
        />
      )}
    </div>
  );
}

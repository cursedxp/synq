import { HiXMark, HiCheck } from "react-icons/hi2";

type CardStatus = {
  success: boolean;
  message?: string;
  title?: string;
};

export default function VerificationCard({ success, message }: CardStatus) {
  return (
    <>
      <div className="flex justify-center mb-6">
        <div
          className={`w-32 h-32 rounded-full ${!success ? "bg-red-100" : "bg-green-100"} flex items-center justify-center`}
        >
          {!success ? (
            <HiXMark className="text-red-500 text-6xl" />
          ) : (
            <HiCheck className="text-green-500 text-6xl" />
          )}
        </div>
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        {success ? "Verification Successful!" : "Verification Failed"}
      </h2>
      <p className="text-gray-600 mb-4">{message}</p>
      <p className="text-sm text-gray-500">Redirecting to sign up page...</p>
    </>
  );
}

interface StatusCardProps {
  title: string;
  status: "Operational" | "Outage" | "Degraded";
  showHelp?: boolean;
}

export default function StatusCard({ title, status }: StatusCardProps) {
  return (
    <>
      <div className="flex items-center gap-2">
        <span className="text-gray-900  text-sm">{title}</span>
      </div>
      <div className="flex items-center gap-2">
        <div
          className={`w-3 h-3 rounded-full ${
            status === "Operational"
              ? "bg-green-600"
              : status === "Degraded"
              ? "bg-yellow-600"
              : "bg-red-600"
          }`}
        ></div>
      </div>
    </>
  );
}

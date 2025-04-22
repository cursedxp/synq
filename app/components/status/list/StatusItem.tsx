export default function StatusItem({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <li className="flex items-center justify-between py-4 px-4 border border-gray-200 rounded-lg">
      {children}
    </li>
  );
}

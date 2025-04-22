interface StatusHeaderProps {
  title: string;
  description: string;
}

export default function StatusHeader({
  title,
  description,
}: StatusHeaderProps) {
  return (
    <header>
      <h1 className="mb-2 text-2xl font-bold text-gray-900">{title}</h1>
      <p className="text-gray-600 mb-4">{description}</p>
    </header>
  );
}

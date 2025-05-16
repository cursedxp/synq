interface SectionTitleProps {
  title: string;
  description: string;
  h1ClassName?: string;
}

export default function SectionTitle({
  title,
  description,
  h1ClassName,
}: SectionTitleProps) {
  return (
    <div className={`flex flex-col  gap-2`}>
      <h1 className={`text-2xl font-semibold text-left ${h1ClassName}`}>
        {title}
      </h1>
      <p className="text-gray-500 mb-4">{description}</p>
    </div>
  );
}

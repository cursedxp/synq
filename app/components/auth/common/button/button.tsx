export default function Button({ children }: { children: React.ReactNode }) {
  return (
    <button
      type="submit"
      className="bg-black text-white p-2 rounded-md mt-2 cursor-pointer hover:scale-[101%] hover:shadow-xl transition-all duration-300 flex justify-center items-center"
    >
      {children}
    </button>
  );
}

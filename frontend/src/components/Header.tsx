import Login from "@/components/Login";

export default function Header() {
  return (
    <div className="fixed flex justify-between px-8 w-screen h-16 bg-gray-200 items-center border-b border-gray-300">
      <h1 className="font-bold text-2xl">Test App</h1>
      <div className="flex gap-3">
        <Login />
      </div>
    </div>
  );
}

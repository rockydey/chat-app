import Chat from "@/components/Chat/Chat";
import Image from "next/image";

export default function Home() {
  return (
    <main className='max-w-screen-lg mx-auto py-5 lg:py-12 h-screen overflow-y-hidden px-5 md:px-0'>
      <Chat />
    </main>
  );
}

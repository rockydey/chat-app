import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IoCallOutline } from "react-icons/io5";
import { CiVideoOn } from "react-icons/ci";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { FiPlusCircle } from "react-icons/fi";
import { FaRegFileCode } from "react-icons/fa";
import { MdAttachFile } from "react-icons/md";
import { IoMdSend } from "react-icons/io";

const ChatInterface = ({ activeChat }) => {
  const { receiver_name, receiver_img, sender_img, message } = activeChat;

  return (
    <div className='flex flex-col'>
      {/* Top Part */}
      <div className='p-4 border-b border-[#c7c7cea5] flex justify-between items-center'>
        <div className='flex items-center gap-4'>
          <div>
            <Image
              src={receiver_img}
              alt={receiver_name}
              width={100}
              height={100}
              className='w-10 h-10'
            />
          </div>
          <div>
            <h4 className='text-sm font-medium'>{receiver_name}</h4>
            <p className='text-xs'>
              Active {Math.ceil(Math.random() * 10)} mins ago
            </p>
          </div>
        </div>
        <div className='text-xl text-[#71717A] flex items-center gap-3'>
          <Link href='#'>
            <IoCallOutline />
          </Link>
          <Link href='#'>
            <CiVideoOn />
          </Link>
          <Link href='#'>
            <AiOutlineExclamationCircle />
          </Link>
        </div>
      </div>
      {/* Middle Part */}
      <div className='flex-1 overflow-x-hidden overflow-y-scroll'></div>
      {/* Bottom Part */}
      <div className='mt-4 px-4 py-2 flex items-center gap-3'>
        <div className='text-xl text-[#71717A] flex items-center gap-3'>
          <Link href='#'>
            <FiPlusCircle />
          </Link>
          <Link href='#'>
            <FaRegFileCode className='text-lg' />
          </Link>
          <Link href='#'>
            <MdAttachFile className='rotate-45' />
          </Link>
        </div>
        <div className='flex-1'>
          <input
            type='text'
            name=''
            id=''
            placeholder='Aa'
            className='w-full border border-[#dcdce1] outline-none py-1 px-5 rounded-full'
          />
        </div>
        <div>
          <button className='text-xl'>
            <IoMdSend />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;

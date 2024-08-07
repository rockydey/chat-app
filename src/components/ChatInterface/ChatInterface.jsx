"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { IoCallOutline } from "react-icons/io5";
import { CiVideoOn } from "react-icons/ci";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { FiPlusCircle } from "react-icons/fi";
import { FaRegFileCode } from "react-icons/fa";
import { MdAttachFile } from "react-icons/md";
import { IoMdSend } from "react-icons/io";

const ChatInterface = ({ activeChat, activeId }) => {
  const { receiver_name, receiver_img, sender_img, message } = activeChat[0];
  const [activeText, setActiveText] = useState(message);
  const chatRef = useRef(null);
  console.log(activeChat);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [activeText]);

  const handleText = (e) => {
    e.preventDefault();
    const form = e.target;

    const sender = form.inputText.value;
    const sms = {
      mgId: activeText.length + 1,
      sender,
    };

    setActiveText([...activeText, sms]);
    form.reset();
  };

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
      <div
        ref={chatRef}
        className='h-[450px] overflow-x-hidden overflow-y-auto'>
        {activeText.map((msg) => (
          <div key={msg.mgId} className=''>
            {msg.receiver && (
              <div className='flex items-center gap-3 p-4'>
                <div className=''>
                  <Image
                    src={receiver_img}
                    alt={receiver_name}
                    width={100}
                    height={100}
                    className='w-10 h-10'
                  />
                </div>
                <div className='lg:max-w-80 max-w-52 bg-[#F4F4F5] p-3 rounded'>
                  <p className='text-[13px]'>{msg.receiver}</p>
                </div>
              </div>
            )}
            {msg.sender && (
              <div className='flex items-center gap-3 justify-end p-4'>
                <div className='lg:max-w-80 max-w-52 bg-[#F4F4F5] p-3 rounded'>
                  <p className='text-[13px]'>{msg.sender}</p>
                </div>
                <div className=''>
                  <Image
                    src={sender_img}
                    alt=''
                    width={100}
                    height={100}
                    className='w-10 h-10 rounded-full'
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Bottom Part */}
      <div className='px-4 py-2 flex items-center gap-3'>
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
        <form onSubmit={handleText} className='flex-1 flex items-center gap-3'>
          <div className=' flex-1'>
            <input
              type='text'
              name='inputText'
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
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;

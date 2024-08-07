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
import { useFetchChatsQuery } from "@/redux/features/api/apiSlice";

function getCurrentTime() {
  const now = new Date();

  let hours = now.getHours();
  const minutes = now.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'

  const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;

  const currentTime = `${hours}:${formattedMinutes} ${ampm}`;

  return currentTime;
}

const ChatInterface = ({ activeId }) => {
  const { data: chats } = useFetchChatsQuery("chats.json");
  const [activeText, setActiveText] = useState([]);
  const { receiver_name, receiver_img, sender_img, message } = activeText;
  const chatRef = useRef(null);
  const [input, setInput] = useState([]);

  useEffect(() => {
    setActiveText(chats.find((chat) => chat.id === activeId));
    setInput([]);
  }, [activeId, chats]);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [activeText, input]);

  const handleText = (e) => {
    e.preventDefault();
    const form = e.target;

    const sender = form.inputText.value;

    setInput([...input, sender]);

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
        {message?.map((msg) => (
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
                <div>
                  <div className='lg:max-w-80 max-w-52 bg-[#F4F4F5] p-3 rounded'>
                    <p className='text-[13px]'>{msg.receiver}</p>
                  </div>
                  <p className='text-[10px] mt-[2px]'>{msg.receiver_time}</p>
                </div>
              </div>
            )}
            {msg.sender && (
              <div className='flex items-center gap-3 justify-end p-4'>
                <div>
                  <div className='lg:max-w-80 max-w-52 bg-[#F4F4F5] p-3 rounded'>
                    <p className='text-[13px]'>{msg.sender}</p>
                  </div>
                  <p className='text-[10px] mt-[2px] text-end'>
                    {msg.sender_time}
                  </p>
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
        {input.length !== 0 && (
          <div>
            {input.map((i, idx) => (
              <div
                key={idx}
                className='flex items-center gap-3 justify-end p-4'>
                <div>
                  <div className='lg:max-w-80 max-w-52 bg-[#F4F4F5] p-3 rounded'>
                    <p className='text-[13px]'>{i}</p>
                  </div>
                  <p className='text-[10px] mt-[2px] text-end'>{getCurrentTime()}</p>
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
            ))}
          </div>
        )}
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

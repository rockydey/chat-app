"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaGithub, FaRegEdit } from "react-icons/fa";
import ChatList from "../ChatList/ChatList";
import ChatInterface from "../ChatInterface/ChatInterface";
import { useFetchChatsQuery } from "@/redux/features/api/apiSlice";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import Image from "next/image";
import { RxDragHandleDots2 } from "react-icons/rx";

const Chat = () => {
  const { data: chats, isLoading } = useFetchChatsQuery("chats.json");
  const [activeId, setActiveId] = useState(1);
  const [showChat, setShowChat] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [forMobile, setForMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setForMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isLoading) {
    return (
      <p className='text-2xl text-center font-bold text-orange-500'>
        Loading...!
      </p>
    );
  }

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div className='flex justify-between items-center mb-5'>
        <h1 className='text-3xl font-bold text-[#926FF5]'>Chat App</h1>
        <Link
          href='https://github.com/rockydey077/chat-app'
          className='text-3xl text-[#71717A]'>
          <FaGithub />
        </Link>
      </div>
      <div className='flex border border-[#c7c7cea5] rounded-lg h-[500px] lg:h-[600px]'>
        <div
          className={`${showChat ? "hidden" : "inline-block"}  ${
            !isOpen ? "lg:min-w-80" : ""
          } p-4 flex-1 w-full lg:max-w-20 lg:border-r lg:border-[#c7c7cea5]`}>
          <div
            className={`${
              isOpen ? "hidden" : ""
            } flex justify-between items-center mb-5`}>
            <div>
              <h4 className='text-2xl font-medium'>
                Chats <span className='text-[#D7D4D8]'>({chats.length})</span>
              </h4>
            </div>
            <div className='flex items-center gap-4'>
              <Link href='#'>
                <HiOutlineDotsHorizontal className='text-xl' />
              </Link>
              <Link href='#'>
                <FaRegEdit className='text-xl' />
              </Link>
            </div>
          </div>
          <div className=''>
            {chats.map((chat) => (
              <div
                onClick={() => {
                  setActiveId(chat.id);
                  forMobile && setShowChat(true);
                }}
                key={chat.id}
                className={` ${
                  isOpen
                    ? "lg:bg-[#fff] lg:hover:bg-[#fff] duration-500"
                    : "flex items-center gap-6 lg:px-5 rounded-md duration-500"
                } ${
                  chat.id === activeId
                    ? "lg:bg-[#f9f9fa]"
                    : "lg:hover:bg-[#f1f1f3]"
                } py-4 cursor-pointer border-b border-[#c7c7ce] lg:border-none`}>
                <div>
                  <Image
                    src={chat.receiver_img}
                    alt={chat.receiver_name}
                    width={100}
                    height={100}
                    className='w-10 h-10'
                  />
                </div>
                <div className={`${isOpen && "hidden"} flex-1`}>
                  <h4 className='text-sm font-medium'>{chat.receiver_name}</h4>
                  <div className='flex justify-between items-center'>
                    <p className='text-xs text-[#c7c7ceb7]'>
                      {chat.message[chat.message.length - 1].receiver.slice(
                        0,
                        17
                      )}
                      ...
                    </p>
                    <p className='text-xs text-[#c7c7ceb7]'>
                      {chat.message[chat.message.length - 1].receiver_time}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className='w-[1px] hidden lg:block border-r border-[#c7c7cea5] relative'>
          <div
            onClick={toggleDrawer}
            className='absolute cursor-not-allowed top-1/2 -left-2 bg-[#c7c7cea5] p-[1px] rounded-sm lg:cursor-pointer'>
            <RxDragHandleDots2 className='text-xs' />
          </div>
        </div>
        <div
          className={`${
            showChat ? "inline-block w-full" : "hidden"
          } lg:inline-block lg:max-w-[940px] lg:min-w-[700px] flex-1`}>
          <ChatInterface setShowChat={setShowChat} activeId={activeId} />
        </div>
      </div>
      <div className='text-sm font-normal text-[#71717A] flex flex-col lg:flex-row gap-2 justify-between items-center mt-5'>
        <p>
          Build by <span className='font-semibold'>Rocky Dey</span>.
        </p>
        <p>
          Source code available on{" "}
          <Link
            className='font-semibold'
            href='https://github.com/rockydey077/chat-app'>
            GitHub
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default Chat;

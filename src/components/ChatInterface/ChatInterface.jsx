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
import { RxCrossCircled } from "react-icons/rx";

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
  const [file, setFile] = useState([]);
  const [display, setDisplay] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setActiveText(chats.find((chat) => chat.id === activeId));
    setInput([]);
    setDisplay([]);
  }, [activeId, chats]);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [activeText, input, display]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleText = (e) => {
    e.preventDefault();
    const form = e.target;

    if (form.inputText !== undefined) {
      const sender = form.inputText.value;
      setInput([...input, sender]);
      form.reset();
    }
    if (file.length) {
      setDisplay(file);
      setFile([]);
    }
  };

  const handleFile = (e) => {
    const newFiles = Array.from(e.target.files);
    setFile((prevFiles) => [...prevFiles, ...newFiles]);
  };

  function deleteFile(e) {
    const s = file.filter((item, index) => index !== e);
    setFile(s);
  }

  return (
    <div className='flex flex-col justify-between h-full'>
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
        className={`h-[450px] overflow-x-hidden overflow-y-auto`}>
        {message?.map((msg) => (
          <div key={msg.mgId} className=''>
            {msg.receiver && (
              <div className='flex items-end gap-3 p-4'>
                <div className='mb-[6px]'>
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
                  <p className='text-[10px] mt-[2px] pl-2'>
                    {msg.receiver_time}
                  </p>
                </div>
              </div>
            )}
            {msg.sender && (
              <div className='flex items-end gap-3 justify-end p-4'>
                <div>
                  <div className='lg:max-w-80 max-w-52 bg-[#F4F4F5] p-3 rounded'>
                    <p className='text-[13px]'>{msg.sender}</p>
                  </div>
                  <p className='text-[10px] mt-[2px] text-end pr-2'>
                    {msg.sender_time}
                  </p>
                </div>
                <div className='mb-[6px]'>
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
        {display.length !== 0 && (
          <div>
            {display.map((item, index) => {
              return (
                <div
                  key={index}
                  className='flex items-end gap-3 justify-end p-4'>
                  <div>
                    <div>
                      <Image
                        className='w-40 rounded'
                        width={200}
                        height={200}
                        alt=''
                        src={URL.createObjectURL(item)}
                      />
                    </div>
                    <p className='text-[10px] mt-[2px] text-end pr-2'>
                      {getCurrentTime()}
                    </p>
                  </div>
                  <div className='mb-[6px]'>
                    <Image
                      src={sender_img}
                      alt=''
                      width={100}
                      height={100}
                      className='w-10 h-10 rounded-full'
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
        {input[0] !== "" && input.length !== 0 && (
          <div>
            {input.map((i, idx) => (
              <div key={idx} className='flex items-end gap-3 justify-end p-4'>
                <div>
                  <div className='lg:max-w-80 max-w-52 bg-[#F4F4F5] p-3 rounded'>
                    <p className='text-[13px]'>{i}</p>
                  </div>
                  <p className='text-[10px] mt-[2px] text-end pr-2'>
                    {getCurrentTime()}
                  </p>
                </div>
                <div className='mb-[6px]'>
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
      <div className='pt-2 lg:pl-24 lg:pr-14'>
        {file.length !== 0 && (
          <div
            className={`${
              !isMobile &&
              file.length > 6 &&
              "overflow-x-hidden overflow-y-scroll"
            } ${
              isMobile &&
              file.length > 3 &&
              "overflow-x-hidden overflow-y-scroll"
            }  w-full py-1 px-5`}>
            <div className='flex flex-wrap gap-3 h-[43px]'>
              {file.map((item, index) => {
                return (
                  <div key={index} className='relative w-fit h-fit'>
                    <Image
                      className='w-16 rounded'
                      width={200}
                      height={200}
                      alt=''
                      src={URL.createObjectURL(item)}
                    />
                    <button
                      onClick={() => deleteFile(index)}
                      type='button'
                      className='absolute top-0 bg-white left-0 shadow-md bg-color7 text-color5 rounded-full'>
                      <RxCrossCircled className='text-base' />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
      <div className='px-4 py-2 flex items-center gap-3'>
        <div className='text-xl text-[#71717A] flex items-center gap-3'>
          <Link href='#'>
            <FiPlusCircle />
          </Link>
          <Link href='#'>
            <FaRegFileCode className='text-lg' />
          </Link>
          {/* <Link href='#'>
            <MdAttachFile className='rotate-45' />
          </Link> */}
          <div>
            <input
              onChange={handleFile}
              type='file'
              multiple
              style={{ display: "none" }}
              id='file'
            />
            <label className='cursor-pointer' htmlFor='file'>
              <MdAttachFile className='rotate-45' />
            </label>
          </div>
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

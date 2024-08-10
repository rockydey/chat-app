"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { IoCallOutline } from "react-icons/io5";
import { CiVideoOn } from "react-icons/ci";
import { AiOutlineAudio, AiOutlineExclamationCircle } from "react-icons/ai";
import { FiPlusCircle } from "react-icons/fi";
import { FaRegFileCode } from "react-icons/fa";
import {
  MdAttachFile,
  MdDownload,
  MdOutlineFileDownload,
} from "react-icons/md";
import { IoMdSend } from "react-icons/io";
import { useFetchChatsQuery } from "@/redux/features/api/apiSlice";
import { RxCrossCircled } from "react-icons/rx";
import { FaArrowLeft } from "react-icons/fa6";
import Modal from "react-modal";
import styles from "./ChatInterface.module.css";
import { BsFileEarmarkPdf } from "react-icons/bs";
import PdfPreview from "../PdfPreview/PdfPreview";

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

const conversation = [
  {
    id: 1,
    message: [
      {
        mgId: 1,
        sender: "Hey, do you have any plans for the weekend?",
        receiver: "Not yet. I was thinking of going hiking. Want to join?",
        sender_time: "11.00 AM",
        receiver_time: "11.02 AM",
      },
      {
        mgId: 2,
        sender: "That sounds fun! Where are you planning to go?",
        receiver:
          "I was thinking about the trails at Green Mountain. The view is amazing there.",
        sender_time: "11.04 AM",
        receiver_time: "11.06 AM",
      },
      {
        mgId: 3,
        sender: "Have you tried that new cafe downtown?",
        receiver: "Not yet. Is it good?",
        sender_time: "11.08 AM",
        receiver_time: "11.10 AM",
      },
      {
        mgId: 4,
        sender:
          "Yeah, their coffee is excellent, and the pastries are to die for.",
        receiver: "Great! Let's go there for brunch tomorrow.",
        sender_time: "11.12 AM",
        receiver_time: "11.14 AM",
      },
      {
        mgId: 5,
        sender: "Did you finish the book I lent you?",
        receiver: "Yes, I loved it! The plot twist at the end was incredible.",
        sender_time: "11.16 AM",
        receiver_time: "11.18 AM",
      },
      {
        mgId: 6,
        sender: "What did you think of the movie last night?",
        receiver: "It was okay, but I felt like the ending was a bit rushed.",
        sender_time: "11.20 AM",
        receiver_time: "11.22 AM",
      },
      {
        mgId: 7,
        sender: "Are you coming to the party on Friday?",
        receiver: "I wouldn't miss it! What time does it start?",
        sender_time: "11.24 AM",
        receiver_time: "11.26 AM",
      },
      {
        mgId: 8,
        receiver: "Not yet. No spoilers, please!",
        receiver_time: "11.28 AM",
      },
    ],
  },
  {
    id: 2,
    message: [
      {
        mgId: 1,
        sender: "How was your trip to Japan?",
        receiver:
          "It was amazing! The food, the culture, everything was wonderful.",
        sender_time: "12.00 PM",
        receiver_time: "12.02 PM",
      },
      {
        mgId: 2,
        sender: "I have always wanted to visit. Did you take lots of pictures?",
        receiver: "Yes, I took hundreds! I'll show you some later.",
        sender_time: "12.04 PM",
        receiver_time: "12.06 PM",
      },
      {
        mgId: 3,
        sender: "Are you free to catch up this week?",
        receiver: "Yes, I am. How about Thursday evening?",
        sender_time: "12.08 PM",
        receiver_time: "12.10 PM",
      },
      {
        mgId: 4,
        sender: "Thursday works for me. Let us meet at the usual spot.",
        receiver: "Sounds good. Looking forward to it!",
        sender_time: "12.12 PM",
        receiver_time: "12.14 PM",
      },
      {
        mgId: 5,
        sender: "What did you think of the game last night?",
        receiver: "It was intense! The final score was so close.",
        sender_time: "12.16 PM",
        receiver_time: "12.18 PM",
      },
      {
        mgId: 6,
        receiver: "Same here. Can't wait for the next match.",
        receiver_time: "12.20 PM",
      },
    ],
  },
  {
    id: 3,
    message: [
      {
        mgId: 1,
        sender: "Have you decided on the theme for the party?",
        receiver: "Yes, we're going with a tropical theme this year.",
        sender_time: "10.00 PM",
        receiver_time: "10.02 PM",
      },
      {
        mgId: 2,
        sender:
          "That sounds exciting! Do you need any help with the decorations?",
        receiver: "Actually, yes. Could you help me with the centerpieces?",
        sender_time: "10.04 PM",
        receiver_time: "10.06 PM",
      },
      {
        mgId: 3,
        sender: "Of course! Just let me know what you need.",
        receiver: "Thanks! I'll send you a list later.",
        sender_time: "10.08 PM",
        receiver_time: "10.10 PM",
      },
      {
        mgId: 4,
        sender: "Have you seen the latest art exhibit at the gallery?",
        receiver: "Not yet. Is it worth checking out?",
        sender_time: "10.12 PM",
        receiver_time: "10.14 PM",
      },
      {
        mgId: 5,
        receiver: "I will make sure to visit this weekend.",
        receiver_time: "10.16 PM",
      },
    ],
  },
  {
    id: 4,
    message: [
      {
        mgId: 1,
        sender: "Did you hear about the new restaurant opening?",
        receiver: "Yes! I've heard their menu is really unique.",
        sender_time: "10.00 AM",
        receiver_time: "10.02 AM",
      },
      {
        mgId: 2,
        sender: "I think we should try it out this weekend.",
        receiver: "I'm in! Let's make a reservation.",
        sender_time: "10.04 AM",
        receiver_time: "10.06 AM",
      },
      {
        mgId: 3,
        sender: "How is your project at work going?",
        receiver: "It's going well, but there is still a lot to do.",
        sender_time: "10.08 AM",
        receiver_time: "10.10 AM",
      },
      {
        mgId: 4,
        sender: "Let me know if you need any help. I am always here to assist.",
        receiver: "Thanks, I appreciate it! I might take you up on that.",
        sender_time: "10.12 AM",
        receiver_time: "10.14 AM",
      },
      {
        mgId: 5,
        receiver: "Yes, I'm really looking forward to it. Can't wait!",
        receiver_time: "10.16 AM",
      },
    ],
  },
];

const ChatInterface = ({ setShowChat, forMobile, activeId }) => {
  const { data: chats } = useFetchChatsQuery("chats.json");
  const [message, setMessage] = useState([]);
  const [activeText, setActiveText] = useState([]);
  const { receiver_name, receiver_img, sender_img } = activeText;
  const chatRef = useRef(null);
  const [input, setInput] = useState([]);
  const [file, setFile] = useState([]);
  const [display, setDisplay] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [openTooltip, setOpenTooltip] = useState(false);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [modalImage, setModalImage] = useState(null);
  const [buttonAnimation, setButtonAnimation] = useState("");
  const [pdfUrl, setPdfUrl] = useState(null);

  useEffect(() => {
    setMessage(conversation.find((c) => c.id === activeId).message);
  }, [activeId]);

  useEffect(() => {
    setActiveText(chats.find((chat) => chat.id === activeId));
    setInput([]);
    setDisplay([]);
  }, [activeId, chats]);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [activeText, input, display, message]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const customStyles = {
    overlay: {
      backgroundColor: "#000000cc",
    },
    content: {
      width: isMobile && "65%",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      // marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      padding: "0px",
      border: "0px",
    },
  };

  const handleText = (e) => {
    e.preventDefault();
    const form = e.target;
    const sender = form.inputText.value;

    const activeMessage = [...message];

    if (sender !== "" && file.length) {
      const newMessage = {
        mgId: message.length + 1,
        sender: sender,
        sender_time: getCurrentTime(),
        image: [...file],
      };
      setMessage([...activeMessage, newMessage]);
      setFile([]);
      form.reset();
    } else if (sender === "" && file.length) {
      const newMessage = {
        mgId: message.length + 1,
        sender_time: getCurrentTime(),
        sender: "",
        image: [...file],
      };
      setMessage([...activeMessage, newMessage]);
      setFile([]);
    } else if (sender !== "" && !file.length) {
      const newMessage = {
        mgId: message.length + 1,
        sender: sender,
        sender_time: getCurrentTime(),
        image: [],
      };
      setMessage([...message, newMessage]);
      form.reset();
    }
  };

  const handleFile = (e) => {
    setOpenTooltip(false);
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length <= 5) {
      const newFiles = selectedFiles.map((file) => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            resolve({
              name: file.name,
              type: file.type,
              data: e.target.result,
            });
          };
          if (
            file.type.startsWith("image/") ||
            file.type.startsWith("video/")
          ) {
            reader.readAsDataURL(file);
          } else if (file.type === "application/pdf") {
            reader.readAsArrayBuffer(file);
          }
        });
      });

      Promise.all(newFiles).then((newFilesData) => {
        setFile((prevFiles) => [...prevFiles, ...newFilesData]);
      });
    } else {
      alert("Maximum 5 file only");
    }
  };

  function deleteFile(e) {
    const s = file.filter((item, index) => index !== e);
    setFile(s);
  }

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
    if (pdfUrl) {
      URL.revokeObjectURL(pdfUrl);
    }
  }

  const handleButtonClick = (callback) => {
    setButtonAnimation(styles.bounce);
    setTimeout(() => {
      setButtonAnimation("");
      callback();
    }, 500);
  };

  function downloadPDF(arrayBuffer, name) {
    const blob = new Blob([arrayBuffer], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  const previewPdf = (arrayBuffer) => {
    setModalImage(null);
    const blob = new Blob([arrayBuffer], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    setPdfUrl(url);
    setIsOpen(true);
  };

  return (
    <div className='flex flex-col justify-between h-full'>
      {/* Top Part */}
      <div className='p-4 border-b border-[#c7c7cea5] flex justify-between items-center'>
        <div className='flex items-center gap-4'>
          <div onClick={() => setShowChat(false)} className='lg:hidden'>
            <FaArrowLeft />
          </div>
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
                  <div className='bg-[#F4F4F5] p-3 rounded max-w-60 lg:max-w-80'>
                    <p className='text-[13px]'>{msg.receiver}</p>
                  </div>
                  <p className='text-[10px] mt-[2px] pl-2'>
                    {msg.receiver_time}
                  </p>
                </div>
              </div>
            )}
            {(msg.sender === "" || msg.sender) && (
              <div className='flex items-end gap-3 justify-end p-4'>
                <div>
                  <div
                    className={`${
                      msg?.image?.length > 1
                        ? msg?.image?.find(
                            (img) => img.type === "application/pdf"
                          )
                          ? "space-y-[2px]"
                          : "grid grid-cols-2 gap-[2px]"
                        : ""
                    } max-w-60 lg:max-w-80`}>
                    {msg?.image?.map((item, index) => {
                      return (
                        <div key={index}>
                          {item.type.startsWith("image/") && (
                            <div>
                              <div className='group relative w-full'>
                                <Image
                                  className='rounded cursor-pointer w-full object-cover transition duration-300 ease-in-out'
                                  width={200}
                                  height={200}
                                  alt=''
                                  src={item.data}
                                />
                                <div
                                  onClick={() => {
                                    setPdfUrl(null);
                                    openModal();
                                    setModalImage(item.data);
                                  }}
                                  class='absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition duration-300 ease-in-out cursor-pointer'></div>
                              </div>
                            </div>
                          )}
                          {item.type.startsWith("video/") && (
                            <video
                              src={item.data}
                              controls
                              style={{ width: "100%", cursor: "pointer" }}
                            />
                          )}
                          {item.type === "application/pdf" && (
                            <div
                              onClick={() => previewPdf(item.data)}
                              className='flex border-2 border-red-500 cursor-pointer items-center gap-3 bg-[#F4F4F5] p-3 rounded max-w-60 lg:max-w-80'>
                              <div className='flex items-center gap-2 text-lg font-medium text-slate-600'>
                                <BsFileEarmarkPdf className='text-red-500' />
                                <p className='text-[13px]'>
                                  {item.name.length > 20
                                    ? item.name.slice(0, 20)
                                    : item.name}
                                  {item.name.length > 20 && "..."}
                                </p>
                              </div>
                              <button
                                onClick={(e) => {
                                  downloadPDF(item.data, item.name);
                                  e.stopPropagation();
                                }}
                                type='button'
                                className='shadow bg-color7 text-color5 rounded-full'>
                                <MdDownload className='text-lg' />
                              </button>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  <div
                    className={`${
                      msg.sender &&
                      " bg-[#F4F4F5] p-3 rounded max-w-60 lg:max-w-80"
                    }`}>
                    <p className={`text-[13px]`}>{msg.sender}</p>
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
      </div>

      {/* Bottom Part */}
      <div className='lg:pl-[125px] lg:pr-16'>
        {file.length !== 0 && (
          <div
            className={`${
              isMobile &&
              file.length > 1 &&
              "overflow-x-hidden overflow-y-scroll h-14"
            }  bg-slate-200 px-2 rounded-sm w-full`}>
            <div className='flex flex-wrap gap-3 h-14 items-center'>
              {file.map((item, index) => {
                return (
                  <div key={index}>
                    {item.type.startsWith("image/") && (
                      <div className='relative w-fit'>
                        <Image
                          className='h-10 w-auto rounded'
                          width={200}
                          height={200}
                          alt=''
                          src={item.data}
                        />
                        <button
                          onClick={() => deleteFile(index)}
                          type='button'
                          className='absolute top-0 bg-white left-0 shadow-md bg-color7 text-color5 rounded-full'>
                          <RxCrossCircled className='text-base' />
                        </button>
                      </div>
                    )}
                    {item.type.startsWith("video/") && (
                      <div className='relative w-fit'>
                        <video
                          src={item.data}
                          controls
                          style={{
                            width: "auto",
                            height: "40px",
                            cursor: "pointer",
                          }}
                        />
                        <button
                          onClick={() => deleteFile(index)}
                          type='button'
                          className='absolute top-0 bg-white left-0 shadow-md bg-color7 text-color5 rounded-full'>
                          <RxCrossCircled className='text-base' />
                        </button>
                      </div>
                    )}
                    {item.type === "application/pdf" && (
                      <div className='flex items-center gap-2 p-1 border border-red-500 rounded-[3px]'>
                        <div className='flex items-center gap-2 text-base font-medium text-slate-600'>
                          <BsFileEarmarkPdf className='text-red-500' />
                          <p className='text-sm'>
                            {item.name.length > 15
                              ? item.name.slice(0, 15)
                              : item.name}
                            {item.name.length > 15 && "..."}
                          </p>
                        </div>
                        <button
                          onClick={() => deleteFile(index)}
                          type='button'
                          className=' bg-white shadow-md bg-color7 text-color5 rounded-full'>
                          <RxCrossCircled className='text-base text-red-500' />
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
      <div className='px-4 relative pb-2 flex items-center gap-3'>
        {forMobile ? (
          <div>
            {openTooltip && (
              <div className='text-xl -top-[46px] left-0 p-3 text-[#71717A] flex items-center gap-3 absolute bg-slate-100 shadow rounded-sm'>
                <Link href='#'>
                  <AiOutlineAudio />
                </Link>
                <Link href='#'>
                  <FaRegFileCode className='text-lg' />
                </Link>
                <div>
                  <input
                    onChange={handleFile}
                    type='file'
                    accept='image/*,video/*,application/pdf'
                    disabled={file.length === 5}
                    multiple
                    style={{ display: "none" }}
                    id='file'
                  />
                  <label className='cursor-pointer' htmlFor='file'>
                    <MdAttachFile className='rotate-45' />
                  </label>
                </div>
              </div>
            )}
            <Link
              onClick={() => setOpenTooltip(!openTooltip)}
              href='#'
              className='text-xl text-[#71717A]'>
              <FiPlusCircle />
            </Link>
          </div>
        ) : (
          <div className='text-xl text-[#71717A] flex items-center gap-3'>
            <Link href='#'>
              <FiPlusCircle />
            </Link>
            <Link href='#'>
              <FaRegFileCode className='text-lg' />
            </Link>
            <div>
              <input
                onChange={handleFile}
                type='file'
                accept='image/*,video/*,application/pdf'
                disabled={file.length === 5}
                multiple
                style={{ display: "none" }}
                id='file'
              />
              <label className='cursor-pointer' htmlFor='file'>
                <MdAttachFile className='rotate-45' />
              </label>
            </div>
          </div>
        )}
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

      {/* View Image */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel='Example Modal'>
        {modalImage && (
          <div className='relative'>
            <div className=' absolute lg:right-5 right-2 lg:top-5 top-2 space-x-3'>
              <button
                className={`${buttonAnimation} ${styles.button_shadow} text-xl lg:text-2xl bg-slate-50 text-slate-800 shadow-2xl border border-orange-500 p-[3px] rounded-full`}>
                <a
                  href={modalImage}
                  download='image.jpg'
                  onClick={(e) => {
                    e.stopPropagation();
                    handleButtonClick(() => {});
                  }}>
                  <MdOutlineFileDownload />
                </a>
              </button>
              <button
                onClick={() => closeModal()}
                className={`${styles.button_shadow} focus:animate-ping duration-500 text-xl lg:text-2xl shadow-2xl border bg-slate-50 border-orange-500 p-1 rounded-full text-slate-800`}>
                <RxCrossCircled />
              </button>
            </div>
            <div>
              <Image
                className='lg:h-[75vh] lg:w-auto w-full'
                width={200}
                height={200}
                alt=''
                src={modalImage}
              />
            </div>
          </div>
        )}
        {pdfUrl && (
          <iframe
            src={pdfUrl}
            className='lg:h-[600px] lg:w-[600px] h-[500px] w-full'
            style={{ border: "none" }}></iframe>
        )}
        {/* {pdfUrl && <PdfPreview fileUrl={pdfUrl} />} */}
      </Modal>
    </div>
  );
};

export default ChatInterface;

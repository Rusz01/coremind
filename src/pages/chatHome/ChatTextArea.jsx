import React from 'react'
import { Border_Card } from '../../components';
import { FiSend } from "react-icons/fi";
import TextArea from './Textarea';

function ChatTextArea() {
  return (
    <Border_Card>
               <div className='overflow-y-auto'>
            <div className="flex items-end justify-between text-lg px-2">
               <TextArea />
               <FiSend className='cursor-pointer w-6 h-6' />
            </div>
            </div>
            </Border_Card>
  )
}

export default ChatTextArea
import React from 'react'

interface IMsgProps {
    date: string,
    type: string,
    msg: string,
    isNotClientMsg: Boolean
}

const Message: React.FC<IMsgProps> = ({ date, type, msg, isNotClientMsg }) => {

    (msg.length > 26) && (msg = `${msg.slice(0, 26).trim()}...`)   // форматирование сообщения

    const convertedDate = (dateString: string): string => {         // форматирование даты сообщения
        const date = new Date(dateString);
        return `${date.getDate()}.${(date.getMonth() + 1) >= 10 ? date.getMonth(): '0' + (date.getMonth() + 1)}.${date.getFullYear()}`
    }

    return (
        <div className={isNotClientMsg ? 'message' : 'message client-msg'}>
            <span className='message-date'>{ convertedDate(date) }</span>
            <span className='message-type'>{ type }</span>
            <span className='message-text'>{ msg }</span>
        </div>
    )
}

export default Message;


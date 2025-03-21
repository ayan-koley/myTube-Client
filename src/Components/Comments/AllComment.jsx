import React from 'react'
import UserAvatar from '../UserAvatar'
import { formatTime } from '../../Utils/utilsFunc'

function AllComment({comments = []}) {
  return (
    <div className='px-5'>
        {comments?.map((item) => (
            <article className="p-6 text-base bg-white rounded-lg dark:bg-gray-900 mb-2" key={item._id}>
                <footer className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                        <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                        <UserAvatar
                                className="mr-2 w-6 h-6 rounded-full"
                                src={item.owner_details.avatar.url}
                                 />
                                {item.owner_details.fullname}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            <time pubdate datetime="">
                                {formatTime(item.createdAt)}
                            </time>
                        </p>
                    </div>
                </footer>
            <p className="text-gray-500 dark:text-gray-400">{item.content}</p>
        </article>
        ))}
      
    </div>
  )
}

export default AllComment
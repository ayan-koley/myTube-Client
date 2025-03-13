import React from 'react'

function AllComment({comments = []}) {
    console.log(comments);
  return (
    <div className='mx-5'>
        {comments.map((item) => (
            <div key={item._id} className=' w-full md:w-2/3 p-5  bg-gray-200 shadow-xl border border-gray-800 rounded-xl hover:shadow-2xl my-2'>
                <div>{item.content}</div>
            </div>
        ))}
    </div>
  )
}

export default AllComment
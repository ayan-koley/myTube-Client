import React from 'react'
import { PaginationComponent, SearchedVideo } from '../Components'

function SearchedVideoPage() {
  return (
    <div>
        <SearchedVideo />
        <div className='py-8 flex justify-center items-center'>
          <PaginationComponent />
        </div>
    </div>
  )
}

export default SearchedVideoPage
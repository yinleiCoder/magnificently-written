import React from 'react'

// 视频教程布局
function VideosLayout({children} : {children: React.ReactNode}) {
  return (
    <div className='h-full flex flex-col'>{children}</div>
  )
}

export default VideosLayout
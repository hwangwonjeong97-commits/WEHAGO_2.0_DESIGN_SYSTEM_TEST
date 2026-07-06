import React from 'react'

export default function IcT({ width = 24, height = 24, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M16 6.75C16.6904 6.75 17.25 7.30964 17.25 8C17.25 8.69036 16.6904 9.25 16 9.25H13.25V16C13.25 16.6904 12.6904 17.25 12 17.25C11.3096 17.25 10.75 16.6904 10.75 16V9.25H8C7.30964 9.25 6.75 8.69036 6.75 8C6.75 7.30964 7.30964 6.75 8 6.75H16Z" fill="currentColor"/><path fillRule="evenodd" clipRule="evenodd" d="M18.0498 3C19.679 3 21 4.32096 21 5.9502V18.0498C21 19.679 19.679 21 18.0498 21H5.9502C4.32096 21 3 19.679 3 18.0498V5.9502C3 4.32096 4.32096 3 5.9502 3H18.0498ZM5.9502 4.5C5.14938 4.5 4.5 5.14938 4.5 5.9502V18.0498C4.5 18.8506 5.14938 19.5 5.9502 19.5H18.0498C18.8506 19.5 19.5 18.8506 19.5 18.0498V5.9502C19.5 5.14938 18.8506 4.5 18.0498 4.5H5.9502Z" fill="currentColor"/>
    </svg>
  )
}

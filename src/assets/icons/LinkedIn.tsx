import * as React from "react"

interface LinkedInIconProps {
  size?: number
  colorFill?: string
}

const LinkedInIcon = (props: LinkedInIconProps) => {
  const { size = 34, colorFill = '#000' } = props

  return (
    <svg
      height={size}
      width={size}
      xmlSpace="preserve"
      viewBox="0 0 67 67"
    >
      <path
        d="M50.837 48.137V36.425c0-6.275-3.35-9.195-7.816-9.195-3.604 0-5.219 1.983-6.119 3.374V27.71h-6.79c.09 1.917 0 20.427 0 20.427h6.79V36.729c0-.609.044-1.219.224-1.655.49-1.22 1.607-2.483 3.482-2.483 2.458 0 3.44 1.873 3.44 4.618v10.929h6.789zM22.959 24.922c2.367 0 3.842-1.57 3.842-3.531-.044-2.003-1.475-3.528-3.797-3.528s-3.841 1.524-3.841 3.528c0 1.961 1.474 3.531 3.753 3.531h.043zM34 64C17.432 64 4 50.568 4 34 4 17.431 17.432 4 34 4s30 13.431 30 30c0 16.568-13.432 30-30 30zm-7.646-15.863V27.71h-6.789v20.427h6.789z"
        style={{
          fillRule: "evenodd",
          clipRule: "evenodd",
          fill: colorFill,
        }}
      />
    </svg>
  )
}

export default LinkedInIcon
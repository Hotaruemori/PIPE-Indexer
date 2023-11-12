import React, {useState, useEffect} from 'react'
import DarkModeToggle from 'react-dark-mode-toggle'

const DarkModeSwitcher = () => {
  const [theme, setTheme] = useState("light")
  const colorTheme = theme === 'dark' ? 'light' : 'dark'
  const [darkSide, setDarkSide] = useState(colorTheme === 'light' ? true : false)

  const useDarkSide = () => {
    const root = window.document.documentElement
    const colorTheme = theme === 'dark' ? 'light' : 'dark'
    root.classList.remove(theme)
    root.classList.add(colorTheme)
    window.document.body.classList.remove(theme)
    window.document.body.classList.add(colorTheme)

    // save theme to local storage
    localStorage.setItem('theme', colorTheme)
    setTheme(colorTheme)
  }

  const toggleDarkMode = (checked:boolean) => {
    useDarkSide()
    setDarkSide(checked)
  }

  return (
    <DarkModeToggle checked={darkSide} onChange={e => toggleDarkMode(!darkSide)} size={50}/>
  )
}

export default DarkModeSwitcher
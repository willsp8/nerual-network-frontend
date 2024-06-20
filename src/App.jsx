import { useEffect, useState, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'
import Select from 'react-select'
import {createBrowserRouter, BrowserRouter, Route, Router, Routes, createRoutesFromElements, Outlet, RouterProvider } from 'react-router-dom'
import { NavBar } from './NavBar'
import { ChatRoom } from './pages/ChatRoom'
import { Profile } from './pages/Profile'
import { ProfileSetting } from './pages/ProfileSetting'
import Dashboard from './pages/Dashboard'
import Home from './pages/Home'
import About from './pages/About'
import { Fragment } from 'react'
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import NeuralNetwork from './pages/NeuralNetwork'



function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
    },
    {
      path: "/chatRoom",
      element: <ChatRoom/>,
    },
    {
      path: "/profile",
      element: <Profile/>,
    },
    ,
    {
      path: "/setting",
      element: <ProfileSetting/>,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
    },
    {
      path: "/about",
      element: <About />,
    },
    {
      path: "/network",
      element: <NeuralNetwork/>
    }
  ])
  

  return (
    
    <div> 
      
      
      <RouterProvider router={router}>
      
       
      </RouterProvider>
      

   
    
    </div>
  )
}

const Root =() => {
  const navigation = [
    { name: 'Dashboard', href: '#', current: true },
    { name: 'Team', href: '#', current: false },
    { name: 'Projects', href: '#', current: false },
    { name: 'Calendar', href: '#', current: false },
  ]
  
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
  
  return <>
    <NavBar></NavBar>
  <Home></Home>
  </>
  
  
}

export default App

'use client';
// import React from 'react'
import React, { useEffect, useState } from 'react'
import TablePage from './table/page';
import AddItemButton from './component/button'; // เปลี่ยนชื่อตามมาตรฐาน Reac
import { useRouter } from 'next/navigation';
export default function Home() {



  
  return (
   <>
{/* <AddItemButton></AddItemButton> */}
   <TablePage></TablePage>
   </>


   
  );
}
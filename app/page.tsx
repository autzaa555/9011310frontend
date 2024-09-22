'use client'; 
// คำสั่ง 'use client' ใช้ใน Next.js เพื่อระบุว่าฟังก์ชันนี้จะถูกรันในฝั่ง client (ไม่ใช่ server)

import React, { useEffect, useState } from 'react';
// นำเข้า React และ hooks `useEffect` และ `useState` ซึ่งเป็นเครื่องมือในการจัดการกับ state และ side effects ใน component

import TablePage from './table/page';
// นำเข้า component `TablePage` จากตำแหน่ง `./table/page` ซึ่งอาจเป็นตารางสำหรับแสดงข้อมูลในหน้า

import AddItemButton from './component/button'; 
// นำเข้า component `AddItemButton` ซึ่งอาจเป็นปุ่มสำหรับเพิ่มรายการในตาราง (ควรตรวจสอบการใช้งานชื่อ)

import { useRouter } from 'next/navigation';
// นำเข้า hook `useRouter` จาก Next.js สำหรับใช้ในการนำทางระหว่างหน้าเว็บ

export default function Home() {
  // สร้างฟังก์ชัน `Home` ซึ่งเป็น component หลักสำหรับหน้า Home page

  return (
   <>
     {/* แสดงผล component TablePage */}
     <TablePage></TablePage>
   </>
  );
}

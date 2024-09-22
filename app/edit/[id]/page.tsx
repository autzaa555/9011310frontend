'use client'; 
// คำสั่ง 'use client' ใช้ใน Next.js เพื่อระบุว่าฟังก์ชันนี้จะถูกรันในฝั่ง client

import React, { useState, useEffect } from 'react'; 
// นำเข้า React และ hooks `useState` และ `useEffect` สำหรับจัดการกับ state และ side effects

import axios from 'axios'; 
// นำเข้า axios สำหรับการทำคำขอ HTTP

import { useRouter, useParams } from 'next/navigation'; 
// นำเข้า hooks `useRouter` และ `useParams` จาก Next.js สำหรับการนำทางและรับพารามิเตอร์จาก URL

interface Item {
  id: number; 
  title: string; 
  price: number; 
  quantity: number; 
  status: string; 
  owner_id: number; 
} 
// กำหนดประเภทข้อมูลของ item

export default function Edit() {
  const router = useRouter(); // ใช้ useRouter สำหรับการนำทาง
  const params = useParams(); // รับพารามิเตอร์จาก URL
  const id = params?.id; // ใช้ useParams เพื่อรับ ID

  const [item, setItem] = useState<Item | null>(null); // State สำหรับเก็บข้อมูล item
  const [error, setError] = useState<string | null>(null); // State สำหรับเก็บข้อความแสดงข้อผิดพลาด

  useEffect(() => {
    const fetchItem = async () => { // ฟังก์ชันสำหรับดึงข้อมูล item
      if (!id) return; // ถ้าไม่มี ID ให้หยุดทำงาน

      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/items/${id}`); // ทำคำขอ GET
        setItem(response.data); // ตั้งค่า item ด้วยข้อมูลที่ดึงมา
        console.log('Fetched item data:', response.data); // แสดงข้อมูลที่ดึงมาใน console
      } catch (error) {
        console.error('Error fetching item data:', error); // แสดงข้อผิดพลาดใน console
        setError('Failed to fetch item data.'); // ตั้งค่าข้อความแสดงข้อผิดพลาด
      }
    };

    fetchItem(); // เรียกใช้ฟังก์ชันดึงข้อมูล
  }, [id]); // ใช้ effect เมื่อ ID เปลี่ยนแปลง

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target; // รับชื่อและค่าจาก input
    // แปลงค่าเป็นประเภทที่ถูกต้องตามชื่อ field
    const parsedValue = name === 'price' ? parseFloat(value) : name === 'quantity' ? parseInt(value) : value; 
    setItem(prevItem => prevItem ? { ...prevItem, [name]: parsedValue } : null); // ตั้งค่า item ใหม่
  };

  const handleEditItem = async () => {
    // ตรวจสอบว่าทุกฟิลด์ถูกกรอกหรือไม่
    if (!item || !item.title || item.price === undefined || item.quantity === undefined) {
      alert('Please fill in all fields.'); // แจ้งเตือนถ้าฟิลด์ไม่ครบ
      return;
    }

    try {
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/items/${id}`, item); // ทำคำขอ PUT เพื่อตั้งค่า item
      router.push('/'); // นำทางกลับไปยังหน้าแรก
    } catch (error) {
      console.error('Error updating item:', error); // แสดงข้อผิดพลาดใน console
      alert('Failed to update item. Please try again.'); // แจ้งเตือนถ้าล้มเหลวในการอัปเดต
    }
  };

  // ถ้ายังไม่ได้ดึงข้อมูล item ให้แสดงข้อความ Loading
  if (!item) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h1 className="text-center text-2xl font-bold mb-4">แก้ไขรายการสินค้า</h1> 
      {error && <div className="text-red-500">{error}</div>} 

      <div className="mb-4 p-4 bg-white shadow-md rounded-lg max-w-md mx-auto">
        <h2 className="text-xl mb-4">แก้ไขข้อมูลสินค้า</h2>

        <input
          className="border p-2 mb-2 w-full"
          type="text"
          name="title" // ฟิลด์สำหรับชื่อสินค้า
          placeholder="ชื่อสินค้า"
          value={item.title} // ค่าของ input เป็นชื่อสินค้าที่ดึงมา
          onChange={handleChange} // เรียกใช้ handleChange เมื่อมีการเปลี่ยนแปลง
        />

        <input
          className="border p-2 mb-2 w-full"
          type="number"
          name="price" // ฟิลด์สำหรับราคา
          placeholder="ราคา"
          value={item.price || ''} // ค่าของ input เป็นราคา
          onChange={handleChange} // เรียกใช้ handleChange เมื่อมีการเปลี่ยนแปลง
        />

        <input
          className="border p-2 mb-2 w-full"
          type="number"
          name="quantity" // ฟิลด์สำหรับจำนวนชิ้น
          placeholder="จำนวนชิ้น"
          value={item.quantity || ''} // ค่าของ input เป็นจำนวนชิ้น
          onChange={handleChange} // เรียกใช้ handleChange เมื่อมีการเปลี่ยนแปลง
        />

        <div className="flex justify-between">
          <button
            className="w-1/2 bg-gray-500 text-white p-2 rounded"
            onClick={() => router.push('/')} // ปุ่มกลับไปยังหน้าแรก
          >
            กลับ
          </button>

          <button
            className="w-1/2 bg-blue-500 text-white p-2 rounded"
            onClick={handleEditItem} // ปุ่มบันทึกข้อมูลสินค้า
            disabled={!item.title || item.price === undefined || item.quantity === undefined} // ปิดปุ่มถ้าไม่มีข้อมูล
          >
            บันทึก
          </button>
        </div>
      </div>
    </>
  );
}

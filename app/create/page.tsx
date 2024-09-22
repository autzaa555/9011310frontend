'use client';
import React, { useState } from 'react';
import axios from "axios";
import { useRouter } from 'next/navigation'; // ใช้สำหรับการนำทาง

export default function Create() {
  const router = useRouter(); // ใช้งาน useRouter สำหรับการนำทาง
  const [newItem, setNewItem] = useState({ title: '', price: '', quantity: '' }); // State สำหรับเก็บข้อมูลที่ผู้ใช้กรอก

  // ฟังก์ชันสำหรับ handle การเปลี่ยนแปลงของฟอร์ม
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // แปลงฟิลด์ 'price' เป็น float และ 'quantity' เป็น int
    const parsedValue = name === 'price' ? parseFloat(value) : name === 'quantity' ? parseInt(value) : value;
    setNewItem(prevItem => ({ ...prevItem, [name]: parsedValue })); // อัปเดตค่าใน state ของ newItem
  };

  // ฟังก์ชันสำหรับการเพิ่มข้อมูลใหม่ และส่งไปยัง API
  const handleAddItem = async () => {
    try {
      if (!newItem.title || !newItem.price || !newItem.quantity) {
        alert("Please fill in all fields."); // เตือนให้กรอกข้อมูลให้ครบ
        return;
      }

      // ส่งข้อมูลไปยัง API
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/items`, newItem, {
        withCredentials: true, // ตรวจสอบการยืนยันสิทธิ์หากมี
      });
      
      // ถ้าบันทึกสำเร็จ ให้ไปที่หน้าแรก
      router.push('/'); 
    } catch (error) {
      console.error("Error adding item:", error); // แจ้งข้อผิดพลาดถ้าการบันทึกล้มเหลว
      alert("Failed to add item. Please try again."); // เตือนว่าบันทึกไม่สำเร็จ
    }
  };

  return (
    <>


      {/* ส่วนหัวข้อ */}
      <h1 className="text-center text-2xl font-bold mb-4"> </h1>

      {/* ฟอร์มสำหรับการเพิ่มข้อมูล */}
      <div className="mb-4 p-4 bg-white shadow-md rounded-lg max-w-md mx-auto">
        <h2 className="text-xl mb-4">เพิ่ม รายการ สินค้า</h2>
        <input
          className="border p-2 mb-2 w-full"
          type="text"
          name="title"
          placeholder="ชื่อสินค้า"
          value={newItem.title}
          onChange={handleChange} // เรียกใช้ฟังก์ชัน handleChange เมื่อมีการเปลี่ยนแปลงข้อมูล
        />
        <input
          className="border p-2 mb-2 w-full"
          type="number"
          name="price"
          placeholder="ราคา"
          value={newItem.price}
          onChange={handleChange}
        />
        <input
          className="border p-2 mb-2 w-full"
          type="number"
          name="quantity"
          placeholder="จำนวนชิ้น"
          value={newItem.quantity}
          onChange={handleChange}
        />
        <div className="flex justify-between">
          {/* ปุ่มสำหรับกลับไปยังหน้าแรก */}
          <button
            className="w-1/2 bg-gray-500 text-white p-2 rounded"
            onClick={() => router.push('/')} // เมื่อกดจะนำทางไปยังหน้าแรก
          >
            กลับ
          </button>

          {/* ปุ่มสำหรับบันทึกข้อมูล */}
          <button
            className="w-1/2 bg-blue-500 text-white p-2 rounded"
            onClick={handleAddItem} // เรียกใช้ฟังก์ชัน handleAddItem เมื่อกดบันทึก
          >
            บันทึก
          </button>
        </div>
      </div>
    </>
  );
}

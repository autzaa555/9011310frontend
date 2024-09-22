'use client';
import axios from "axios";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function TablePage() {
  const router = useRouter();
  const [listItem, setListItem] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/items`);
        setListItem(res.data);
      } catch (err) {
        console.error(err);
        setError('Failed to load items.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm("คุณแน่ใจหรือว่าต้องการลบรายการนี้?");
    if (confirmDelete) {
      try {
        await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/items/${id}`);
        setListItem(prevItems => prevItems.filter(item => item.id !== id));
      } catch (err) {
        console.error(err);
        alert('Failed to delete item.');
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <h1 className="text-2xl font-bold mb-4 text-center">รายการ สินค้า</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b text-center">ID</th>
              <th className="py-2 px-4 border-b text-center">ชื่อสินค้า</th>
              <th className="py-2 px-4 border-b text-center">ราคา</th>
              <th className="py-2 px-4 border-b text-center">จำนวนชิ้น</th>
              <th className="py-2 px-4 border-b text-center">แก้ไข</th>
              <th className="py-2 px-4 border-b text-center">ลบ</th>
            </tr>
          </thead>
          <tbody>
            {listItem.length > 0 ? (
              listItem.map((item: any) => (
                <tr key={item.id} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border-b text-center">{item.id}</td>
                  <td className="py-2 px-4 border-b text-center">{item.title}</td>
                  <td className="py-2 px-4 border-b text-center">{item.price}</td>
                  <td className="py-2 px-4 border-b text-center">{item.quantity}</td>
                  <td className="py-2 px-4 border-b text-center">
                    <button
                      onClick={() => router.push(`/edit/${item.id}`)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      แก้ไข
                    </button>
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      ลบ
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="py-2 px-4 text-center border-b">No items found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter, useParams } from 'next/navigation';

interface Item {
  id: number;
  title: string;
  price: number;
  quantity: number;
  status: string;
  owner_id: number;
}

export default function Edit() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id; // Use useParams to get the ID

  const [item, setItem] = useState<Item | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchItem = async () => {
      if (!id) return;

      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/items/${id}`);
        setItem(response.data);
        console.log('Fetched item data:', response.data);
      } catch (error) {
        console.error('Error fetching item data:', error);
        setError('Failed to fetch item data.');
      }
    };

    fetchItem();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const parsedValue = name === 'price' ? parseFloat(value) : name === 'quantity' ? parseInt(value) : value;
    setItem(prevItem => prevItem ? { ...prevItem, [name]: parsedValue } : null);
  };

  const handleEditItem = async () => {
    if (!item || !item.title || item.price === undefined || item.quantity === undefined) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/items/${id}`, item);
      router.push('/');
    } catch (error) {
      console.error('Error updating item:', error);
      alert('Failed to update item. Please try again.');
    }
  };

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
          name="title"
          placeholder="ชื่อสินค้า"
          value={item.title}
          onChange={handleChange}
        />

        <input
          className="border p-2 mb-2 w-full"
          type="number"
          name="price"
          placeholder="ราคา"
          value={item.price || ''}
          onChange={handleChange}
        />

        <input
          className="border p-2 mb-2 w-full"
          type="number"
          name="quantity"
          placeholder="จำนวนชิ้น"
          value={item.quantity || ''}
          onChange={handleChange}
        />

        <div className="flex justify-between">
          <button
            className="w-1/2 bg-gray-500 text-white p-2 rounded"
            onClick={() => router.push('/')}
          >
            กลับ
          </button>

          <button
            className="w-1/2 bg-blue-500 text-white p-2 rounded"
            onClick={handleEditItem}
            disabled={!item.title || item.price === undefined || item.quantity === undefined}
          >
            บันทึก
          </button>
        </div>
      </div>
    </>
  );
}

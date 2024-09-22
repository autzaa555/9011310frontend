"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";



export default function addItem() {
    const router = useRouter();
  // ฟังก์ชันสำหรับการเพิ่มข้อมูลใหม่ และส่งไปยัง API
  const handleAddItem = () => {
    router.push("/create");
  };
  return (
 <>
    <Link href="/create" className="text-white font-bold">
    หน้าแรก
  </Link>
        <button
          className="bg-blue-500 text-white p-2 rounded"
          onClick={handleAddItem}
        >
          Add Item
        </button>
   
</>
 
)
    }    



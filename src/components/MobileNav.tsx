"use client";

import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  HomeOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function MobileNav() {
  const router = useRouter();
  return (
    <div className="rounded-tr-xl rounded-tl-xl sticky inset-x-0 bottom-0 z-30 grid h-16 w-full grid-cols-4 items-center justify-center gap-2 bg-bhgreen shadow-menu-shadow md:hidden">
      <div
        onClick={() => router.push("/home")}
        className="flex flex-col items-center justify-center cursor-pointer"
      >
        <HomeOutlined className="text-white" height={20} width={10} />
        <p className="text-sm text-white">Home</p>
      </div>
      <div
        className="flex flex-col items-center justify-center cursor-pointer"
        onClick={() => router.push("/news")}
      >
        <ClockCircleOutlined className="text-white" />
        <p className="text-sm text-white">News</p>
      </div>
      <div
        className="flex flex-col  items-center justify-center cursor-pointer"
        onClick={() => router.push("/tasks")}
      >
        <CheckCircleOutlined className="text-white" />
        <p className="text-sm text-white">Shuguli</p>
      </div>

      <div
        className="flex flex-col items-center justify-center cursor-pointer"
        onClick={() => router.push("/profile")}
      >
        <UserOutlined className="text-white" />
        <p className="text-sm text-white">Profile</p>
      </div>
    </div>
  );
}

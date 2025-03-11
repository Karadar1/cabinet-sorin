import Image from "next/image";
import HomePage from "../pages/HomePage";
import { SlideTabsExample } from "@/components/Navbar/Navbar";

export default function Home() {
  return (
    <>
    <SlideTabsExample />
    <div id="home" className="h-screen bg-red-200 flex items-center justify-center">
    <h1 className="text-4xl">Home Section</h1>
  </div>
  <div id="pricing" className="h-screen bg-blue-200 flex items-center justify-center">
    <h1 className="text-4xl">Pricing Section</h1>
  </div>
  <div id="features" className="h-screen bg-green-200 flex items-center justify-center">
    <h1 className="text-4xl">Features Section</h1>
  </div>
  <div id="docs" className="h-screen bg-yellow-200 flex items-center justify-center">
    <h1 className="text-4xl">Docs Section</h1>
  </div>
  <div id="blog" className="h-screen bg-purple-200 flex items-center justify-center">
    <h1 className="text-4xl">Blog Section</h1>
  </div>
    </>
  );
}

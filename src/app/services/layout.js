import Link from "next/link";
import Navbar from "../components/navbar";
export default function HomeLayout({ children }) {
  return (
    <>
      <Navbar></Navbar>
      {children}
    </>
  );
}

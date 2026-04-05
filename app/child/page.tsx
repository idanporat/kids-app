import { redirect } from "next/navigation";

export default function ChildPage() {
  redirect("/login");
}

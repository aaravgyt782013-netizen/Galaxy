import { permanentRedirect } from "next/navigation";

export default function HomeAliasPage(): never {
  permanentRedirect("/");
}

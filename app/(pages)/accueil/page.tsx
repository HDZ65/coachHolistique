import Accompagnement from "./components/Accompagnement/Accompagnement"
import UnPeuDeMoi from "./components/UnPeuDeMoi/UnPeuDeMoi"
import FirstAccueil from "./components/FirstAccueil/FirstAccueil"
import { Newsletter } from "./components/Newsletter/Newsletter"
import Footer from "@/app/components/Footer/Footer"
import Ebook from "./components/E-book/E-book"

type Props = {}
export default function Accueil({ }: Props) {
  return (
    <>
      <FirstAccueil />
      <Accompagnement />
      <UnPeuDeMoi />
      <Ebook />
      <Newsletter />
    </>
  )
}


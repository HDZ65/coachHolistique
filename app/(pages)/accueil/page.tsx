import Accompagnement from "./components/Accompagnement/Accompagnement"
import UnPeuDeMoi from "./components/UnPeuDeMoi/UnPeuDeMoi"
import FirstAccueil from "./components/FirstAccueil/FirstAccueil"
import { Newsletter } from "./components/Newsletter/Newsletter"
import Ebook from "./components/E-book/E-book"


export default function Accueil() {
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


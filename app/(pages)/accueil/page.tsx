import Decouvrez from "./components/Accompagnement/Accompagnement"
import UnPeuDeMoi from "./components/UnPeuDeMoi/UnPeuDeMoi"
import FirstAccueil from "./components/FirstAccueil/FirstAccueil"

type Props = {}
export default function Accueil({}: Props) {
  return (
    <div className="flex flex-col gap-20 w-11/12 md:w-4/5 max-w-7xl mx-auto">
    <FirstAccueil />
    <Decouvrez />
    <UnPeuDeMoi />
    </div>
  )
}


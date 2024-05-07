import LoiAttraction from './components/CardEbook/LoiAttraction/LoiAttraction'
import FirstEbook from './components/FirstEbook/FirstEbook'

export default function page() {
  return (
    <div className='flex flex-col items-center justify-center mx-auto gap-20'>
      <FirstEbook />
      <LoiAttraction/>
    </div>
  )
}
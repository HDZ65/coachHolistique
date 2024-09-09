import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ButtonContact() {
    return (
        <Link href="/contact">
            <Button variant={'outline'} className='z-30 flex gap-2'>
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.832 8.25065C12.832 8.73688 12.6389 9.2032 12.2951 9.54701C11.9512 9.89083 11.4849 10.084 10.9987 10.084H5.4987L1.83203 13.7507V3.66732C1.83203 2.65898 2.65703 1.83398 3.66536 1.83398H10.9987C11.4849 1.83398 11.9512 2.02714 12.2951 2.37096C12.6389 2.71477 12.832 3.18109 12.832 3.66732V8.25065Z" stroke="#111111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M16.5013 8.25H18.3346C18.8209 8.25 19.2872 8.44315 19.631 8.78697C19.9748 9.13079 20.168 9.5971 20.168 10.0833V20.1667L16.5013 16.5H11.0013C10.5151 16.5 10.0488 16.3068 9.70494 15.963C9.36112 15.6192 9.16797 15.1529 9.16797 14.6667V13.75" stroke="#111111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
                Me contacter</Button>
        </Link>
    )
}
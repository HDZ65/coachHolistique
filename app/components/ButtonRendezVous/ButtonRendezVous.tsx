'use client'

import { Button } from "@/components/ui/button"
import { CiCalendar } from "react-icons/ci"
import Link from "next/link"

export function ButtonRendezVous({className}: {className: string}) {
    
    return (
        <Link href="/rendez-vous">
        <Button className={className}>
            <CiCalendar className={'mr-2 text-xl stroke-1'} />
            Prendre rendez-vous
        </Button>
        </Link>
    )
}
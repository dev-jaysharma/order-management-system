import {createFileRoute} from '@tanstack/react-router'
import Component from '@/components/ui/bg'


export const Route = createFileRoute('/')({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <>
        <div className="h-[90vh] w-full flex items-center justify-center absolute font-bold text-4xl font-serif underline underline-offset-0 rotate-z-1  ">Hello ! </div>
        <Component />
        </>
    )

}



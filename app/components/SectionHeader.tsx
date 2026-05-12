
export default function SectionHeader({title, number}: {title: string, number: string}) {
    return (
        <div className="mb-12">
            <span className="font-heading text-4xl sm:text-5xl text-orange/10 mr-5 tabular-nums">{number}</span>
            <span className="w-10 h-0.5 bg-orange/60 inline-block align-middle mr-5" />
            <span className="font-mono text-xs sm:text-sm tracking-[0.2em] uppercase text-orange align-middle">
                {title}
            </span>
        </div>
    )
}
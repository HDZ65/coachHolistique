import CardEbook from "../CardEbook";

export default function LoiAttraction() {
  return (
    <section aria-labelledby="loi-attraction-title" className='flex flex-col gap-12 '>
        <div className="flex flex-col gap-6">
          <h2 id="loi-attraction-title" className='text-3xl text-secondary '>Qu&apos;est-ce que la loi de l&apos;attraction ?</h2>
          <p className='  '>
            La loi de l&apos;attraction est un principe selon lequel vous attirez à vous ce sur quoi vous portez votre attention. En d&apos;autres termes, si vous pensez de manière <strong>positive</strong>, vous attirerez des événements <strong>positifs</strong> dans votre vie. À l&apos;inverse, si vous pensez de manière <strong>négative</strong>, vous attirerez des événements <strong>négatifs</strong>.
          </p>
        </div>
        <CardEbook />
      </section>
  )
}
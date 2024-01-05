import { useEffect } from "react"
import { useProbabilityStore } from "./store";
import { showPdf, showPmf } from "./actions";
import { BlockMath } from 'react-katex'
import distriConfig from "./distrConfig";

export default function PdfPlot({ pmf }) {
  const { params, distr, trigger, setFailed } = useProbabilityStore()
  useEffect(() => {
    const data = {
      distr: { 
        name: distr, 
        params: params
      }
    }

    async function update() {
      const pdf = pmf ? await showPmf(data) : await showPdf(data)
      if (pdf) await vegaEmbed('#pdf', pdf, { height: 334, actions: false })
      else setFailed(true)
    }
    update()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger, distr])

  return <div>
    <h2>{pmf ? 'Probability Mass Function (PMF)' : 'Probability Density Function (PDF)'}</h2>
    <div className="visualization">

      <div className="flex">
        <BlockMath math={distriConfig[distr].pdf} />
      </div>
      <div>
        <div className='plot' id='pdf' />
      </div>
    </div>
  </div>
}
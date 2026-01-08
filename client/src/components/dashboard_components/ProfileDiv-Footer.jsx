import { useInteractiveCard } from "./useInteractiveEffects";
import { GitCompareArrows } from "lucide-react";

function Footer({Count, title}) {
    const cardRef = useInteractiveCard();
    return (
        <div className="interactive-container" ref={cardRef}>
            <div className="file-list-container-4 glass-card community-filelist">
                 <div className="main-content">
                     <GitCompareArrows color="#A347FF" size="5vw"/>
                     <div className="content">
                        <span className="count">{Count}</span>
                        <span className="title">{title==="Contribution" ? `Contibutions` : title==="Projects" ? `Projects` : `Team-Mates`}</span>
                     </div>
                 </div>
            </div>
        </div>
    )
}

export default Footer
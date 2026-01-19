import { useInteractiveCard } from "./useInteractiveEffects";
import { GitCompareArrows } from "lucide-react";
import { ProjectIcon } from "./Icons";

function Footer({ Count, title }) {
    const cardRef = useInteractiveCard();
    return (
        <div className="interactive-container" ref={cardRef}>
            <div className="file-list-container-4 glass-card community-filelist">
                <div className="main-content">
                    {title === "Contribution" ? <GitCompareArrows color="#A347FF" size="5vw" /> : title === "Projects" ? <ProjectIcon /> : <svg className="text-primary" viewBox="0 0 24 24" fill="currentColor" style={{ width: '5vw', height: '5vw' }}>
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>}

                    <div className="content">
                        <span className="count">{Count}</span>
                        <span className="title">{title === "Contribution" ? `Contibutions` : title === "Projects" ? `Projects` : `Team-Mates`}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer
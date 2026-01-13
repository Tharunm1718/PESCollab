
function Formcomponent({ className, userValue }) {
    return (
        <div className={`${className} flex`}>
            <span className="namespan">{className}</span>
            {className==="About-Me" ? (
                <textarea className="aboutme-textarea" value={userValue} />
            ) : (
                <input type={className === "Password" ? "password" : "text"} className="input"  value={userValue} />
            )}
          {className === "Name" && (
                <p className="caution">Your name may appear around PESCollab where you contribute or are mentioned. You can remove it at any time.</p>
            )}

            {className === "Email" && (
                <p className="caution">Your email may appear around PESCollab where you contribute or are mentioned. You can remove it at any time.</p>
            )}

            {className === "USN" && (
                <p className="caution">Your USN cannot be changes. It may appear around PESCollab </p>
            )}
        </div>
    );
}

export default Formcomponent;
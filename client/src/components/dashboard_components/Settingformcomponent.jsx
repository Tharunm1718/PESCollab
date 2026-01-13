function Formcomponent({ className, value, onChange, mode }) {
    return (
        <div className={`${className} flex`}>
            <span className="namespan">{className}</span>

            {className === "About-Me" ? (
                <textarea
                    className="aboutme-textarea"
                    value={value || ""}
                    readOnly={mode === "view"}
                    onChange={mode === "edit" ? (e) => onChange(e.target.value) : undefined}
                />
            ) : (
                <input
                    type={className === "Password" ? "password" : "text"}
                    className="input"
                    value={value || ""}
                    readOnly={mode === "view"}
                    onChange={mode === "edit" ? (e) => onChange(e.target.value) : undefined}
                />
            )}
            {
                className === "Name" && (
                    <p className="caution">
                        Your name may appear around PESCollab where you contribute or are mentioned.
                    </p>
                )
            }

            {
                className === "Email" && (
                    <p className="caution">
                        Your email may appear around PESCollab where you contribute or are mentioned.
                    </p>
                )
            }

            {
                className === "USN" && (
                    <p className="caution">
                        Your USN cannot be changed. It may appear around PESCollab.
                    </p>
                )
            }
        </div >
    );
}

export default Formcomponent;

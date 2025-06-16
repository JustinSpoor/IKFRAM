import classes from './NameInput.module.css'

function NameInput({onChange, userInput}) {
    return (
        <>
            <div className={classes}>
                <input  type="text"
                    required
                    placeholder="Insert Name"
                    value={userInput.name}
                    onChange={(event) => {
                        onChange(event.target.value)
                    }}
                />
            </div>
        </>
    )
}

export default NameInput;
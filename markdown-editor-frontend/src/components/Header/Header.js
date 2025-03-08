import "./Header.css";

const Header = ({ handleReset, handleCopy, buttonText, sampleMarkDown, handleSelect }) => {
    return (
        <header>
            <div id="menu-items">
                <div><a href="/">Markdown Editor Preview</a></div>
                <div id="reset-button"><button className="link-button" onClick={(e) => { e.preventDefault(); handleReset(); }}>Reset</button></div>
                <div id="copy-button"><button className="link-button" id="copy" onClick={(e) => { e.preventDefault(); handleCopy(); }}>{buttonText}</button></div>
            </div>
            {sampleMarkDown.length > 0 &&
                <div className="icons">
                    Sample MarkDown:
                    {sampleMarkDown.map((item, index) =>
                        <button className="circle-icon" key={`K_${index}`} onClick={(e) => {e.preventDefault(); handleSelect(item)}} title={item}>{item[0]}</button>
                    )}
                </div>
            }
        </header>
    );
}

export default Header;
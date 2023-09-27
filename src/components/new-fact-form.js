import { useState } from 'react';

function isValidHttpUrl(string) {
    let url;

    try {
        url = new URL(string);
    } catch (_) {
        return false;
    }

    return url.protocol === "http:" || url.protocol === "https:";
}

function NewFactForm({ categories, setFacts, setShowForm }) {
    const [text, setText] = useState('');
    const [source, setSource] = useState('http://google.com');
    const [category, setCategory] = useState('');
    const textLength = text.length;

    function handleSubmit(e) {
        e.preventDefault();

        if(text && isValidHttpUrl(source) && category && text.length <= 200){
            const newFact = {
                    id: Math.round(Math.random() * 10000000),
                    text,
                    source,
                    category,
                    votesInteresting: 0,
                    votesMindblowing: 0,
                    votesFalse: 0,
                    createdIn: new Date().getFullYear(),
                };
            setFacts((facts) => [newFact, ...facts]);
        }

        setText('');
        setSource('');
        setCategory('');

        setShowForm(false);
    }

    return (
        <form className='fact-form' onSubmit={handleSubmit}>
            <input type="text"
                   placeholder="Share a fact with the world..."
                   value={text}
                   onChange={(e) => setText(e.target.value)}
            />
            <span>{200 - textLength}</span>
            <input type="text"
                   placeholder="Trustworthy source..."
                   value={source}
                   onChange={(e) => setSource(e.target.value)}
            />
            <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            >
                <option value="">Choose category:</option>
                {categories.map(cat => (
                    <option value={cat.name} key={cat.name}>{cat.name.toUpperCase()}</option>
                ))}
            </select>
            <button className="btn btn-large">Post</button>
        </form>
    )
}

export default NewFactForm;
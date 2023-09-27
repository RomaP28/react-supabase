import { useState } from 'react';
import supabase from '../supabase';

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
    const [source, setSource] = useState('');
    const [category, setCategory] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const textLength = text.length;

    async function handleSubmit(e) {
        e.preventDefault();

        if(text && isValidHttpUrl(source) && category && text.length <= 200){
            setIsUploading(true);
            const { data: newFact, error } = await supabase
                .from('facts')
                .insert([{ text, source, category }])
                .select();

            if(!error) setFacts((facts) => [newFact[0], ...facts]);

            setText('');
            setSource('');
            setCategory('');
            setIsUploading(false);
            setShowForm(false);
        }
    }

    return (
        <form className='fact-form' onSubmit={handleSubmit}>
            <input type="text"
                   placeholder="Share a fact with the world..."
                   value={text}
                   onChange={(e) => setText(e.target.value)}
                   disabled={isUploading}
            />
            <span>{200 - textLength}</span>
            <input type="text"
                   placeholder="Trustworthy source..."
                   value={source}
                   onChange={(e) => setSource(e.target.value)}
                   disabled={isUploading}
            />
            <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                disabled={isUploading}
            >
                <option value="">Choose category:</option>
                {categories.map(cat => (
                    <option value={cat.name} key={cat.name}>{cat.name.toUpperCase()}</option>
                ))}
            </select>
            <button className="btn btn-large" disabled={isUploading}>Post</button>
        </form>
    )
}

export default NewFactForm;
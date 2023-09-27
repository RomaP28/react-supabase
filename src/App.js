import { useState, useEffect } from 'react';
import supabase from './supabase';
import Loader from './components/loader';
import Header from './components/header';
import CategoryFilter from './components/catefory-filter';
import NewFactForm from './components/new-fact-form';
import FactList from './components/fact-list';
import './style.css';

const CATEGORIES = [
    { name: "technology", color: "#3b82f6" },
    { name: "science", color: "#16a34a" },
    { name: "finance", color: "#ef4444" },
    { name: "society", color: "#eab308" },
    { name: "entertainment", color: "#db2777" },
    { name: "health", color: "#14b8a6" },
    { name: "history", color: "#f97316" },
    { name: "news", color: "#8b5cf6" },
];

function App() {
    const [showForm, setShowForm] = useState(false);
    const [facts, setFacts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentCategory, setCurrentCategory] = useState('all');


    useEffect(() => {
        async function getFacts() {
            setIsLoading(true);

            let query = supabase.from('facts').select('*');

            if(currentCategory !== 'all') query = query.eq('category', currentCategory);

            const { data: facts, error } = await query
                .order('votesInteresting', {ascending: false})
                .limit(20);

            if(!error) setFacts(facts);
            else console.log(error);
            setIsLoading(false);
        }
        getFacts();
    }, [currentCategory]);

    return (
        <>
            <Header showForm={showForm} setShowForm={setShowForm} />

            {showForm && <NewFactForm setFacts={setFacts} categories={CATEGORIES} setShowForm={setShowForm} />}

            <main className='main'>
                <CategoryFilter categories={CATEGORIES} setCurrentCategory={setCurrentCategory} />
                {isLoading ? <Loader /> : <FactList facts={facts} setFacts={setFacts} categories={CATEGORIES} /> }
            </main>
        </>
    )
}

export default App;
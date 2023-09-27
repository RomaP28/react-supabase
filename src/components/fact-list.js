import Fact from './fact';

function FactList({ facts, setFacts, categories }) {

    if(facts.length === 0) {
        return <p className='loading'>No facts for this category yet! Create the first one!)</p>
    }

    return (
        <section>
            <ul className="facts-list">
                {facts.map(fact => (
                    <Fact  key={fact.id} fact={fact} setFacts={setFacts} categories={categories} />
                ))}
            </ul>
            <p>There are {facts.length} facts in the database. Add you own!</p>
        </section>
    )
}

export default FactList;
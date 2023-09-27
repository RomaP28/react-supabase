function CategoryFilter({ categories, setCurrentCategory }) {
    return (
        <aside>
            <ul>
                <li className="category">
                    <button
                        className="btn btn-all-categories"
                        onClick={()=>setCurrentCategory("all")}
                    >All</button>
                </li>
                {categories.map(cat=>(
                    <li className="category" key={cat.name}>
                        <button className="btn btn-category"
                            onClick={()=>setCurrentCategory(cat.name)}
                            style={{ backgroundColor: cat.color }}>
                            {cat.name}
                        </button>
                    </li>
                ))}
            </ul>
        </aside>
    )
}

export default CategoryFilter;
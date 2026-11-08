import { useState } from 'react'
import './App.css'

const emptyProfile = {
  name: '',
  protein_grams_daily: '',
  carbs_grams_daily: '',
  fat_grams_daily: '',
  cuisine: 'Italian',
}

function MacroCard({ label, grams, percent }) {
  const fill = Math.min(Math.max(percent, 0), 100)

  return (
    <div className="macro-card">
      <div className="macro-card-topline"><span>{label}</span><small>{percent}% of daily goal</small></div>
      <strong>{Number(grams).toFixed(1).replace(/\.0$/, '')}<span>g</span></strong>
      <div className="macro-track" aria-hidden="true"><span style={{ width: `${fill}%` }} /></div>
    </div>
  )
}

function App() {
  const [profile, setProfile] = useState(emptyProfile)
  const [recipe, setRecipe] = useState(null)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  function updateProfile(event) {
    const { name, value } = event.target
    setProfile((current) => ({ ...current, [name]: value }))
  }

  async function generateRecipe(event) {
    event.preventDefault()
    setError('')
    setRecipe(null)
    setIsLoading(true)

    try {
      const response = await fetch('/api/recipes/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...profile,
          protein_grams_daily: Number(profile.protein_grams_daily),
          carbs_grams_daily: Number(profile.carbs_grams_daily),
          fat_grams_daily: Number(profile.fat_grams_daily),
        }),
      })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.detail || `Request failed with status ${response.status}.`)
      }
      setRecipe(data)
    } catch (requestError) {
      setError(requestError.message || 'Could not generate a recipe. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="page-shell">
      <header className="topbar">
        <a className="brand" href="/" aria-label="Jaarvi home">
          <span className="brand-mark" aria-hidden="true">j.</span>
          <span>jaarvi</span>
        </a>
        <div className="topbar-right">
          <span className="topbar-label">YOUR EVERYDAY RECIPE STUDIO</span>
          <span className="topbar-spark" aria-hidden="true">✳</span>
        </div>
      </header>

      <section className="hero" aria-labelledby="page-title">
        <div className="hero-copy-block">
          <div className="eyebrow"><span className="eyebrow-dot" /> GOOD FOOD, THOUGHTFULLY MADE</div>
          <h1 id="page-title">Your goals.<br /><span>Meet your next meal.</span></h1>
          <p className="hero-copy">
            Real recipes, adjusted to your day. Choose a cuisine, share your daily goals,
            and we’ll find a delicious place to start.
          </p>
          <div className="hero-notes">
            <span><i aria-hidden="true">✓</i> Sourced from real recipes</span>
            <span><i aria-hidden="true">✓</i> Sized for one serving</span>
          </div>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="plate plate-back" />
          <div className="plate plate-front">
            <span className="plate-food plate-food-one">🥑</span>
            <span className="plate-food plate-food-two">🍅</span>
            <span className="plate-food plate-food-three">🌿</span>
            <span className="plate-food plate-food-four">🥬</span>
            <span className="plate-center">made<br />for you</span>
          </div>
          <div className="art-note"><span>✳</span> A LITTLE MORE YOU-TIFUL</div>
        </div>
      </section>

      <section className="recipe-layout" aria-label="Recipe generator">
        <form className="profile-card" onSubmit={generateRecipe}>
          <div className="form-heading">
            <span className="step-chip">01</span>
            <div>
              <p className="section-kicker">LET’S MAKE IT PERSONAL</p>
              <h2>What are you craving?</h2>
            </div>
          </div>
          <p className="form-intro">A few details help us find a recipe that feels like yours.</p>

          <label className="field-label" htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            value={profile.name}
            onChange={updateProfile}
            maxLength={80}
            autoComplete="given-name"
            placeholder="Ada"
            required
          />

          <fieldset className="macro-fields">
            <legend>Daily macro goals <span>grams / day</span></legend>
            <label>
              <span>Protein</span>
              <input name="protein_grams_daily" type="number" min="1" max="1000" step="1" value={profile.protein_grams_daily} onChange={updateProfile} placeholder="120" required />
            </label>
            <label>
              <span>Carbs</span>
              <input name="carbs_grams_daily" type="number" min="1" max="1500" step="1" value={profile.carbs_grams_daily} onChange={updateProfile} placeholder="220" required />
            </label>
            <label>
              <span>Fat</span>
              <input name="fat_grams_daily" type="number" min="1" max="500" step="1" value={profile.fat_grams_daily} onChange={updateProfile} placeholder="70" required />
            </label>
          </fieldset>

          <label className="field-label" htmlFor="cuisine">Cuisine</label>
          <select id="cuisine" name="cuisine" value={profile.cuisine} onChange={updateProfile}>
            <option value="Italian">Italian</option>
            <option value="Mexican">Mexican</option>
          </select>

          <button className="generate-button" type="submit" disabled={isLoading}>
            {isLoading ? <><span className="button-spinner" aria-hidden="true" /> Finding your recipe…</> : <>Find my recipe <span aria-hidden="true">↗</span></>}
          </button>
          <p className="nutrition-note"><span aria-hidden="true">♧</span> Your profile is only used to create this recipe.</p>
        </form>

        <section className={`result-card${recipe ? ' has-recipe' : ''}`} aria-live="polite" aria-busy={isLoading}>
          <div className="result-topline">
            <p className="section-kicker">{recipe ? 'YOUR RECIPE' : 'THE RECIPE CARD'}</p>
            <span className="result-status"><i aria-hidden="true" /> {isLoading ? 'Searching' : recipe ? 'Ready to cook' : 'Waiting for your details'}</span>
          </div>
          {!recipe && !error && (
            <div className="empty-result">
              <div className="empty-art" aria-hidden="true"><span className="empty-art-sun">✳</span><span className="empty-art-bowl">⌁</span><span className="empty-art-leaf">❋</span></div>
              <p className="section-kicker">A GOOD THING IS COOKING</p>
              <h2>{isLoading ? 'Finding your next favorite…' : 'Something lovely is on the menu.'}</h2>
              <p>{isLoading ? 'We’re looking for a real recipe and shaping one serving around your goals.' : 'Your recipe, ingredients, and macro estimates will show up here.'}</p>
              {isLoading && <div className="search-progress"><span /> <span /> <span /> Searching recipes and adjusting a serving</div>}
            </div>
          )}

          {error && (
            <div className="error-box" role="alert">
              <p className="section-kicker">WE COULDN’T MAKE THAT RECIPE</p>
              <p>{error}</p>
              <small>Check that the API is running and its model key is configured, then try again.</small>
            </div>
          )}

          {recipe && (
            <article className="recipe-result">
              <p className="section-kicker">ONE SERVING · {profile.cuisine.toUpperCase()}</p>
              <h2>{recipe.title}</h2>
              <p className="recipe-summary">{recipe.summary}</p>
              <a className="source-link" href={recipe.source_url} target="_blank" rel="noreferrer">
                Original inspiration: {recipe.source_title} <span aria-hidden="true">↗</span>
              </a>

              <div className="macro-heading"><h3>Estimated nutrition</h3><span>PER SERVING</span></div>
              <div className="macro-grid" aria-label="Estimated macros per serving">
                <MacroCard label="Protein" grams={recipe.estimated_macros.protein_grams} percent={recipe.macro_contribution.protein_percent} />
                <MacroCard label="Carbs" grams={recipe.estimated_macros.carbs_grams} percent={recipe.macro_contribution.carbs_percent} />
                <MacroCard label="Fat" grams={recipe.estimated_macros.fat_grams} percent={recipe.macro_contribution.fat_percent} />
              </div>

              <div className="recipe-columns">
                <section>
                  <h3><span>01</span> Ingredients</h3>
                  <ul className="ingredient-list">
                    {recipe.ingredients.map((ingredient, index) => (
                      <li key={`${ingredient.name}-${index}`}><span>{ingredient.name}</span><strong>{ingredient.quantity}</strong></li>
                    ))}
                  </ul>
                </section>
                <section>
                  <h3><span>02</span> Method</h3>
                  <ol className="instruction-list">
                    {recipe.instructions.map((instruction, index) => <li key={index}>{instruction}</li>)}
                  </ol>
                </section>
              </div>
              <p className="adjustment-note">{recipe.adjustment_note}</p>
              <p className="nutrition-note">Macro estimates are approximate and may vary by ingredient and brand.</p>
            </article>
          )}
        </section>
      </section>

      <footer className="footer">
        <span>React view · FastAPI endpoint · LangChain agent</span>
        <span>One feature, end to end</span>
      </footer>
    </main>
  )
}

export default App

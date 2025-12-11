'use client';
import { useState } from 'react'
import styles from './analyze_styles.module.css'; 

export default function analysepage() {
  const [text, setText] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleAnalyze = async () => {
    setLoading(true)
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('http://127.0.0.1:8000/analyze', {
        method: 'POST',
        headers: {
                'Content-Type': 'application/json',
                'token': token,
        },
        body: JSON.stringify({ text, candidate_labels: ["sante","nouriture","sport","beaute","fashion","technologie"] })
      })

      const data = await response.json()
      setResult(data)
    } catch (err) {
      console.error(err)
    }
    setLoading(false)
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Orchestration IA</h1>
      <textarea
         className={styles.textarea} 
        placeholder="Écris ton texte ici..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button className={styles.button}
       onClick={handleAnalyze} 
       disabled={loading}
       >
        {loading ? 'Analyse en cours...' : 'Analyser'}
      </button>

      {result && (
        <div className={styles.results}>
          <div className={styles.box}>📄 <strong>Résumé :</strong><p>{result.resume}</p></div>
          <div className={styles.box}>🎭 <strong>Ton :</strong><p>{result.ton}</p></div>
          <div className={styles.box}>🏷️ <strong>Catégorie :</strong><p>{result.categorie}</p></div>
          <div className={styles.box}>⭐ <strong>Score :</strong><p>{result.score}</p></div>
        </div>
      )}
    </div>
  )
}
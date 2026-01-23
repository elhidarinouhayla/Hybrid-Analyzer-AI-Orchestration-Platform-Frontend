'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './analyze_styles.module.css';

export default function AnalyzePage() {
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Vérifier le token
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/Login');
    }
  }, [router]);

  const handleAnalyze = async () => {
    if (!text.trim()) {
      alert('Veuillez entrer un texte à analyser');
      return;
    }

    setLoading(true);
    setProgress(0);
    setResult(null);

    // Simulation des étapes d'analyse
    const steps = [
      { label: 'Préparation du texte...', progress: 20 },
      { label: 'Classification Zero-Shot...', progress: 50 },
      { label: 'Génération du résumé...', progress: 75 },
      { label: 'Analyse de tonalité...', progress: 90 },
    ];

    for (let step of steps) {
      setCurrentStep(step.label);
      setProgress(step.progress);
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://127.0.0.1:8000/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'token': token,
        },
        body: JSON.stringify({ 
          text, 
          candidate_labels: ["santé", "nourriture", "sport", "beauté", "fashion", "technologie"] 
        })
      });

      const data = await response.json();
      setProgress(100);
      setCurrentStep('Analyse terminée !');
      
      setTimeout(() => {
        setResult(data);
        setLoading(false);
        setProgress(0);
        setCurrentStep('');
      }, 500);
    } catch (err) {
      console.error(err);
      setLoading(false);
      setProgress(0);
      setCurrentStep('');
      alert('Erreur lors de l\'analyse. Veuillez réessayer.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/');
  };

  const handleReset = () => {
    setText('');
    setResult(null);
  };

  const getCategoryColor = (category) => {
    const colors = {
      'santé': '#10b981',
      'nourriture': '#f59e0b',
      'sport': '#3b82f6',
      'beauté': '#ec4899',
      'fashion': '#8b5cf6',
      'technologie': '#06b6d4'
    };
    return colors[category?.toLowerCase()] || '#60a5fa';
  };

  const getTonEmoji = (ton) => {
    const emojis = {
      'positif': '😊',
      'négatif': '😔',
      'neutre': '😐'
    };
    return emojis[ton?.toLowerCase()] || '📊';
  };

  return (
    <div className={styles.analyzeContainer}>
      {/* Header avec navigation */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.logo}>
            <div className={styles.logoIcon}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"/>
                <path d="M8.5 8.5v.01"/>
                <path d="M16 15.5v.01"/>
                <path d="M12 12v.01"/>
              </svg>
            </div>
            <span>Hybrid-Analyzer</span>
          </div>
          <button onClick={handleLogout} className={styles.logoutBtn}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" x2="9" y1="12" y2="12"/>
            </svg>
            Déconnexion
          </button>
        </div>
      </header>

      {/* Background animé */}
      <div className={styles.backgroundAnimation}>
        <div className={styles.orb1}></div>
        <div className={styles.orb2}></div>
        <div className={styles.orb3}></div>
      </div>

      {/* Contenu principal */}
      <main className={styles.mainContent}>
        <div className={styles.titleSection}>
          <h1 className={styles.mainTitle}>
            <span className={styles.titleIcon}>✨</span>
            Analyse IA Intelligente
          </h1>
          <p className={styles.subtitle}>
            Orchestration puissante de Hugging Face et Google Gemini
          </p>
        </div>

        {/* Zone de saisie */}
        <div className={styles.inputSection}>
          <div className={styles.inputCard}>
            <div className={styles.cardHeader}>
              <div className={styles.cardTitle}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
                  <polyline points="14 2 14 8 20 8"/>
                </svg>
                <span>Votre texte à analyser</span>
              </div>
              <div className={styles.charCounter}>
                {text.length} caractères
              </div>
            </div>
            
            <textarea
              className={styles.textInput}
              placeholder="Collez ici l'article, le paragraphe ou le contenu que vous souhaitez analyser...

Exemple : 'Apple vient de dévoiler son nouveau iPhone avec des fonctionnalités révolutionnaires en intelligence artificielle. Les experts saluent cette innovation qui pourrait transformer l'industrie mobile.'"
              value={text}
              onChange={(e) => setText(e.target.value)}
              disabled={loading}
            />

            <div className={styles.cardFooter}>
              <button 
                onClick={handleReset} 
                className={styles.resetBtn}
                disabled={loading || !text}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
                  <path d="M3 3v5h5"/>
                </svg>
                Réinitialiser
              </button>
              <button 
                onClick={handleAnalyze} 
                className={styles.analyzeBtn}
                disabled={loading || !text.trim()}
              >
                {loading ? (
                  <>
                    <div className={styles.spinner}></div>
                    Analyse en cours...
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                    </svg>
                    Lancer l'analyse
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Barre de progression */}
          {loading && (
            <div className={styles.progressSection}>
              <div className={styles.progressBar}>
                <div 
                  className={styles.progressFill} 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p className={styles.progressText}>{currentStep}</p>
            </div>
          )}
        </div>

        {/* Résultats */}
        {result && (
          <div className={styles.resultsSection}>
            <div className={styles.resultsHeader}>
              <h2 className={styles.resultsTitle}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
                </svg>
                Résultats de l'analyse
              </h2>
              <div className={styles.successBadge}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                Terminé
              </div>
            </div>

            <div className={styles.resultsGrid}>
              {/* Catégorie */}
              <div className={`${styles.resultCard} ${styles.categoryCard}`}>
                <div className={styles.cardIcon} style={{ background: getCategoryColor(result.categorie) }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="8" x2="21" y1="6" y2="6"/>
                    <line x1="8" x2="21" y1="12" y2="12"/>
                    <line x1="8" x2="21" y1="18" y2="18"/>
                    <line x1="3" x2="3.01" y1="6" y2="6"/>
                    <line x1="3" x2="3.01" y1="12" y2="12"/>
                    <line x1="3" x2="3.01" y1="18" y2="18"/>
                  </svg>
                </div>
                <div className={styles.cardContent}>
                  <h3 className={styles.cardLabel}>Catégorie détectée</h3>
                  <p className={styles.cardValue}>{result.categorie}</p>
                  <div className={styles.confidenceBar}>
                    <div className={styles.confidenceLabel}>Confiance</div>
                    <div className={styles.confidenceBarTrack}>
                      <div 
                        className={styles.confidenceBarFill}
                        style={{ 
                          width: `${(result.score * 100).toFixed(0)}%`,
                          background: getCategoryColor(result.categorie)
                        }}
                      ></div>
                    </div>
                    <div className={styles.confidenceValue}>
                      {(result.score * 100).toFixed(1)}%
                    </div>
                  </div>
                </div>
              </div>

              {/* Tonalité */}
              <div className={`${styles.resultCard} ${styles.toneCard}`}>
                <div className={`${styles.cardIcon} ${styles.toneIcon}`}>
                  <span className={styles.toneEmoji}>{getTonEmoji(result.ton)}</span>
                </div>
                <div className={styles.cardContent}>
                  <h3 className={styles.cardLabel}>Tonalité</h3>
                  <p className={styles.cardValue}>{result.ton}</p>
                  <div className={styles.toneTags}>
                    {result.ton?.toLowerCase() === 'positif' && (
                      <span className={`${styles.toneTag} ${styles.tonePositive}`}>Optimiste</span>
                    )}
                    {result.ton?.toLowerCase() === 'négatif' && (
                      <span className={`${styles.toneTag} ${styles.toneNegative}`}>Critique</span>
                    )}
                    {result.ton?.toLowerCase() === 'neutre' && (
                      <span className={`${styles.toneTag} ${styles.toneNeutral}`}>Factuel</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Résumé */}
              <div className={`${styles.resultCard} ${styles.summaryCard}`}>
                <div className={styles.summaryHeader}>
                  <div className={styles.cardIcon}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>
                    </svg>
                  </div>
                  <h3 className={styles.cardLabel}>Résumé intelligent</h3>
                </div>
                <div className={styles.summaryContent}>
                  <p className={styles.summaryText}>{result.resume}</p>
                </div>
                <div className={styles.summaryFooter}>
                  <div className={styles.aiTag}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/>
                    </svg>
                    Généré par IA
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Statistiques en temps réel */}
        {!result && !loading && (
          <div className={styles.statsSection}>
            <div className={styles.statCard}>
              <div className={styles.statIcon}>⚡</div>
              <div className={styles.statValue}>~2s</div>
              <div className={styles.statLabel}>Temps moyen</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statIcon}>🎯</div>
              <div className={styles.statValue}>95%</div>
              <div className={styles.statLabel}>Précision</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statIcon}>🤖</div>
              <div className={styles.statValue}>2 IA</div>
              <div className={styles.statLabel}>Orchestration</div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
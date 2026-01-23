'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './landing_styles.module.css';

export default function LandingPage() {
  const [scrollY, setScrollY] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigateToLogin = () => router.push('/Login');
  const navigateToSignup = () => router.push('/Signup');

  return (
    <div className={styles.landingContainer}>
      {/* Navigation */}
      <nav 
        className={styles.navbar}
        style={{ 
          backgroundColor: scrollY > 50 ? 'rgba(15, 23, 42, 0.9)' : 'transparent',
          backdropFilter: scrollY > 50 ? 'blur(10px)' : 'none'
        }}
      >
        <div className={styles.navContent}>
          <div className={styles.logo}>
            <div className={styles.logoIcon}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"/>
                <path d="M8.5 8.5v.01"/>
                <path d="M16 15.5v.01"/>
                <path d="M12 12v.01"/>
                <path d="M11 17v.01"/>
                <path d="M7 14v.01"/>
              </svg>
            </div>
            <span className={styles.logoText}>Hybrid-Analyzer</span>
          </div>
          <div className={styles.navButtons}>
            <button onClick={navigateToLogin} className={styles.navLoginBtn}>
              Se connecter
            </button>
            <button onClick={navigateToSignup} className={styles.navSignupBtn}>
              Commencer
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroBackground}>
          <div className={styles.heroBgCircle1}></div>
          <div className={styles.heroBgCircle2}></div>
        </div>

        <div className={styles.heroContent}>
          <div className={styles.heroBadge}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/>
            </svg>
            <span>Orchestration IA de nouvelle génération</span>
          </div>
          
          <h1 className={styles.heroTitle}>
            Automatisez votre
            <span className={styles.heroTitleGradient}>Veille Média</span>
          </h1>
          
          <p className={styles.heroDescription}>
            Analysez des centaines d'articles en quelques secondes grâce à l'intelligence artificielle. 
            Classification zero-shot et synthèse contextuelle automatisée.
          </p>

          <div className={styles.heroButtons}>
            <button onClick={navigateToSignup} className={styles.heroPrimaryBtn}>
              Essayer gratuitement
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"/>
                <path d="m12 5 7 7-7 7"/>
              </svg>
            </button>
            <button className={styles.heroSecondaryBtn}>
              Voir la démo
            </button>
          </div>

          <div className={styles.heroStats}>
            <div className={styles.statItem}>
              <div className={styles.statValue}>95%</div>
              <div className={styles.statLabel}>Précision</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statValue}>10x</div>
              <div className={styles.statLabel}>Plus rapide</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statValue}>24/7</div>
              <div className={styles.statLabel}>Disponibilité</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.featuresSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            Une plateforme <span className={styles.gradientText}>tout-en-un</span>
          </h2>
          <p className={styles.sectionSubtitle}>
            Orchestration intelligente de deux services IA complémentaires
          </p>
        </div>

        <div className={styles.featuresGrid}>
          <div className={`${styles.featureCard} ${styles.featureBlue}`}>
            <div className={styles.featureIcon}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"/>
                <path d="M8.5 8.5v.01"/>
                <path d="M16 15.5v.01"/>
                <path d="M12 12v.01"/>
                <path d="M11 17v.01"/>
                <path d="M7 14v.01"/>
              </svg>
            </div>
            <h3 className={styles.featureTitle}>Classification Zero-Shot</h3>
            <p className={styles.featureDescription}>
              Identification automatique de catégories sans entraînement préalable
            </p>
          </div>

          <div className={`${styles.featureCard} ${styles.featurePurple}`}>
            <div className={styles.featureIcon}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" x2="8" y1="13" y2="13"/>
                <line x1="16" x2="8" y1="17" y2="17"/>
                <line x1="10" x2="8" y1="9" y2="9"/>
              </svg>
            </div>
            <h3 className={styles.featureTitle}>Synthèse Contextuelle</h3>
            <p className={styles.featureDescription}>
              Résumés intelligents adaptés au contexte de chaque article
            </p>
          </div>

          <div className={`${styles.featureCard} ${styles.featureGreen}`}>
            <div className={styles.featureIcon}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" x2="12" y1="20" y2="10"/>
                <line x1="18" x2="18" y1="20" y2="4"/>
                <line x1="6" x2="6" y1="20" y2="16"/>
              </svg>
            </div>
            <h3 className={styles.featureTitle}>Analyse de Tonalité</h3>
            <p className={styles.featureDescription}>
              Détection automatique du sentiment (positif, négatif, neutre)
            </p>
          </div>

          <div className={`${styles.featureCard} ${styles.featureOrange}`}>
            <div className={styles.featureIcon}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
            </div>
            <h3 className={styles.featureTitle}>Sécurité Avancée</h3>
            <p className={styles.featureDescription}>
              Authentification JWT et protection des données
            </p>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className={styles.howItWorksSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            Comment ça <span className={styles.gradientText}>fonctionne</span>
          </h2>
        </div>

        <div className={styles.stepsGrid}>
          <div className={styles.stepCard}>
            <div className={styles.stepNumber}>01</div>
            <h3 className={styles.stepTitle}>Soumettez votre texte</h3>
            <p className={styles.stepDescription}>
              Copiez-collez n'importe quel article ou contenu à analyser
            </p>
          </div>

          <div className={styles.stepCard}>
            <div className={styles.stepNumber}>02</div>
            <h3 className={styles.stepTitle}>Orchestration IA</h3>
            <p className={styles.stepDescription}>
              Hugging Face et Gemini travaillent ensemble pour analyser
            </p>
          </div>

          <div className={styles.stepCard}>
            <div className={styles.stepNumber}>03</div>
            <h3 className={styles.stepTitle}>Résultats instantanés</h3>
            <p className={styles.stepDescription}>
              Recevez catégorie, score, résumé et tonalité en secondes
            </p>
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className={styles.techSection}>
        <h2 className={styles.techTitle}>Technologies de pointe</h2>
        <p className={styles.techSubtitle}>Propulsé par les meilleurs modèles d'IA</p>
        
        <div className={styles.techGrid}>
          {["Hugging Face", "Google Gemini", "PostgreSQL", "Next.js", "FastAPI", "JWT"].map((tech, idx) => (
            <div key={idx} className={styles.techBadge}>
              {tech}
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaCard}>
          <div className={styles.ctaBackground}></div>
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>
              Prêt à transformer votre veille média ?
            </h2>
            <p className={styles.ctaDescription}>
              Rejoignez les entreprises qui automatisent leur analyse de contenu avec l'IA
            </p>
            <button onClick={navigateToSignup} className={styles.ctaButton}>
              Démarrer maintenant
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerGrid}>
            <div className={styles.footerBrand}>
              <div className={styles.footerLogo}>
                <div className={styles.footerLogoIcon}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"/>
                    <path d="M8.5 8.5v.01"/>
                    <path d="M16 15.5v.01"/>
                    <path d="M12 12v.01"/>
                    <path d="M11 17v.01"/>
                    <path d="M7 14v.01"/>
                  </svg>
                </div>
                <span>Hybrid-Analyzer</span>
              </div>
              <p className={styles.footerBrandDesc}>
                Plateforme d'orchestration IA pour l'analyse automatisée de contenu
              </p>
            </div>

            <div className={styles.footerColumn}>
              <h4 className={styles.footerColumnTitle}>Produit</h4>
              <ul className={styles.footerList}>
                <li>Fonctionnalités</li>
                <li>Tarifs</li>
                <li>Documentation</li>
              </ul>
            </div>

            <div className={styles.footerColumn}>
              <h4 className={styles.footerColumnTitle}>Entreprise</h4>
              <ul className={styles.footerList}>
                <li>À propos</li>
                <li>Blog</li>
                <li>Carrières</li>
              </ul>
            </div>

            <div className={styles.footerColumn}>
              <h4 className={styles.footerColumnTitle}>Légal</h4>
              <ul className={styles.footerList}>
                <li>Confidentialité</li>
                <li>CGU</li>
                <li>Sécurité</li>
              </ul>
            </div>
          </div>

          <div className={styles.footerBottom}>
            <p>© 2025 Hybrid-Analyzer. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
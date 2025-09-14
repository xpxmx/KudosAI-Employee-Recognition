export default function Simple() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f3f4f6', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center' 
    }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ 
          fontSize: '2.5rem', 
          fontWeight: 'bold', 
          color: '#00A9A5', 
          marginBottom: '1rem' 
        }}>
          KudosAI Test
        </h1>
        <p style={{ 
          fontSize: '1.25rem', 
          color: '#6b7280', 
          marginBottom: '2rem' 
        }}>
          If you can see this with colors, the app is working!
        </p>
        <div style={{ marginTop: '2rem' }}>
          <a 
            href="/" 
            style={{ 
              backgroundColor: '#00A9A5', 
              color: 'white', 
              padding: '0.75rem 1.5rem', 
              borderRadius: '0.5rem', 
              textDecoration: 'none',
              display: 'inline-block'
            }}
          >
            Go to Home
          </a>
        </div>
      </div>
    </div>
  );
}

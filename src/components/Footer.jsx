import './Footer.css';

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p className="copyright">© {new Date().getFullYear()}. All rights reserved.</p>
      </div>
    </footer>
  );
}

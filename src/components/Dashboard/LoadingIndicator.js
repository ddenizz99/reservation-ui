const LoadingIndicator = ({ color, padding }) => (
    <div className={`d-flex justify-content-center ${padding}`}>
      <div className={`spinner-border ${color}`} role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
  
  export default LoadingIndicator;
function Ratings({ rating, text, colour }) {
  return (
    <div className="rating">
      {[0, 1, 2, 3, 4].map((num) => (
        <span key={num}>
          <i
            style={{ color: colour }}
            className={
              rating >= 1 + num
                ? "fas fa-star"
                : rating >= 0.5 + num
                ? "fas fa-star-half-alt"
                : "far fa-star"
            }
          ></i>
        </span>
      ))}
      <span>{text && text}</span>
    </div>
  );
}

export default Ratings;

export default function GetAvgRating(ratingArr) {
  
  if (ratingArr?.length === 0) return 0;

  // .redduce() function array la accumlate karun ek single value return karto
  // eg. array dilele ahe tyachi sum print karaychi ahe tase ahe
  // useCase of an Reduce() function -->
  // When to use reduce()?

  // Summing numbers
  // Finding max/min
  // Flattening arrays
  // Grouping or counting items
  // Building objects from arrays

  const totalReviewCount = ratingArr?.reduce((acc, curr) => {
    acc += curr.rating;
    return acc;
  }, 0);

  const multiplier = Math.pow(10, 1); //This is used to round the average rating to 1 decimal place.
  // first calculate the aveg of total review and multiplying
  const avgReviewCount =
    Math.round((totalReviewCount / ratingArr?.length) * multiplier) /
    multiplier;

  return avgReviewCount;
}

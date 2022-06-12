export const getAverageRating = (reviews) => {
    let rating = 0
    reviews.forEach(item => rating += item.rating)
    return Math.floor(rating / reviews.length);
}

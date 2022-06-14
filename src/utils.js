export const getAverageRating = (reviews) => {
    let rating = 0
    reviews.length && reviews.forEach(item => rating += item.rating)

    return rating > 0 ? Math.round(rating / reviews.length) : 0;
}

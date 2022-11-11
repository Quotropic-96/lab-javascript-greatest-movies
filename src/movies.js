// Iteration 1: All directors? - Get the array of all directors.
// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors.
// How could you "clean" a bit this array and make it unified (without duplicates)?
function getAllDirectors(moviesArray) {
    return moviesArray.map(movie => movie.director);
}

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?
function howManyMovies(moviesArray) {
    return moviesArray.filter(movie => movie.director === 'Steven Spielberg' && movie.genre.includes('Drama')).length;
}

// Iteration 3: All scores average - Get the average of all scores with 2 decimals
function scoresAverage(moviesArray) {
    const scoresArray = moviesArray.map(movie => movie.score);
    const scoresArrayCleaned = scoresArray.filter(score => typeof score === 'number');
    const avgScore = scoresArrayCleaned.reduce((acc, val) => acc + val/scoresArray.length,0);
    return Number.parseFloat(avgScore.toFixed(2));
}

// Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesScore(moviesArray) {
    const dramaScoresArray = moviesArray.filter(movie => movie.genre.includes('Drama')).map(movie => movie.score);
    const avgDramaScore = dramaScoresArray.reduce((acc, val) => acc + val/dramaScoresArray.length,0);
    return Number.parseFloat(avgDramaScore.toFixed(2));
}

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)
function orderByYear(moviesArray) {
    const yearlyOrderedMovies = JSON.parse(JSON.stringify(moviesArray));
    yearlyOrderedMovies.sort((a,b) => {
       if (a.year > b.year) {
        return 1;   // Why isn't it -1?
       }
       if (a.year < b.year) {
        return -1;  // Why isn't it 1?
       }
       if (a.year === b.year) {
        if(a.title > b.title) {
            return 1;
        }
        if (a.title < b.title) {
            return -1;
        }
        if(a.title === b.title) {
            return 0;
        }
       }
    });
    return yearlyOrderedMovies;
}

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
function orderAlphabetically(moviesArray) {
    const moviesArrClone = JSON.parse(JSON.stringify(moviesArray));
    const alphOrderedMovies = moviesArrClone.map(movie => movie.title);
    const first20 = alphOrderedMovies.sort().filter((elem,idx) => idx <= 19);
    return first20;
}

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
function turnHoursToMinutes(moviesArray) {
    const moviesArrClone = JSON.parse(JSON.stringify(moviesArray));
    for (let movie of moviesArrClone) {
        correctDurationArr = movie.duration.replace('min','').replace(' ','').split('h');
        if (correctDurationArr[1] != '') {
            movie.duration = parseInt(correctDurationArr[0])*60 + parseInt(correctDurationArr[1])
        } else {
            movie.duration = parseInt(correctDurationArr[0])*60
        }
    }
    return moviesArrClone;
}

// BONUS - Iteration 8: Best yearly score average - Best yearly score average
function bestYearAvg(moviesArray) {
    if (moviesArray.length === 0) {
        return null;
    }
    const yearScoreObj = {};
    // Why is it ordered by default?!
    moviesArray.forEach(movie => {
        if (movie.year.toString() in yearScoreObj) {
            yearScoreObj[movie.year.toString()].push(movie.score);
        } else {
            yearScoreObj[movie.year.toString()] = [movie.score];
        }
    });
    for (let year in yearScoreObj) {
        yearScoreObj[year] = Number.parseFloat(yearScoreObj[year].reduce((acc, val) => acc + val/yearScoreObj[year].length,0).toFixed(2));
    }
    let bestYear = '';
    let bestScore = '';
    for (year in yearScoreObj) {
        if (yearScoreObj[year] > bestScore) {
            bestYear = year;
            bestScore = yearScoreObj[year];
        }
    }
    return `The best year was ${bestYear} with an average score of ${bestScore}`;
}

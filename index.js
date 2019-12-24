const request = require("request");
const cheerio = require("cheerio");
const fs = require('fs');

const url1 = "https://fun.lovetoknow.com/weird-strange/family-feud-game-questions";
const url2 = "https://hobbylark.com/party-games/list-of-family-feud-questions";

request({
    uri: url2,
}, extract2);

function extract1(error, response, body) {
    const $ = cheerio.load(body);
    const questions = [];

    $(".content-body h2").map((index, element) => {

        const questionText = $(element).text();

        const answers = [];
        $(element).next('ul').find('li').map((index, element2) => {
            answers.push($(element2).text());
        })

        if (answers.length > 1)
            questions.push({
                "question": questionText.replace(/\d+\.\s/, "").trim(),
                "answer1": answers[0].trim(),
                "answer2": answers[1].trim(),
                "answer3": answers[2].trim(),
                "answer4": answers[3].trim(),
                "answer5": answers[4].trim(),
                "answer6": answers[5].trim()
            })
    });

    fs.writeFile("questions.json", JSON.stringify(questions), function (err) {
        if (err) {
            return console.log(err);
        }

        console.log("The file was saved!");
    });

}

function extract2(error, response, body) {
    const $ = cheerio.load(body);
    const questions = [];

    $(".full.module.moduleTable").map((index, element) => {
        const questionText = $(element).children('.subtitle').text();

        const answers = [];

        $(element).find('.firstCell').map((index, element2) => {
            answers.push($(element2).text());
        })

        if (answers.length > 6)
            questions.push({
                "question": questionText,
                "answer1": answers[1].replace(/\n|\t/gm, ""),
                "answer2": answers[2].replace(/\n|\t/gm, ""),
                "answer3": answers[3].replace(/\n|\t/gm, ""),
                "answer4": answers[4].replace(/\n|\t/gm, ""),
                "answer5": answers[5].replace(/\n|\t/gm, ""),
                "answer6": answers[6].replace(/\n|\t/gm, "")
            })
    });

    fs.writeFile("questions2.json", JSON.stringify(questions), function (err) {
        if (err) {
            return console.log(err);
        }

        console.log("The file was saved!");
    });

}


// console.log('Need money\n\t'.replace(/\n|\t/gm, ""))
// console.log("13. Name Something a Parent Might Disapprove Of".replace(/\d+\.\s/, ""))
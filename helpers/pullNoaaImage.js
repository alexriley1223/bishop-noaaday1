const axios = require('axios');
const cheerio = require('cheerio');
const { weatherChannelId } = require('../config.json');
const fs = require('fs');
const generateFrames = require('gif-to-png');
const log = require('@helpers/logger');

module.exports = async function(interaction = null, client = null) {
    const res = await axios.get('https://www.spc.noaa.gov/products/outlook/day1otlk.html');
    if(res.status == 200) {
        const $ = cheerio.load(res.data);
        const bodyOnLoad = $("body").attr("onload");
        const imageName = bodyOnLoad.match(/'([^']+)'/)[1];

        const tmpFileName = __dirname + '/../tmp/' + Math.random().toString(36).slice(2, 7);

        fs.mkdirSync(tmpFileName);
        generateFrames(`https://www.spc.noaa.gov/products/outlook/day1${imageName}.gif`, tmpFileName)
            .then(urls => {
                let date = new Date();

                if(interaction) {
                    interaction.client.channels.fetch(weatherChannelId).then((chann) => {
                        chann.send({
                            files: [{
                                attachment: urls[0],
                                name: `OutlookFor${date.toDateString()}.png`
                            }],
                            content: `Outlook for ${date.toDateString()}`
                        }).then(() => { fs.rmSync(tmpFileName, { recursive: true, force: true }); });
                    })
                } else {
                    client.channels.fetch(weatherChannelId).then((chann) => {
                        chann.send({
                            files: [{
                                attachment: urls[0],
                                name: `OutlookFor${date.toDateString()}.png`
                            }],
                            content: `Outlook for ${date.toDateString()}`
                        }).then(() => { fs.rmSync(tmpFileName, { recursive: true, force: true }); });
                    });
                }
            })
            .catch(error => {
                log.error('noaaday1', '❌ Error fetching Noaa Image.');
                if(interaction) {
                    interaction.reply({
                        content: `Error fetching gif.`,
                        ephemeral: true,
                    });
                }
            });
    } else {
        if(interaction) {
            log.error('noaaday1', '❌ Error fetching Noaa Image.');
            interaction.reply({
                content: `Error fetching gif.`,
                ephemeral: true,
            });
        }
    }

    if(interaction) {
        interaction.reply({
            content: `Day 1 Outlook sent into the specified weather channel.`,
            ephemeral: true,
        });
    }
}
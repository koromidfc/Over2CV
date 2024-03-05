// Partie 1 HEADER "PROFILE CONTENT".
const getStats = document.getElementById('getStatsBtn')
const namecardEl = document.getElementById('playercard')
const imgEl = document.querySelector('#profilePicture')
const playerNameEl = document.querySelector('#playerNameEl')
const titleInGame = document.querySelector('#titleInGame')

// Partie 2 BODY "GLOBAL CONTENT".
const listSummaryStat = document.querySelector('#statsContainer')
const listQuickplayStat = document.querySelector('#quickplayMode')
const listRankedStat = document.querySelector('#rankedMode')

// Partie 3 BODY "HEROES CONTENT".
const heroesSelect = document.getElementById('heroes')
const heroName = document.querySelector('#heroNameEl')
const listHeroMigStat = document.querySelector('#heroStat')
const listHeroAvgStat = document.querySelector('#heroAvgStat')

// Page vide par defaut.
function isRequired(playerName) {
    return playerName.trim() !== "";// Retourne true si nom du joueur, sinon false.
}

// Ajout d'un écouteur d'évenement pour rechercher et ajouter les stats du "playerName".
getStats.addEventListener('click', () => {
    const playerName = document.getElementById('playerName').value.trim();
    console.log(playerName);
    if (isRequired(playerName)) {
        try {
            clearPlayerStats();// Réinitialise les statistiques du joueur.
            getPlayer(playerName);
            getPlayerSummaryStats(playerName);
            getPlayerQuickplayStats(playerName);
            getPlayerRankedStats(playerName);

            // Ajout d'un écouteur d'évenement sur le menu déroulant ('select) qui detecte les changements de sélection.
            heroesSelect.addEventListener('change', () => {
                const selectedHero = heroesSelect.value;
                clearHeroData(); // Effacer les données du héros précédemment affichées.
                getHeroData(selectedHero); // Récupérer les données du nouveau héros sélectionné.
                getSpecificHeroStats(playerName, selectedHero);
            });
        } catch (error) {
            console.log('Erreur lors de la récupération des statistiques du joueur:', error);
            alert('Une erreur s\'est produite lors de la récupération des statistiques. Veuillez réessayer plus tard.');
            console.log(`${error}`);
        }
    } else {
        alert('Veuillez entrer le nom du joueur Overwatch.');
    }
});

// Supprime tous les enfants des éléments contenant les statistiques du "playerName".
function clearPlayerStats() {
    namecardEl.innerHTML = '';
    imgEl.innerHTML = '';
    playerNameEl.innerHTML = '';
    titleInGame.innerHTML = '';
    listSummaryStat.innerHTML = '';
    listQuickplayStat.innerHTML = '';
    listRankedStat.innerHTML = '';
    listHeroMigStat.innerHTML = '';
    listHeroAvgStat.innerHTML = '';
}

// Effacer les données du héros précédemment affichées.
function clearHeroData() {
    document.getElementById('heroNameEl').textContent = ''          // Effacer le nom du héros
    document.getElementById('profileHeroEl').innerHTML = ''         // Effacer l'image du héros
    document.getElementById('heroStat').innerHTML = 'MOST IN GAME'  // Réinitialiser le titre de la section des statistiques du héros
    document.getElementById('heroAvgStat').innerHTML = 'AVERAGE'    // Réinitialiser le titre de la section des statistiques moyennes du héros
}

// Envoie une requete à l'API pour récupérer les données du joueur spécifié par "playerName".
function getPlayer(playerName) {
    try {
        fetch(`https://overfast-api.tekrop.fr/players/${playerName}`)
            .then(response => response.json())
            .then(response => {
                displayInfo(response)
                document.getElementById('playerName').value = ''    //Efface le form après avoir eu la réponse.
            })
            .catch(error => alert("Erreur : " + error));
    } catch (error) {
        alert("Une erreur est survenue : " + error);
    }
}

// Envoie une requête à l'API pour récuperer les stats générales du "playerName".
function getPlayerSummaryStats(playerName) {
    try {
        fetch(`https://overfast-api.tekrop.fr/players/${playerName}/stats/summary`)
            .then(response => response.json())
            .then(response => displaySummaryStats(response))
            .catch(error => alert("Erreur : " + error));
    } catch (error) {
        alert("Une erreur est survenue : " + error);
    }
}

// Envoie une requête à l'API pour récuperer les stats de parties rapides du "playerName".
function getPlayerQuickplayStats(playerName) {
    try {
        fetch(`https://overfast-api.tekrop.fr/players/${playerName}/stats/summary?gamemode=quickplay`)
            .then(response => response.json())
            .then(response => displayQuickplayStats(response))
            .catch(error => alert("Erreur : " + error));
    } catch (error) {
        alert("Une erreur est survenue : " + error);
    }
}

// Envoie une requête à l'API pour récuperer les stats compétitives du "playerName".
function getPlayerRankedStats(playerName) {
    try {
        fetch(`https://overfast-api.tekrop.fr/players/${playerName}/stats/summary?gamemode=competitive`)
            .then(response => response.json())
            .then(response => displayRankedStats(response))
            .catch(error => alert("Erreur : " + error));
    } catch (error) {
        alert("Une erreur est survenue : " + error);
    }
}

// Envoie une requête à l'API pour récuperer les informations du personnage.
function getHeroData(heroes) {
    try {
        fetch(`https://overfast-api.tekrop.fr/heroes/${heroes}`)
            .then(response => response.json())
            .then(response => displayHeroData(response))
            .catch(error => alert("Erreur : " + error));
    } catch (error) {
        alert("Une erreur est survenue : " + error);
    }
}

//Get player Hero stats
function getSpecificHeroStats(playerName, heroes) {
    try {
        console.log(heroes)
        fetch(`https://overfast-api.tekrop.fr/players/${playerName}/stats/career?gamemode=competitive&hero=${heroes}`)
            .then(response => response.json())
            .then(response => {
                displayHeroStats(response, heroes)
            })
            .catch(error => alert("Erreur : " + error));
    } catch (error) {
        alert("Une erreur est survenue : " + error);
    }
}

// Afficher les informations générales = Pseudo + Titre + Avatar + Bannière.
function displayInfo(stats) {
    const avatar = document.createElement('img')
    avatar.style.width = "100%"
    const namecard = document.createElement('img')
    namecard.style.width = "100%"

    avatar.src = stats.summary.avatar
    imgEl.appendChild(avatar)
    namecard.src = stats.summary.namecard
    namecardEl.appendChild(namecard)
    playerNameEl.innerHTML = stats.summary.username
    titleInGame.innerHTML = stats.summary.title
}

// Afficher les stats globales du "playerName".
function displaySummaryStats(stats) {
    const globalTitle = document.createElement('h1')
    const winrate = document.createElement('p')
    const kd = document.createElement('p')
    const gamePlayed = document.createElement('p')
    const timePlayed = document.createElement('p')

    globalTitle.textContent = `GLOBAL`
    globalTitle.style.color = 'white'
    winrate.textContent = `WR : ${stats.general.winrate}%`
    kd.textContent = `KDA : ${stats.general.kda}`
    gamePlayed.textContent = `GAME PLAYED : ${stats.general.games_played}`
    timePlayed.textContent = `TIME PLAYED : ${stats.general.time_played}`
    listSummaryStat.appendChild(globalTitle)
    listSummaryStat.appendChild(winrate)
    listSummaryStat.appendChild(kd)
    listSummaryStat.appendChild(gamePlayed)
    listSummaryStat.appendChild(timePlayed)
}

// Afficher les stats ranked du "playerName"
function displayRankedStats(stats) {
    const rankedTitle = document.createElement('h1')
    const winrate = document.createElement('p')
    const kd = document.createElement('p')
    const gamesWon = document.createElement('p')
    const gamesLost = document.createElement('p')
    const gamesPlayed = document.createElement('p')
    const timePlayed = document.createElement('p')
    listRankedStat.style.backgroundColor = "#FF7A7A"

    rankedTitle.textContent = `COMPETITIVE LAST SEASON`
    rankedTitle.style.color = 'white'
    winrate.textContent = `WR : ${stats.general.winrate}%`
    kd.textContent = `KDA : ${stats.general.kda}`
    gamesWon.textContent = `GAME WON : ${stats.general.games_won}`
    gamesLost.textContent = `GAME LOST : ${stats.general.games_lost}`
    gamesPlayed.textContent = `GAME PLAYED : ${stats.general.games_played}`
    timePlayed.textContent = `TIME PLAYED : ${stats.general.time_played}`
    listRankedStat.appendChild(rankedTitle)
    listRankedStat.appendChild(winrate)
    listRankedStat.appendChild(kd)
    listRankedStat.appendChild(gamesWon)
    listRankedStat.appendChild(gamesLost)
    listRankedStat.appendChild(gamesPlayed)
    listRankedStat.appendChild(timePlayed)
}

// Afficher les stats quickplay du "playerName".
function displayQuickplayStats(stats) {
    const quickplayTitle = document.createElement('h1')
    const winrate = document.createElement('p')
    const kd = document.createElement('p')
    const gamesWon = document.createElement('p')
    const gamesLost = document.createElement('p')
    const gamesPlayed = document.createElement('p')
    const timePlayed = document.createElement('p')
    listQuickplayStat.style.backgroundColor = "#7AA8FF"

    quickplayTitle.textContent = `QUICKPLAY`
    quickplayTitle.style.color = 'white'
    winrate.textContent = `WR : ${stats.general.winrate}%`
    kd.textContent = `KDA : ${stats.general.kda}`
    gamesWon.textContent = `GAME WON : ${stats.general.games_won}`
    gamesLost.textContent = `GAME LOST : ${stats.general.games_lost}`
    gamesPlayed.textContent = `GAME PLAYED : ${stats.general.games_played}`
    timePlayed.textContent = `TIME PLAYED : ${stats.general.time_played}`
    listQuickplayStat.appendChild(quickplayTitle)
    listQuickplayStat.appendChild(winrate)
    listQuickplayStat.appendChild(kd)
    listQuickplayStat.appendChild(gamesWon)
    listQuickplayStat.appendChild(gamesLost)
    listQuickplayStat.appendChild(gamesPlayed)
    listQuickplayStat.appendChild(timePlayed)
}

function displayHeroData(heroData) {
    const heroNameEl = document.getElementById('heroNameEl')
    const profileHeroEl = document.getElementById('profileHeroEl')
    const heroPortraitImg = document.createElement('img')

    heroNameEl.textContent = heroData.name // Afficher le nom du héros
    heroPortraitImg.src = heroData.portrait
    heroPortraitImg.backgroundColor =
        heroPortraitImg.style.width = "100%"
    heroPortraitImg.alt = heroData.name + "portrait"
    profileHeroEl.appendChild(heroPortraitImg)
}

//Afficher les statistiques spécifique de Mercy.
// MIG = Most in game 
// AVG = Average
function displayHeroStats(stats, heroes) {
    if (heroes == 'mercy') {
        heroesContent.style.backgroundColor = "#f6f1c7"
        const blasterKillMIG = document.createElement('p')
        const rezMIG = document.createElement('p')
        const selfHealingMIG = document.createElement('p')
        const damageAmpMIG = document.createElement('p')
        const selfHealingAVG = document.createElement('p')
        const damageAmpAVG = document.createElement('p')
        const rezAVG = document.createElement('p')
        const blasterKillAVG = document.createElement('p')
        blasterKillMIG.textContent = `Blaster Kill : ${stats.mercy.hero_specific.blaster_kills_most_in_game}`
        rezMIG.textContent = `Players Resurrected : ${stats.mercy.hero_specific.players_resurrected_most_in_game}`
        selfHealingMIG.textContent = `Self Healing : ${stats.mercy.hero_specific.self_healing_most_in_game}`
        damageAmpMIG.textContent = `Damage Amp : ${stats.mercy.hero_specific.damage_amplified_most_in_game}`
        blasterKillAVG.textContent = `Blaster Kill AVG : ${stats.mercy.hero_specific.blaster_kills_avg_per_10_min}`
        selfHealingAVG.textContent = `Self Healing AVG : ${stats.mercy.hero_specific.self_healing_avg_per_10_min}`
        damageAmpAVG.textContent = `Damage Amp AVG : ${stats.mercy.hero_specific.damage_amplified_avg_per_10_min}`
        rezAVG.textContent = `Players resurrected AVG : ${stats.mercy.hero_specific.players_resurrected_avg_per_10_min}`
        listHeroMigStat.appendChild(blasterKillMIG)
        listHeroMigStat.appendChild(rezMIG)
        listHeroMigStat.appendChild(selfHealingMIG)
        listHeroMigStat.appendChild(damageAmpMIG)
        listHeroAvgStat.appendChild(blasterKillAVG)
        listHeroAvgStat.appendChild(rezAVG)
        listHeroAvgStat.appendChild(selfHealingAVG)
        listHeroAvgStat.appendChild(damageAmpAVG)
    } if (heroes == 'ana') {
        heroesContent.style.backgroundColor = "#8399be"
        const sleepMIG = document.createElement('p')
        const selfHealingMIG = document.createElement('p')
        const selfHealingAVG = document.createElement('p')
        const sleepAVG = document.createElement('p')
        const bioticgrenadeKillsAVG = document.createElement('p')
        sleepMIG.textContent = `Enemies slept MIG : ${stats.ana.hero_specific.enemies_slept_most_in_game}`
        selfHealingMIG.textContent = `Self Healing MIG : ${stats.ana.hero_specific.self_healing_most_in_game}`
        bioticgrenadeKillsAVG.textContent = `Biotic Grenade Kill AVG : ${stats.ana.hero_specific.biotic_grenade_kills_avg_per_10_min}`
        selfHealingAVG.textContent = `Self Healing AVG : ${stats.ana.hero_specific.self_healing_avg_per_10_min}`
        sleepAVG.textContent = `Enemies slept AVG : ${stats.ana.enemies_slept_avg_per_10_min}`
        listHeroMigStat.appendChild(sleepMIG)
        listHeroMigStat.appendChild(selfHealingMIG)
        listHeroAvgStat.appendChild(sleepAVG)
        listHeroAvgStat.appendChild(selfHealingAVG)
    }
}
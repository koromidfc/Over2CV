const getStats = document.getElementById('getStatsBtn')
const namecardEl = document.getElementById('playercard')
const imgEl = document.querySelector('#profilePicture')
const listSummaryStat = document.querySelector('#statsContainer')
const listRankedStat = document.querySelector ('#rankedMode')
const listQuickplayStat = document.querySelector ('#quickplayMode')
const listHeroMigStat = document.querySelector('#heroStat')
const listHeroAvgStat = document.querySelector('#heroAvgStat')
const playerNameEl = document.querySelector('#playerNameEl')
const titleInGame = document.querySelector('#titleInGame')
const heroName = document.querySelector('#heroNameEl')
let statsLoaded = false; 
//Quand je clique sur le bouton rechercher,
getStats.addEventListener('click', () => {
    const playerName = document.getElementById('playerName').value.trim();
    console.log(playerName)
    if (playerName && !statsLoaded) {
        try {
             statsLoaded = true; 
             getPlayer(playerName)
             getPlayerSummaryStats(playerName)
             getPlayerRankedStats(playerName)
             getPlayerQuickplayStats(playerName)
             getPlayerHeroStats(playerName)
        } catch (error) {
            console.log('Erreur lors de la récupération des statistiques du joueur:', error);
            alert('Une erreur s\'est produite lors de la récupération des statistiques. Veuillez réessayer plus tard.');
            console.log(`${error}`);
            statsLoaded = false; //Réinitialiser l'état de lecture des stats en cas d'erreur
        }
    }else if (statsLoaded){
        alert('Les Statistiques ont été déjà chargées. Rechargez la page pour effectuer une nouvelle recherche');
    }else {
        alert('Veuillez entrer le nom du joueur Overwatch.');
    }
});
//Envoie une requete à l'API pour récupérer les données du joueur spécifié par x
function getPlayer(x) {
    try {
        fetch(`https://overfast-api.tekrop.fr/players/${x}`)
            .then(response => response.json())
            .then(response => {
                displayInfo(response)
                document.getElementById('playerName').value = ''//Efface le form après avoir eu la réponse
            })
            .catch(error => alert("Erreur : " + error));
    } catch (error) {
        alert("Une erreur est survenue : " + error);
    }
}
//Envoie une requête à l'API pour récuperer les stats générales
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
//Envoie une requête à l'API pour récuperer les stats compétitives du joueur
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
//Envoie une requête à l'API pour récuperer les stats de parties rapides du joueur
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
//Envoie une requête à l'API pour récuperer les stats du héro en partie compétitive de Mercy
function getPlayerHeroStats(playerName) {
    try {
        fetch(`https://overfast-api.tekrop.fr/players/${playerName}/stats/career?gamemode=competitive&hero=mercy`)
            .then(response => response.json())
            .then(response => displayHeroStats(response))
            .catch(error => alert("Erreur : " + error));
    } catch (error) {
        alert("Une erreur est survenue : " + error);
    }
}
//A VENIR Envoie une requête à l'API pour récuperer le portrait du personnage.
//Get player Hero stats
// function getPlayerHeroStats(playerName,heroes) {
//     try {
//         fetch(`https://overfast-api.tekrop.fr/players/${playerName}/stats/career?gamemode=competitive&hero=${heroes}`)
//             .then(response => response.json())
//             .then(response => displayMercyStats(response))
//             .catch(error => alert("Erreur : " + error));
//     } catch (error) {
//         alert("Une erreur est survenue : " + error);
//     }
// }
//Get Hero Portrait
// function getHeroData(heroes) {
//     try {
//         fetch(`https://overfast-api.tekrop.fr/heroes/${heroes}`)
//             .then(response => response.json())
//             .then(response => displayMercyStats(response))
//             .catch(error => alert("Erreur : " + error));
//     } catch (error) {
//         alert("Une erreur est survenue : " + error);
//     }
// }
//Afficher les informations générales = Pseudo + Titre + Avatar + Bannière
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
//Afficher les stats globales du joueur
function displaySummaryStats(stats) {
    const winrate = document.createElement('p')
    const kd = document.createElement('p')
    const gamePlayed = document.createElement('p')
    const timePlayed = document.createElement('p')
    
    winrate.textContent = `WR : ${stats.general.winrate}%`
    kd.textContent = `KDA : ${stats.general.kda}`
    gamePlayed.textContent = `GAME PLAYED : ${stats.general.games_played}`
    timePlayed.textContent = `TIME PLAYED : ${stats.general.time_played}`
    listSummaryStat.appendChild(winrate)
    listSummaryStat.appendChild(kd)
    listSummaryStat.appendChild(gamePlayed)
    listSummaryStat.appendChild(timePlayed)
}
//Afficher les stats ranked du joueur
function displayRankedStats(stats) {
    const winrate = document.createElement('p')
    const kd = document.createElement('p')
    const gamesWon = document.createElement('p')
    const gamesLost = document.createElement('p')
    const gamesPlayed = document.createElement('p')
    const timePlayed = document.createElement('p')
    listRankedStat.style.backgroundColor = "#FF7A7A";
    
    winrate.textContent = `WR : ${stats.general.winrate}%`
    kd.textContent = `KDA : ${stats.general.kda}`
    gamesWon.textContent = `GAME WON : ${stats.general.games_won}`
    gamesLost.textContent = `GAME LOST : ${stats.general.games_lost}`
    gamesPlayed.textContent = `GAME PLAYED : ${stats.general.games_played}`
    timePlayed.textContent = `TIME PLAYED : ${stats.general.time_played}`
    listRankedStat.appendChild(winrate)
    listRankedStat.appendChild(kd)
    listRankedStat.appendChild(gamesWon)
    listRankedStat.appendChild(gamesLost)
    listRankedStat.appendChild(gamesPlayed)
    listRankedStat.appendChild(timePlayed)
}
//Afficher les stats quickplay du joueur
function displayQuickplayStats(stats) {
    const winrate = document.createElement('p')
    const kd = document.createElement('p')
    const gamesWon = document.createElement('p')
    const gamesLost = document.createElement('p')
    const gamesPlayed = document.createElement('p')
    const timePlayed = document.createElement('p')
    listQuickplayStat.style.backgroundColor = "#7AA8FF";
    
    winrate.textContent = `WR : ${stats.general.winrate}%`
    kd.textContent = `KDA : ${stats.general.kda}`
    gamesWon.textContent = `GAME WON : ${stats.general.games_won}`
    gamesLost.textContent = `GAME LOST : ${stats.general.games_lost}`
    gamesPlayed.textContent = `GAME PLAYED : ${stats.general.games_played}`
    timePlayed.textContent = `TIME PLAYED : ${stats.general.time_played}`
    listQuickplayStat.appendChild(winrate)
    listQuickplayStat.appendChild(kd)
    listQuickplayStat.appendChild(gamesWon)
    listQuickplayStat.appendChild(gamesLost)
    listQuickplayStat.appendChild(gamesPlayed)
    listQuickplayStat.appendChild(timePlayed)
}
//Afficher les statistiques spécifique du Hero.
// MIG = Most in game 
// AVG = Average
function displayHeroStats (stats) {
    const blasterKillMIG = document.createElement('p')
    const rezMIG = document.createElement('p')
    const selfHealingMIG = document.createElement('p')
    const damageAmpMIG = document.createElement('p')
    const selfHealingAVG = document.createElement('p')
    const damageAmpAVG = document.createElement('p')
    const rezAVG = document.createElement('p')
    const blasterKillAVG = document.createElement('p')
    heroesContent.style.backgroundColor = "#FFE483";
    
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
}

const heroesSelect = document.getElementById('heroes');

heroesSelect.addEventListener('change', () => {
    const selectedHero = heroesSelect.value;
    clearHeroData(); // Effacer les données du héros précédemment affichées
    getHeroData(selectedHero); // Récupérer les données du nouveau héros sélectionné
});

function clearHeroData() {
    // Effacer les données du héros précédemment affichées
    document.getElementById('heroNameEl').textContent = ''; // Effacer le nom du héros
    document.getElementById('profileHeroEl').innerHTML = ''; // Effacer l'image du héros
    document.getElementById('heroStat').innerHTML = 'MOST IN GAME'; // Réinitialiser le titre de la section des statistiques du héros
    document.getElementById('heroAvgStat').innerHTML = 'AVERAGE'; // Réinitialiser le titre de la section des statistiques moyennes du héros
}

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

function displayHeroData(heroData) {
    const heroNameEl = document.getElementById('heroNameEl');
    const profileHeroEl = document.getElementById('profileHeroEl');

    // Afficher le nom du héros
    heroNameEl.textContent = heroData.name;

    // Créer une image pour afficher le portrait du héros
    const heroPortraitImg = document.createElement('img');
    heroPortraitImg.src = heroData.portrait;
    heroPortraitImg.alt = heroData.name + " portrait";
    profileHeroEl.appendChild(heroPortraitImg);

    // Afficher les statistiques du héros (vous devez implémenter cette partie selon les données récupérées)
    // Vous pouvez utiliser des éléments HTML appropriés comme des paragraphes (<p>) pour afficher les statistiques du héros
}
//Envoie une requête à l'API pour récuperer les stats du héro en partie compétitive de Mercy
// function getPlayerMercyStats(playerName) {
//     try {
//         fetch(`https://overfast-api.tekrop.fr/players/${playerName}/stats/career?gamemode=competitive&hero=mercy`)
//             .then(response => response.json())
//             .then(response => displayMercyStats(response))
//             .catch(error => alert("Erreur : " + error));
//     } catch (error) {
//         alert("Une erreur est survenue : " + error);
//     }
// }
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
//             .then(response => heroesContent(response))
//             .catch(error => alert("Erreur : " + error));
//     } catch (error) {
//         alert("Une erreur est survenue : " + error);
//     }
// }

//Afficher les statistiques spécifique du Hero.
// MIG = Most in game 
// AVG = Average
// function displayMercyStats(stats) {
//     const blasterKillMIG = document.createElement('p')
//     const rezMIG = document.createElement('p')
//     const selfHealingMIG = document.createElement('p')
//     const damageAmpMIG = document.createElement('p')
//     const selfHealingAVG = document.createElement('p')
//     const damageAmpAVG = document.createElement('p')
//     const rezAVG = document.createElement('p')
//     const blasterKillAVG = document.createElement('p')
//     heroesContent.style.backgroundColor = "#FFE483"

//     blasterKillMIG.textContent = `Blaster Kill : ${stats.mercy.hero_specific.blaster_kills_most_in_game}`
//     rezMIG.textContent = `Players Resurrected : ${stats.mercy.hero_specific.players_resurrected_most_in_game}`
//     selfHealingMIG.textContent = `Self Healing : ${stats.mercy.hero_specific.self_healing_most_in_game}`
//     damageAmpMIG.textContent = `Damage Amp : ${stats.mercy.hero_specific.damage_amplified_most_in_game}`
//     blasterKillAVG.textContent = `Blaster Kill AVG : ${stats.mercy.hero_specific.blaster_kills_avg_per_10_min}`
//     selfHealingAVG.textContent = `Self Healing AVG : ${stats.mercy.hero_specific.self_healing_avg_per_10_min}`
//     damageAmpAVG.textContent = `Damage Amp AVG : ${stats.mercy.hero_specific.damage_amplified_avg_per_10_min}`
//     rezAVG.textContent = `Players resurrected AVG : ${stats.mercy.hero_specific.players_resurrected_avg_per_10_min}`

//     listHeroMigStat.appendChild(blasterKillMIG)
//     listHeroMigStat.appendChild(rezMIG)
//     listHeroMigStat.appendChild(selfHealingMIG)
//     listHeroMigStat.appendChild(damageAmpMIG)
//     listHeroAvgStat.appendChild(blasterKillAVG)
//     listHeroAvgStat.appendChild(rezAVG)
//     listHeroAvgStat.appendChild(selfHealingAVG)
//     listHeroAvgStat.appendChild(damageAmpAVG)
// }
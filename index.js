const Query = require("minecraft-query");

const q = new Query({host: 'draconium.ouimc.fr', port: 25561, timeout: 7500});

q.fullStat()
  .then(success => {

    console.log(success);

    return q.basicStat()

  })

  .then(success => {

    console.log(success);

    q.close();

  })

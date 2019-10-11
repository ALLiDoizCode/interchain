const core = require('ilp-settlement-core')

const settlementEngine =  (services) => {
    /*
        services.sendMessage(accountId, message)
        services.creditSettlement(accountId, amount, settlementId)
        services.trySettlement(accountId)
    */
    return {
        setupAccount: async (accountId) => {
            //logic
        },
        settle: async (accountId, amount) => {
            //logic
        },
        handleMessage: async (accountId, message) => {
            //logic
        },
        closeAccount: async (accountId) => {
            //logic
        },
        disconnect: async () => {
            //logic
        }
    }
}

const createEngine = async (services) => {
    // Async tasks to connect engine ...

    // Settlement engine instance ...
    return settlementEngine(services)
}

async function run() {
    await core.startServer(createEngine)
}

run().catch(err => console.error(err))



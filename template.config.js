/**@type {import("definitions/template").TemplateConfig} config*/
module.exports = {
    plugins: {
        exportString: true,
        autoTest: {
            loginMethod: "EUROPE",
            components: {
                //FireBreathAlyzer: "https://www.warcraftlogs.com/reports/mTpzVhP4RfvD2FM8#fight=1&view=components"
            }
        }
    },
    components: {
        AlterTimeHeals: {
            h: 3,
            w: 1
        }
    },
}